export declare function Env(key: string, { default: defaultValue, type: valueType }?: EnvParams): (target: object, propertyName: string) => void;
interface EnvParams {
    type?: StringConstructor | NumberConstructor | BooleanConstructor;
    default?: string | number | boolean;
}
export {};
