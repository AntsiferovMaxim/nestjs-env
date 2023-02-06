import { Env } from 'nestjs-env';

interface JsonVariable {
  key: string;
}

export class AppConfig {
  @Env('PORT')
  port: number;

  @Env('ENV_STRING', { default: 'default env string' })
  envString: string;

  @Env('JSON_VARIABLE')
  jsonVariable: JsonVariable;
}
