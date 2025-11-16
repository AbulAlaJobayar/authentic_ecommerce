/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import hashPassword from '../../helper/hashPassword';
import { jwtHelper } from '../../helper/jwtHelper';
import prisma from '../../shared/prisma';
import { sendEmail } from '../../shared/sendEmail';
import verificationEmailTemplate from '../../template/verificationEmail';
import { generateCustomId } from './user.utils';
import { imageUploader, MulterFile } from '../../shared/imageUpload';
import { Request } from 'express';
import { Secret } from 'jsonwebtoken';
import { TUserFilterRequest } from './user.interface';
import { TPaginationOption } from '../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { paginationHelpers } from '../../helper/paginationHelper';

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

  // generate Otp and save DB
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // const hashOtp = (await hashPassword(otp.toString() as string)) as string;

  const user = await prisma.user.create({
    data: { ...req.body, otp },
    select: {
      id: true,
      name: true,
      customId: true,
      email: true,
      mobile: true,
      image: true,
      role: true,
      otp: true,
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
    html: verificationEmailTemplate(url, 'Verify My Email', user.otp as string),
  });

  return user;
};

const getAllUserFromDB = async (
  filters: TUserFilterRequest,
  option: TPaginationOption
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);

  if (typeof filterData.isDeleted === 'string') {
    if (filterData.isDeleted === 'true') {
      filterData.isDeleted = true;
    } else if (filterData.isDeleted === 'false') {
      filterData.isDeleted = false;
    }
  }
  if (typeof filterData.verifiedAt === 'string') {
    if (filterData.verifiedAt === 'true') {
      filterData.verifiedAt = true;
    } else if (filterData.verifiedAt === 'false') {
      filterData.verifiedAt = false;
    }
  }
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    select: {
      id: true,
      customId: true,
      name: true,
      email: true,
      mobile: true,
      image: true,
      role: true,
      isDeleted: true,
      accountStatus: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getMeFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      customId: true,
      name: true,
      email: true,
      mobile: true,
      image: true,
      role: true,
      verifiedAt: true,
      accountStatus: true,
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
  await prisma.user.update({
    where: { id: id },
    data: { isDeleted: true },
  });
  return null;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  getMeFromDB,
};
