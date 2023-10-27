declare namespace NodeJs{
    export interface ProcessEnv{
        DATABASE_URL: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;

        // JWT_EXPIRATION_TIME: string;
        // EMAIL_FROM: string;
        // EMAIL_HOST: string;
        // EMAIL_PORT: string;
        // EMAIL_USERNAME: string;
        // EMAIL_PASSWORD: string;
    } 
}