declare namespace NodeJs {
  export interface ProcessEnv {
    DATABASE_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    EMAIL_VERIFICATION_TOKEN_SECRET: string;
    MAIL_USERNAME: string;
    MAIL_PASSWORD: string;
    RESET_PASSWORD_TOKEN_SECRET: string;
    HOST_URL:String;

    // JWT_EXPIRATION_TIME: string;
    // EMAIL_FROM: string;
    // EMAIL_HOST: string;
    // EMAIL_PORT: string;
    // EMAIL_USERNAME: string;
    // EMAIL_PASSWORD: string;
  }
}
