import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './user.services';
import sendResponse from '../../shared/sendResponse';

const createUserIntoDB = catchAsync(async (req, res) => {
    console.log(req.body)
  const result = await UserService.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `${result?.name.toLocaleLowerCase} account created successfully!`,
    data: result,
  });
});

export const userController = {
  createUserIntoDB,
};
