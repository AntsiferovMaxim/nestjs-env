import { Injectable } from '@nestjs/common';

import { AppConfig } from './configs/app.config';

@Injectable()
export class AppService {
  constructor(private appConfig: AppConfig) {}

  getHello(): string {
    return `Hello World! ${this.appConfig.envString}`;
  }
}
