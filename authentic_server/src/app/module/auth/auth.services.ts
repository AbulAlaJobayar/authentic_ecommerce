import { sendEmail } from './../../shared/sendEmail';
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import comparPassword from '../../helper/comparPassword';
import { jwtHelper } from '../../helper/jwtHelper';
import config from '../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import verificationEmailTemplate from '../../template/verificationEmail';
import hashPassword from '../../helper/hashPassword';

const userLogin = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }
  
  if (!await comparPassword(payload.password, user.password)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'your password is incorrect');
  }

  // generate token
  const data = {
    id: user.id,
    customId: user.customId,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwtHelper.generateToken(
    data,
    config.jwt.jwtAccessSecret as Secret,
    config.jwt.jwtAccessExpire as any
  );
  const refreshToken = jwtHelper.generateToken(
    data,
    config.jwt.jwtRefreshSecret as Secret,
    config.jwt.jwtRefreshExpire as any
  );

  return {
    accessToken,
    refreshToken,
    verifyAt: user.verifiedAt,
  };
};


const verifyUser = async (token: string) => {
  const decoded = jwtHelper.verifyToken(
    token,
    config.jwt.jwtVerifySecret as Secret
  );
  const { id } = decoded as JwtPayload;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { verifiedAt: true },
  });
  return null;
};

const sendEmailVerification = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }
  //localhost:3000/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  const tokenData = {
    id: user.id,
    email: user.email,
    customId: user.customId,
    role: user.role,
  };
  const verifyToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwtVerifySecret as Secret,
    config.jwt.jwtVerifyExpire as any
  );
  const url = `${config.domainName}/verify?token=${verifyToken}`;

  sendEmail({
    to: user.email,
    subject: 'Verify your email',
    html: verificationEmailTemplate(url, 'Verify My Email'),
  });
  return null;
};




const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await prisma.user.findUnique({
    where: { id: userData.id },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (!user.verifiedAt) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Account not verified. Please verify your email'
    );
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }
  if (!await comparPassword(payload.oldPassword, user.password)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'your password is incorrect');
  }

  const newPassword = await hashPassword(payload.newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: newPassword },
  });
  return null;
};

const refreshToken = async (token: string) => {
  const decoded = jwtHelper.verifyToken(
    token,
    config.jwt.jwtRefreshSecret as Secret
  );
  const { id } = decoded as JwtPayload;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (!user.verifiedAt) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Account not verified. Please verify your email'
    );
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }
  // generate token
  const data = {
    id: user.id,
    customId: user.customId,
    name: user.name,
    role: user.role,
  };
  const accessToken = jwtHelper.generateToken(
    data,
    config.jwt.jwtAccessSecret as Secret,
    config.jwt.jwtAccessExpire as any
  );
  return accessToken;
};

const forgotPassword = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }
  if (!user.verifiedAt) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Account not verified. Please verify your email'
    );
  }
  //localhost:3000/reset?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  const tokenData = {
    id: user.id,
    email: user.email,
    customId: user.customId,
    role: user.role,
  };
  const verifyToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwtAccessSecret as Secret,
    '10m'
  );
  const url = `${config.domainName}/reset?token=${verifyToken}`;

  sendEmail({
    to: user.email,
    subject: 'Reset your Password',
    html: verificationEmailTemplate(url, 'Reset your Password in 10 minutes'),
  });
  return null;
};

const resetPassword = async (
  payload: { newPassword: string },
  token: string
) => {
  const decoded = jwtHelper.verifyToken(
    token,
    config.jwt.jwtAccessSecret as Secret
  );
  const { id } = decoded as JwtPayload;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'Account has been deleted');
  }
  if (!user.verifiedAt) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Account not verified. Please verify your email'
    );
  }
  if (user.accountStatus !== 'ACTIVE') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      `Account is ${user.accountStatus.toLowerCase()}`
    );
  }
  const newPassword = await hashPassword(payload.newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: newPassword },
  });
  return null;
};

export const AuthServices = {
  userLogin,
  verifyUser,
  sendEmailVerification,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
