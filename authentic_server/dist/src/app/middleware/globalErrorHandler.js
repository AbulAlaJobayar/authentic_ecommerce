"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
const library_1 = require("@prisma/client/runtime/library");
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../error/handleValidationError"));
const handleClientError_1 = __importDefault(require("../error/handleClientError"));
const AppError_1 = require("../error/AppError");
const logger_1 = require("../config/logger");
const globalErrorHandler = (err, req, res, next) => {
    config_1.default.nodeEnv === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { err })
        : logger_1.logger.error(`🐱‍🏍 globalErrorHandler ~~`, err);
    //   setting  default response
    let statusCode = 500;
    let message = 'something went wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.default)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorSources = zodError.errorSources;
    }
    else if (err instanceof library_1.PrismaClientValidationError) {
        const validationError = (0, handleValidationError_1.default)(err);
        statusCode = validationError.statusCode;
        message = validationError.message;
        errorSources = validationError.errorSources;
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        const clientError = (0, handleClientError_1.default)(err);
        statusCode = clientError.statusCode;
        message = clientError.message;
        errorSources = clientError.errorSources;
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    //   ultimate Return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config_1.default.nodeEnv === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
