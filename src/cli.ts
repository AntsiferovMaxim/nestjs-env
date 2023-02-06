#!/usr/bin/env node
import * as path from 'path';
import * as recursive from 'recursive-readdir';
import * as ts from 'typescript';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as fs from 'fs';
import * as console from 'console';

type EnvItem = {
  name: string;
  default?: string | number | null;
};
type ConfigItem = { file: string; envs: EnvItem[] };

function getNameOfProperty(payload: ts.PropertyAssignment): string | null {
  if (ts.isIdentifier(payload.name)) {
    return payload.name.escapedText.toString();
  } else {
    return null;
  }
}

function getValueOfProperty(payload: ts.PropertyAssignment) {
  if (ts.isStringLiteral(payload.initializer)) {
    return payload.initializer.text;
  } else if (ts.isNumericLiteral(payload.initializer)) {
    return parseFloat(payload.initializer.text);
  } else if (payload.initializer.kind === ts.SyntaxKind.TrueKeyword) {
    return true;
  } else if (payload.initializer.kind === ts.SyntaxKind.FalseKeyword) {
    return false;
  } else if (ts.isObjectLiteralExpression(payload.initializer)) {
    return getPlaneObject(payload.initializer);
  } else {
    return null;
  }
}

function getPlaneObject(payload: ts.ObjectLiteralExpression): any {
  const object = {};
  ts.forEachChild(payload, item => {
    if (ts.isPropertyAssignment(item)) {
      const name = getNameOfProperty(item);
      if (name !== null) {
        const value = getValueOfProperty(item);
        object[name] = value;
      }
    }
  });
  return object;
}

function getEnvsFromFile(file: string) {
  const program = ts.createProgram([path.resolve(file)], {});
  const source = program.getSourceFile(file);
  const envs: EnvItem[] = [];

  ts.forEachChild(source, node => {
    if (ts.isClassDeclaration(node)) {
      ts.forEachChild(node, member => {
        if (ts.isPropertyDeclaration(member)) {
          ts.forEachChild(member, decorator => {
            if (ts.isDecorator(decorator)) {
              ts.forEachChild(decorator, callExpression => {
                if (ts.isCallExpression(callExpression)) {
                  if (
                    ts.isIdentifier(callExpression.expression) &&
                    callExpression.expression.escapedText === 'Env'
                  ) {
                    const [envName, envConfig] = callExpression.arguments;
                    if (envConfig && ts.isObjectLiteralExpression(envConfig)) {
                    }
                    if (envName && ts.isStringLiteral(envName)) {
                      const env: EnvItem = { name: envName.text };
                      if (
                        envConfig &&
                        ts.isObjectLiteralExpression(envConfig)
                      ) {
                        const config = getPlaneObject(envConfig);
                        if (config) {
                          env.default = config.default;
                        }
                      }
                      envs.push(env);
                    }
                  }
                }
              });
            }
          });
        }
      });
    }
  });

  return envs;
}

function mapEnvItemToString(payload: EnvItem): string {
  const defaultValue =
    payload.default === undefined || payload.default === null
      ? ''
      : `"${payload.default.toString()}"`;

  return [payload.name, defaultValue].join('=');
}

function mapConfigItemToString(payload: ConfigItem): string {
  const envs = payload.envs.map(mapEnvItemToString).join('\n');

  return [`# ${payload.file}`, envs].join('\n');
}

yargs(hideBin(process.argv)).command<{
  directory: string;
  filename: string;
  pattern: string;
  ignore: string[];
  print: boolean;
  output?: string;
}>(
  'generate',
  'Generate env example',
  payload => {
    return payload
      .option('filename', {
        description: 'Name of the file to which the example will be written.',
        alias: 'f',
        default: '.env.example',
        type: 'string',
      })
      .option('pattern', {
        description:
          'Template string specifying the names of files with configs',
        default: '.config.ts',
        alias: 'p',
        type: 'string',
      })
      .option('ignore', {
        description: 'Specify directory that should be excluded',
        alias: 'i',
        type: 'array',
        default: ['node_modules'],
      })
      .option('directory', {
        description:
          'Specifies the base directory from which file scanning begins',
        alias: 'd',
        default: 'src/',
        type: 'string',
      })
      .option('output', {
        description: 'Specify an output folder for generated file',
        alias: 'o',
        type: 'string',
        default: '',
      })
      .option('print', {
        description: 'Prints an output to the console',
        default: false,
        type: 'boolean',
      });
  },
  async params => {
    const ignore = Array.isArray(params.ignore) ? params.ignore : [];
    const files = await recursive(params.directory, [
      ...ignore,
      (file, stats) => {
        if (stats.isDirectory()) {
          return false;
        }
        return !path.basename(file).endsWith(params.pattern);
      },
    ]);
    const configs: ConfigItem[] = [];
    for (const item of files) {
      const envs = await getEnvsFromFile(item);
      configs.push({ file: item, envs });
    }
    const example = configs
      .filter(item => item.envs.length > 0)
      .map(mapConfigItemToString)
      .join('\n\n');

    if (params.print) {
      console.log(example);
    } else {
      await fs.promises.writeFile(
        path.resolve(params.output, params.filename),
        example,
      );
    }
  },
).argv;
