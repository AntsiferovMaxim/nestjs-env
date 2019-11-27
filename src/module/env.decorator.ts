export function Env(key: string, {default: defaultValue, type: valueType = String}: EnvParams = {}) {
    return (target: object, propertyName: string) => {
        const value = process.env[key] !== undefined ?
            castValue(process.env[key], valueType) :
            defaultValue;

        Object.defineProperty(target, propertyName, {
            enumerable: true,
            configurable: false,
            value,
        });
    };
}

function castValue(value: string | undefined, valueType: StringConstructor | NumberConstructor | BooleanConstructor) {
    if (value === undefined) {
        return;
    }

    if (valueType === Boolean) {
        return value.toLowerCase() === 'true';
    }

    return valueType(value);
}

interface EnvParams {
    type?: StringConstructor | NumberConstructor | BooleanConstructor;
    default?: string | number | boolean;
}
