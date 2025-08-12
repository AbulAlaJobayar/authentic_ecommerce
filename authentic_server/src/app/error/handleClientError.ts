import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TErrorSources } from '../interface/error';

const handleClientError = (err: PrismaClientKnownRequestError) => {
  let errors: TErrorSources = [];
  let message = '';
  const statusCode = 400;

  if (err.code === 'P2025') {
    message = (err.meta?.cause as string) || 'Record not found!';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (err.code === 'P2003') {
    if (err.message.includes('delete()` invocation:')) {
      message = 'Delete failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }

  return {
    statusCode,
    message,
    errorSources: errors,
  };
};

export default handleClientError;
