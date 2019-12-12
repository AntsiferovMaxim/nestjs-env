import {Env, EnvType} from "../module/env.decorator";

interface ITestJson {
    key: {
        test: string;
    }
}

export class TestConfig {
    @Env('TEST_NUMBER', {type: EnvType.Number})
    testNumber: number;

    @Env('TEST_NUMBER_ZERO', {type: EnvType.Number})
    testNumberZero: number;

    @Env('TEST_STRING', {type: EnvType.String})
    testString: string;

    @Env('TEST_BOOLEAN_FALSE', {type: EnvType.Boolean})
    testBooleanFalse: boolean;

    @Env('TEST_BOOLEAN_TRUE', {type: EnvType.Boolean})
    testBooleanTrue: boolean;

    @Env('TEST_JSON', {type: EnvType.Json})
    testTestJson: ITestJson;

    @Env('TEST_DEFAULT_NUMBER', {type: EnvType.Number, default: 4})
    testDefaultNumber: number;
}
