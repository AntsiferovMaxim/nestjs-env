import { Env, EnvType } from 'nestjs-env';

interface JsonVariable {
  key: string;
}

export class AppConfig {
  @Env('PORT', { type: EnvType.Number })
  port: number;

  @Env('ENV_STRING', { default: 'default env string' })
  envString: string;

  @Env('JSON_VARIABLE', { type: EnvType.Json })
  jsonVariable: JsonVariable;
}
