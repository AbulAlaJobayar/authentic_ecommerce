"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const logger_1 = require("./app/config/logger");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
                logger_1.logger.info(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log(error);
            logger_1.logger.error(error || " something went wrong");
        }
    });
}
main();
process.on("unhandledRejection", () => {
    console.log(`unhandled Rejection is Detected,shuting Down `);
    logger_1.logger.error(`unhandled Rejection is Detected,shuting Down `);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});
process.on("uncaughtException", () => {
    console.log(`unhandled Rejection is Detected,shuting Down `);
    logger_1.logger.error(`unhandled Rejection is Detected,shuting Down `);
    process.exit(1);
});
