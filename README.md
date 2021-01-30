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
├── app.service.ts
├── config
│   ├── app.config.ts
│   └── index.ts
bootstrap.ts
```

Example app.config.ts

```ts
import { Env } from 'nestjs-env';

export class AppConfig {
    @Env('PORT', {default: 3000})
    port: number;

    @Env('NODE_ENV')
    env: string;
    
    get isDevelopment() {
      return this.env === 'development';
    }
}
```

Let's register the config module in `app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { EnvModule } from 'nestjs-env';
import { AppConfig } from 'src/config';

@Module({
    imports: [
        EnvModule.register([ AppConfig ]),
    ],
})
export class AppModule {}
```

### Usage

Now we are ready to inject our `AppConfig` anywhere we'd like.

```ts
import { AppConfig } from 'src/config';

@Injectable()
class AppService {
    constructor(private readonly appConfig: AppConfig) {
    	console.log(this.appConfig.isDevelopment);
    }
}
```

```ts
import {AppConfig} from 'src/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfig);
  
  await app.listen(config.port);
}
```

That's it!

-----

## License

The MIT License (MIT)

