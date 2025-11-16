import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IGenericErrorMessage } from '../interface/error';

const handleClientError = (error: PrismaClientKnownRequestError) => {
  let errors: IGenericErrorMessage[] = [];
  let message = 'Database operation failed';
  const statusCode = 400;

if (error.code === 'P2002') {
  // For P2002, the target is usually an array of field names
  const fields = (error.meta?.target as string[]) || ['field'];
  const fieldNames = fields.join(', ');
  message = `${fieldNames} already exists`;
  errors = fields.map((field) => ({
    path: field,
    message: `${field} already exists`,
  }));

  console.log('P2002 error handled:', { fields, message, errors });
} else if (error.code === 'P2025') {
  message = (error.meta?.cause as string) || 'Record not found!';
  errors = [
    {
      path: '',
      message,
    },
  ];
} else if (error.code === 'P2003') {
  if (error.message.includes('delete()` invocation:')) {
    message = 'Delete failed - record might be referenced by other records';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else {
    message = 'Foreign key constraint failed';
    errors = [
      {
        path: '',
        message,
      },
    ];
  }
} else if (error.code === 'P2014') {
  message = 'Invalid ID provided';
  errors = [
    {
      path: 'id',
      message: 'The provided ID is invalid',
    },
  ];
} else if (error.code === 'P2016') {
  message = 'Query interpretation error';
  errors = [
    {
      path: '',
      message: 'Invalid query parameters',
    },
  ];
} else {
  // Handle other Prisma error codes
  message = error.message.split('\n').slice(-1)[0]; // Get the last line of Prisma error
  errors = [
    {
      path: '',
      message,
    },
  ];
}

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError;
