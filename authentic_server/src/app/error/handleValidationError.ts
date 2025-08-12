import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { TErrorSources } from '../interface/error';

const handleValidationError = (err: PrismaClientValidationError) => {
  // handle the error here
  const errorSources: TErrorSources = [
    {
      path: '',
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};
export default handleValidationError 
