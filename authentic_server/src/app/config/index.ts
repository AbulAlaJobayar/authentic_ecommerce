import dotenv from 'dotenv'
import path from "path"
dotenv.config({path:path.join(process.cwd(),'.env')})
export default{
    nodeEnv:process.env.NODE_ENV,
    database_url:process.env.DATABASE_URL,
    database_test_url:process.env.DATABASE_TEST_URL,
    port:process.env.PORT,
    saltRound:process.env.SALT_ROUND
}