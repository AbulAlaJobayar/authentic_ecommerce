import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { AuthServices } from './auth.services';
import { AppError } from '../../error/AppError';

const loinUser = catchAsync(async (req, res) => {
  const result = await AuthServices.userLogin(req.body);
  const { accessToken, refreshToken, verifyAt } = result;

  req.cookies('refreshToken', refreshToken, {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged In successfully!',
    data: {
      accessToken,
      verifyAt,
    },
  });
});
const verifyUser = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }
  const result = await AuthServices.verifyUser(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User verify successfully!',
    data: result,
  });
});
const sendEmailVerification = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await AuthServices.sendEmailVerification(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'send email successfully please check your Email!',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed  successfully !',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'No refresh token provided');
  }
  const result = await AuthServices.refreshToken(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});
const forgotPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await AuthServices.forgotPassword(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }

  const result = await AuthServices.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthController = {
  loinUser,
  verifyUser,
  sendEmailVerification,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
