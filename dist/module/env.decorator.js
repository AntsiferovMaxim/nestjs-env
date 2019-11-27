"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Env(key, { default: defaultValue, type: valueType = String } = {}) {
    return (target, propertyName) => {
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
exports.Env = Env;
function castValue(value, valueType) {
    if (value === undefined) {
        return;
    }
    if (valueType === Boolean) {
        return value.toLowerCase() === 'true';
    }
    return valueType(value);
}
