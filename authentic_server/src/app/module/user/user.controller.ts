import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './user.services';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { userFiltarableableFields } from './user.constant';
import { Request, Response } from 'express';

const createUserIntoDB = catchAsync(async (req, res) => {
  const { data: result, token } = await UserService.createUserIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Account created successfully!',
    data: { result, token },
  });
});
const getUserFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFiltarableableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await UserService.getAllUserFromDB(filters, options);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getMeFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await UserService.getMeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account Retrieved successfully!',

    data: result,
  });
});

const updateUserFromDB = catchAsync(async (req, res) => {
  const result = await UserService.updateUserFromDB(req);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfully!',
    data: result,
  });
});
const deleteUserFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUserFromDB(id);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const userController = {
  createUserIntoDB,
  getUserFromDB,
  getMeFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
