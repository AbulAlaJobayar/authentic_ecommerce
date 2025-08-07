import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error/AppError';
import { jwtHelper } from '../helper/jwtHelper';
import config from '../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import prisma from '../shared/prisma';
import { TUserRole } from '../module/user/user.interface';
import catchAsync from '../shared/catchAsync';

const auth = (...role: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'user Unauthorized');
    }
    const verifyUser = jwtHelper.verifyToken(
      token,
      config.jwt.jwtAccessSecret as Secret
    ) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: verifyUser?.id, isDeleted: false },
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'user Not found');
    }
    if (user.accountStatus === 'BLOCK') {
      throw new AppError(httpStatus.FORBIDDEN, 'user is Blocked');
    }
    if (user.accountStatus === 'SUSPEND') {
      throw new AppError(httpStatus.FORBIDDEN, 'user is Suspend');
    }
    if (user.accountStatus === 'IN_PROGRESS') {
      throw new AppError(httpStatus.FORBIDDEN, 'user is In progress');
    }
    if (role && !role.includes(user.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    req.user = verifyUser as JwtPayload & { role: string };

    next();
  });
};
export default auth
