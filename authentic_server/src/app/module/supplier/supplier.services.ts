/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Supplier } from '../../../../generated/prisma';
import { AppError } from '../../error/AppError';
import { prisma } from '../../shared/prisma';
import { TPaginationOption } from '../../interfaces/pagination';
import { TSupplierFilterRequest } from './supplier.interface';
import { paginationHelpers } from '../../helper/paginationHelper';
import { supplierSearchableFields } from './supplier.constant';

// TODO: define Type for payload
const createSupplierIntoDB = async (payload: any) => {
  const result = await prisma.supplier.create({
    data: payload,
  });
  return result;
};

const getAllSupplierFromDB = async (
  filters: TSupplierFilterRequest,
  option: TPaginationOption,
) => {
  // =========================
  // Filters
  // =========================
  const { searchTerm, ...filterData } = filters;

  // =========================
  // Pagination
  // =========================
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);

  // =========================
  // Dynamic Conditions
  // =========================
  const andConditions = [];

  // =========================
  // Search
  // =========================
  if (searchTerm) {
    andConditions.push({
      OR: supplierSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // =========================
  // Boolean Convert
  // =========================
  if (typeof filterData.isDeleted === 'string') {
    filterData.isDeleted = filterData.isDeleted === 'true';
  }

  // =========================
  // Dynamic Filter
  // =========================
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: {
          equals: value,
        },
      })),
    });
  }

  // =========================
  // Where
  // =========================
  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // =========================
  // Query
  // =========================
  const result = await prisma.supplier.findMany({
    where: whereConditions,

    skip,

    take: limit,

    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  // =========================
  // Total Count
  // =========================
  const total = await prisma.supplier.count({
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
const getSingleSupplierFromDB = async (id: string) => {
  const result = await prisma.supplier.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Supplier not found');
  }
  return result;
};

const updateSupplierFromDB = async (id: string, payload: Partial<Supplier>) => {
  const isSupplierExist = await prisma.supplier.findFirst({
    where: { id },
  });
  if (payload.isDeleted === false && isSupplierExist?.isDeleted) {
    const result = await prisma.supplier.update({
      where: { id: id },
      data: payload,
    });
    return result;
  }

  if (!isSupplierExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Supplier Not Found');
  }
  if (isSupplierExist?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Supplier is deleted');
  }

  const result = await prisma.supplier.update({
    where: { id: id },
    data: payload,
  });
  return result;
};

const deleteSupplierFromDB = async (id: string) => {
  const isSupplierExist = await prisma.supplier.findFirst({
    where: { id },
  });
  if (!isSupplierExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Supplier Not Found');
  }
  if (isSupplierExist?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Supplier is Already deleted');
  }
  await prisma.supplier.update({
    where: { id },
    data: { isDeleted: true },
  });
  return null;
};

export const SupplierServices = {
  createSupplierIntoDB,
  getAllSupplierFromDB,
  getSingleSupplierFromDB,
  updateSupplierFromDB,
  deleteSupplierFromDB,
};
