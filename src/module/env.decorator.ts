import { EnvNotFound } from './env-not-found.exception';

interface EnvParams {
  default?: string | number | boolean | object;
}

export function Env(key: string, params?: EnvParams) {
  const { default: defaultValue } = params || {};

  return (target: object, propertyName: string) => {
    const targetType = Reflect.getMetadata('design:type', target, propertyName);
    const env = process.env[key];

    if (env === undefined) {
      if (defaultValue === undefined) {
        throw new EnvNotFound(key);
      } else {
        Object.defineProperty(target, propertyName, {
          enumerable: true,
          configurable: false,
          value: defaultValue,
        });
        return;
      }
    }

    Object.defineProperty(target, propertyName, {
      enumerable: true,
      configurable: false,
      value: castValue(env, targetType),
    });
  };
}

function castValue(value: string, targetConstructor: any) {
  if (targetConstructor === Object) {
    return JSON.parse(value);
  }
  if (targetConstructor === Boolean) {
    return value === 'true';
  }
  return targetConstructor(value);
}
