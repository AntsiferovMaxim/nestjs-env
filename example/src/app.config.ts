import {Env} from 'nestjs-env';

export class AppConfig {
    @Env('PORT', {type: Number})
    port: number;
}
