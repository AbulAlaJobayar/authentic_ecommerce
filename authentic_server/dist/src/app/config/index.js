"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    nodeEnv: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    database_test_url: process.env.DATABASE_TEST_URL,
    port: process.env.PORT,
    saltRound: process.env.SALT_ROUND,
    companyEmail: process.env.COMPANY_EMAIl,
    companyPass: process.env.COMPANY_EMAIL_GEN_PASS,
    domainName: process.env.DOMAIN_NAME,
    jwt: {
        jwtVerifySecret: process.env.JWT_VERIFY_SECRET,
        jwtVerifyExpire: process.env.JWT_VERIFY_EXPIRES_IN,
        jwtAccessSecret: process.env.JWT_ACCESS_EXPIRES_IN,
        jwtAccessExpire: process.env.JWT_ACCESS_EXPIRES_IN,
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
        jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    aws: {
        bucket: process.env.AWS_BUCKET_NAME,
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION,
        secretAccess: process.env.AWS_SECRET_ACCESS_KEY,
    },
};
