### Install

**Yarn**
```bash
yarn add nestjs-env
```

**NPM**
```bash
npm install nestjs-env --save
```
> This library is not responsible for loading environment variables from a file, for this you need to use `env-cmd` or `dotenv`.
### Getting Started

Let's imagine that we have a folder called `src/config` in our project that contains several configuration files.

```bash
/src
├── app.module.ts
├── config
│   ├── app.config.ts
│   ├── grpc.config.ts
│   └── index.ts
```

Example app.config.ts

```ts
import {Env, EnvType} from 'nestjs-env';

export class AppConfig {
    @Env('PORT', {type: EnvType.Number, default: 3000})
    port: number;

    @Env('NODE_ENV')
    env: string;
}
```

Let's register the config module in `app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { EnvModule } from 'nestjs-env';
import { AppConfig, GrpcConfig } from './config';

@Module({
    imports: [
        EnvModule.register([ AppConfig, GrpcConfig ]),
    ],
})
export class AppModule {}
```

### Usage

Now we are ready to inject our `AppConfig` anywhere we'd like.

```ts
import {AppConfig} from 'src/config';

@Injectable()
class SomeService {

    constructor(private readonly appConfig: AppConfig) {}
    
    isProduction() {
        const env = this.appConfig.env;
        
        return env === 'production';
    }
}
```

That's it!

-----
