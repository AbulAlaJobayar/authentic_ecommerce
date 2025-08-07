"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_2 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf } = winston_2.format;
// custom logger formate
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: "info",
    format: combine(label({ label: "Authentic Surgical" }), timestamp(), myFormat),
    transports: [
        new winston_2.transports.Console(),
        // store file formate
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "winston", "successes", "Authentic Surgical-%DATE%-success.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: false,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.logger = logger;
const errorLogger = winston_1.default.createLogger({
    level: "error",
    format: combine(label({ label: "Authentic Surgical" }), timestamp(), myFormat),
    transports: [
        new winston_2.transports.Console(),
        //store file formate
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), "logs", "winston", "errors", "Authentic Surgical-%DATE%-success.log"),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: false,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.errorLogger = errorLogger;
