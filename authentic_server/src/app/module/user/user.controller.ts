import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './user.services';
import sendResponse from '../../shared/sendResponse';

const createUserIntoDB = catchAsync(async (req, res) => {
  console.log(req.file)
  const result = await UserService.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message:  "Account created successfully!",
    data: result,
  });
});
const getUserFromDB = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromDB();
  console.log(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:  "Account Retrieved successfully!",
    data: result,
  });
});

export const userController = {
  createUserIntoDB,
  getUserFromDB
};
