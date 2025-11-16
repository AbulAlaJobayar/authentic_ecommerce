/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';
import config from '../config';
import { IGenericErrorMessage } from '../interface/error';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import handleValidationError from '../error/handleValidationError';
import handleZodError from '../error/handleZodError';
import handleClientError from '../error/handleClientError';
import { AppError } from '../error/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.nodeEnv === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : ' Logger';
  // console.log(`🐱‍🏍 globalErrorHandler ~~ Error type:`, error.constructor.name);
  // console.log(
  //   `🐱‍🏍 Is PrismaClientKnownRequestError:`,
  //   error instanceof PrismaClientKnownRequestError
  // );
  // console.log(
  //   `🐱‍🏍 Is PrismaClientValidationError:`,
  //   error instanceof PrismaClientValidationError
  // );
  // console.log(`🐱‍🏍 Error code:`, error.code);
  // console.log(`🐱‍🏍 Error meta:`, error.meta);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof PrismaClientValidationError) {
    console.log('Handling PrismaClientValidationError');
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    console.log(' Handling ZodError');
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.code && error.constructor.name === 'PrismaClientKnownRequestError') {
    console.log('Handling PrismaClientKnownRequestError', error.code);
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof AppError) {
    console.log('Handling AppError');
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
     console.log('Handling generic Error');
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.nodeEnv !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
