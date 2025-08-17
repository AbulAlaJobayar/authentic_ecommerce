import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import { Request } from 'express';
import { imageUploader } from '../../shared/imageUpload';

const createCategoryIntoDB = async (req: Request) => {
  let image = '';
  if (req.file) {
    const img = await imageUploader.uploadImageToS3(req.file);
    image = img;
  }
  const payload = {
    name: req.body.name,
    image,
  };
  const result = await prisma.category.create({ data: payload });
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await prisma.category.findMany({
    where: { isDeleted: false },
  });
  return result;
};

const updateCategoryFromDB = async (id: string, payload: { name: string }) => {
  const categoryIsExist = await prisma.category.findUnique({
    where: { id },
  });
  if (!categoryIsExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category Not Found');
  }
  if (categoryIsExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is Already deleted');
  }
  return await prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategoryFromDB = async (id: string) => {
  const categoryIsExist = await prisma.category.findUnique({
    where: { id },
  });
  if (!categoryIsExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category NOT Found');
  }
  if (categoryIsExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is Already deleted');
  }
  await prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });
  return null;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  updateCategoryFromDB,
  deleteCategoryFromDB,
};
