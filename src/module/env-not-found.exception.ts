export class EnvNotFound extends Error {
    constructor(name: string) {
        super(`Env variable ${name} not found`);
    }
}
