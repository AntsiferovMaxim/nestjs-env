import { Module, Global, DynamicModule } from '@nestjs/common';

@Global()
@Module({})
export class EnvModule {
  static register(providers: any[]): DynamicModule {
    return {
      module: EnvModule,
      providers: providers,
      exports: providers,
    };
  }
}
