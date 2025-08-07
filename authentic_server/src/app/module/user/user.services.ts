import { User } from '../../../../generated/prisma';
import config from '../../config';
import hashPassword from '../../helper/hashPassword';
import { jwtHelper } from '../../helper/jwtHelper';
import prisma from '../../shared/prisma';
import { sendEmail } from '../../shared/sendEmail';
import verificationEmailTemplate from '../../template/verificationEmail';
import { generateCustomId } from './user.utils';
import { imageUploader, MulterFile } from '../../shared/imageUpload';
import { Request } from 'express';

const createUserIntoDB = async (req: Request) => {
  const file = req.file as MulterFile;
  if (req.file) {
    const image = await imageUploader.uploadImageToS3(file);
    req.body.image = image;
  }
  const password = (await hashPassword(req.body.password as string)) as string;
  req.body.password = password;
  const customId = (await generateCustomId(req.body.role)) as string;
  req.body.customId = customId;
  const user = await prisma.user.create({
    data: req.body,
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
  // TODO ADD Pagination search sort field
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
const updateUserFromDB = async (req: Request) => {
  const { id } = req.params;
  const file = req.file as MulterFile;
  if (req.file) {
    const image = await imageUploader.uploadImageToS3(file);
    req.body.image = image;
  }
  const result = await prisma.user.update({
    where: { id: id },
    data: req.body,
  });
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await prisma.user.update({
    where: { id: id },
    data: { isDeleted: true },
  });
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserFromDB,
  deleteUserFromDB
};
