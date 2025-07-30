declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    DATABASE_URL: string;
    PORT: number;
  };
}
