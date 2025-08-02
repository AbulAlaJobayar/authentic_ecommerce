declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    DATABASE_URL: string;
    DATABASE_TEST_URL:string;
    PORT: number;
    SALT_ROUND:number
  };
}
