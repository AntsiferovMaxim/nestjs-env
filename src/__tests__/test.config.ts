import { Env } from '../module/env.decorator';

interface ITestJson {
  key: {
    test: string;
  };
}

export class TestConfig {
  @Env('TEST_NUMBER')
  testNumber: number;

  @Env('TEST_NUMBER_ZERO')
  testNumberZero: number;

  @Env('TEST_STRING')
  testString: string;

  @Env('TEST_BOOLEAN_FALSE')
  testBooleanFalse: boolean;

  @Env('TEST_BOOLEAN_TRUE')
  testBooleanTrue: boolean;

  @Env('TEST_JSON')
  testTestJson: ITestJson;

  @Env('TEST_DEFAULT', { default: 4 })
  testDefaultNumber: number;
}
