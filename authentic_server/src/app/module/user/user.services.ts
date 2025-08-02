import { jwt } from 'zod';
import { User } from '../../../../generated/prisma';
import config from '../../config';
import hashPassword from '../../helper/hashPassword';
import { jwtHelper } from '../../helper/jwtHetper';
import prisma from '../../shared/prisma';
import { sendEmail } from '../../shared/sendEmail';
import verificationEmailTemplate from '../../template/verificationEmail';
import { generateCustomId } from './user.utils';

const createUserIntoDB = async (payload: User) => {
  const password = (await hashPassword(payload.password as string)) as string;

  const customId = (await generateCustomId(payload.role)) as string;
  const user = await prisma.user.create({
    data: { ...payload, customId, password },
    select: {
      id: true,
      name: true,
      customId: true,
      email: true,
      mobile: true,
      image: true,
      role: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  //localhost:3000/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  const tokenData = {
    id: user.id,
    email: user.email,
    customId: user.customId,
  };
  const verifyToken = jwtHelper.generateToken(
    tokenData,
    config.jwt.jwtVerifySecret,
    config.jwt.jwtVerifyExpire as any
  );
  const url = `${config.domainName}/verify?token=${verifyToken}`;

  sendEmail({
    to: user.email,
    subject: 'Verify your email',
    html: verificationEmailTemplate(url),
  });

  return user;
};
const getAllUserFromDB = async () => {
  const result = await prisma.user.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      customId: true,
      name: true,
      email: true,
      mobile: true,
      image: true,
      role: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
};
