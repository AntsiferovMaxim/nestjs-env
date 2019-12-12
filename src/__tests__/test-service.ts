import {Injectable} from '@nestjs/common';
import {TestConfig} from './test.config';

@Injectable()
export class TestService {
    constructor(private testConfig: TestConfig) {}

    testMethod(): string {
        return this.testConfig.testString;
    }
}
