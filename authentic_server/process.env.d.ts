declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    DATABASE_URL: string;
    DATABASE_TEST_URL:string;
    PORT: number;
    SALT_ROUND:number;
    COMPANY_EMAIl:string;
    COMPANY_EMAIL_GEN_PASS:string;
    DOMAIN_NAME:string;
    JWT_VERIFY_SECRET:string;
JWT_VERIFY_EXPIRES_IN:string;
  };
}
