
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { prisma } from '../../shared/prisma';
import { Request } from 'express';
import { TCategoryFilterRequest } from './category.interface';
import { TPaginationOption } from '../../interfaces/pagination';
import { paginationHelpers } from '../../helper/paginationHelper';
import { categorySearchableFields } from './category.constant';
//import { imageUploader } from '../../shared/imageUpload';

const createCategoryIntoDB = async (req: Request) => {
  // let image = '';
  // if (req.file) {
  //   const img = await imageUploader.uploadImageToS3(req.file);
  //   image = img;
  // }
  const payload = {
    name: req.body.name,
    image: req.body.image,
  };
  const result = await prisma.category.create({ data: payload });
  return result;
};

const getAllCategoryFromDB = async (
  filters: TCategoryFilterRequest,
  option: TPaginationOption,
) => {

   // =========================
  // Filters
  // =========================
  const { searchTerm, ...filterData } = filters;

  // =========================
  // Pagination
  // =========================
  const {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  } = paginationHelpers.calculatePagination(option);

  // =========================
  // Dynamic Conditions
  // =========================
  const andConditions = [];

  // =========================
  // Search
  // =========================
  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // =========================
  // Boolean Convert
  // =========================
  if (typeof filterData.isDeleted === "string") {
    filterData.isDeleted = filterData.isDeleted === "true";
  }

  // =========================
  // Dynamic Filter
  // =========================
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(
        ([key, value]) => ({
          [key]: {
            equals: value,
          },
        })
      ),
    });
  }

  // =========================
  // Where
  // =========================
  const whereConditions=
    andConditions.length > 0
      ? { AND: andConditions }
      : {};

  // =========================
  // Query
  // =========================
  const result = await prisma.category.findMany({
    where: whereConditions,

    skip,

    take: limit,

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  // =========================
  // Total Count
  // =========================
  const total = await prisma.category.count({
    where: whereConditions,
  });

  // =========================
  // Response
  // =========================
  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },

    data: result,
  };
};
const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: { id, isDeleted: false },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category Not Found');
  }
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
  getSingleCategory,
  updateCategoryFromDB,
  deleteCategoryFromDB,
};
