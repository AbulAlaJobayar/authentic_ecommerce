declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    DATABASE_URL: string;
    DATABASE_TEST_URL: string;
    PORT: number;
    SALT_ROUND: number;
    COMPANY_EMAIl: string;
    COMPANY_EMAIL_GEN_PASS: string;
    DOMAIN_NAME: string;
    JWT_VERIFY_SECRET: string;
    JWT_VERIFY_EXPIRES_IN: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_BUCKET_NAME: string;
  };
}
