import { EnvNotFound } from './env-not-found.exception';

export enum EnvType {
  String,
  Number,
  Boolean,
  Json,
}

interface EnvParams {
  type?: EnvType;
  default?: string | number | boolean;
}

export function Env(key: string, params?: EnvParams) {
  const { default: defaultValue, type: valueType = EnvType.String } =
    params || {};

  return (target: object, propertyName: string) => {
    const value =
      process.env[key] !== undefined
        ? castValue(process.env[key], valueType)
        : defaultValue;

    if (value === undefined) {
      throw new EnvNotFound(key);
    }

    Object.defineProperty(target, propertyName, {
      enumerable: true,
      configurable: false,
      value,
    });
  };
}

function castValue(value: string | undefined, valueType: EnvType) {
  if (value === undefined) {
    return undefined;
  }

  if (valueType === EnvType.Boolean) {
    return value.toLowerCase() === 'true';
  }

  if (valueType === EnvType.Json) {
    return JSON.parse(value);
  }

  if (valueType === EnvType.String) {
    return String(value);
  }

  if (valueType === EnvType.Number) {
    return Number(value);
  }
}
