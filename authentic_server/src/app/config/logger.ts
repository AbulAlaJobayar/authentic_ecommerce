import winston from "winston";

import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
const { combine, timestamp, label, printf } = format;
// custom logger formate

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as string);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    label({ label: "Authentic Surgical" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),

    // store file formate
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "successes",
        "Authentic Surgical-%DATE%-success.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});
const errorLogger = winston.createLogger({
  level: "error",
  format: combine(
    label({ label: "Authentic Surgical" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),

    //store file formate
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        "logs",
        "winston",
        "errors",
        "Authentic Surgical-%DATE%-success.log"
      ),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export {logger ,errorLogger}