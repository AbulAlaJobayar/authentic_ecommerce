/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import handleClientError from '../error/handleClientError';
import { AppError } from '../error/AppError';
import { logger } from '../config/logger';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.nodeEnv === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { err })
    : logger.error(`🐱‍🏍 globalErrorHandler ~~`, err);

  //   setting  default response
  let statusCode = 500;
  let message = 'something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorSources = zodError.errorSources;
  } else if (err instanceof PrismaClientValidationError) {
    const validationError = handleValidationError(err);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorSources = validationError.errorSources;
  } else if (err instanceof PrismaClientKnownRequestError) {
    const clientError = handleClientError(err);
    statusCode = clientError.statusCode;
    message = clientError.message;
    errorSources = clientError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  //   ultimate Return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.nodeEnv === 'development' ? err?.stack : null,
  });
};
export default globalErrorHandler;
