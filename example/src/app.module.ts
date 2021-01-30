import { Module } from '@nestjs/common';
import { EnvModule } from 'nestjs-env';

import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvModule.register([AppConfig])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
