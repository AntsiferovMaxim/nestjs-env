import { Env, EnvNotFound } from '..';
import { TestConfig } from './test.config';

describe('Env decorator', () => {
  const testConfig = new TestConfig();

  describe('Number', () => {
    it('should return number type', () => {
      expect(typeof testConfig.testNumber).toBe('number');
    });

    it('should return 1', () => {
      expect(testConfig.testNumber).toBe(1);
    });

    it('should return 0', () => {
      expect(testConfig.testNumberZero).toBe(0);
    });
  });

  describe('String', () => {
    it('should return string type', () => {
      expect(typeof testConfig.testString).toBe('string');
    });

    it('should return test_string', () => {
      expect(testConfig.testString).toBe('test_string');
    });
  });

  describe('Boolean', () => {
    it('should return boolean type', () => {
      expect(typeof testConfig.testBooleanFalse).toBe('boolean');
    });

    it('should return true', () => {
      expect(testConfig.testBooleanTrue).toBe(true);
    });

    it('should return false', () => {
      expect(testConfig.testBooleanFalse).toBe(false);
    });
  });

  describe('Json', () => {
    it('should return object type', () => {
      expect(typeof testConfig.testTestJson).toBe('object');
    });

    it('should return "value" string', () => {
      expect(testConfig.testTestJson.key.test).toBe('value');
    });
  });

  describe('Default value', () => {
    it('should return 4 as default value', () => {
      expect(testConfig.testDefaultNumber).toBe(4);
    });
  });

  describe('Exception', () => {
    it('should throw exception', () => {
      expect(() => {
        class TestExceptionTest {
          @Env('TEST_EXCEPTION')
          testException: string;
        }

        new TestExceptionTest();
      }).toThrow(EnvNotFound);
    });
  });
});
