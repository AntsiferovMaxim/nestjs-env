import { Test } from '@nestjs/testing';
import {EnvModule} from '../module/env.module';
import {TestService} from './test-service';
import {TestConfig} from './test.config';


describe('Env module', () => {
    it('Will boot nest-env module successfully', async () => {
        const module = await Test.createTestingModule({
            imports: [
                EnvModule.register([TestConfig]),
            ],
            providers: [TestService],
        }).compile();
        const app = module.createNestApplication();

        const testService = app.get<TestService>(TestService);
        expect(testService.testMethod()).toBeTruthy();
    })
});
