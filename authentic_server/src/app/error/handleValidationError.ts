import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { IGenericErrorResponse } from "../interface/common";

const handleValidationError = (
  error: PrismaClientValidationError
): IGenericErrorResponse => {
 
  const errorMessage = error.message.split('\n').slice(-1)[0];
  
  const errors = [{
    path: "",
    message: errorMessage,
  }];
  
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;