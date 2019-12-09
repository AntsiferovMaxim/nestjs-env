import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {AppConfig} from './app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig = app.get(AppConfig);

    console.log(appConfig.jsonVariable.key);

    await app.listen(appConfig.port);
}

bootstrap();
