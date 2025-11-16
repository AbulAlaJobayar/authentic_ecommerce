import app from "./app";
import config from "./app/config";
import { Server } from "http";
// import { logger } from "./app/config/logger";

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
      //logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    //logger.error(error || " something went wrong");
  }
}
main();
process.on("unhandledRejection", () => {
  console.log(`unhandled Rejection is Detected,shuting Down `);
  //logger.error(`unhandled Rejection is Detected,shuting Down `);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on("uncaughtException", () => {
  console.log(`unhandled Rejection is Detected,shuting Down `);
  //logger.error(`unhandled Rejection is Detected,shuting Down `);
  process.exit(1);
});
