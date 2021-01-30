import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfig } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfig);

  console.log('port', appConfig.port, typeof appConfig.port);
  console.log('envString', appConfig.envString, typeof appConfig.envString);
  console.log('jsonVariable', appConfig.jsonVariable, typeof appConfig.jsonVariable);

  await app.listen(appConfig.port);
}

bootstrap();
