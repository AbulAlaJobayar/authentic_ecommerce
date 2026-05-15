import httpStatus from 'http-status';
import { Warehouse } from '../../../../generated/prisma';
import { AppError } from '../../error/AppError';
import { prisma } from '../../shared/prisma';
import { warehouseSearchableFields } from './warehouse.const';
import { TPaginationOption } from '../../interfaces/pagination';
import { TWarehouseFilterRequest } from './warehouse.interface';
import { paginationHelpers } from '../../helper/paginationHelper';

const createWarehouseIntoDB = async (payload: Warehouse) => {
  const isWarehouseExist = await prisma.warehouse.findFirst({
    where: { name: payload.name, isDeleted: false },
  });
  if (isWarehouseExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Warehouse with this name already exists',
    );
  }
  const result = await prisma.warehouse.create({
    data: payload,
  });
  return result;
};
const getAllWarehouseFromDB = async (
  filters: TWarehouseFilterRequest,
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
      OR: warehouseSearchableFields.map((field) => ({
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
  const result = await prisma.warehouse.findMany({
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
  const total = await prisma.warehouse.count({
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

  // const result = await prisma.warehouse.findMany({
  //   where: { isDeleted: false },
  // });
  // return result;
};

const getSingleWarehouse = async (id: string) => {
  const result = await prisma.warehouse.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Warehouse Not Found');
  }
  return result;
};

const updateWarehouseFromDB = async (
  id: string,
  payload: Partial<{ payload: { name: string; address: string } }>,
) => {
  const warehouseIsExist = await prisma.warehouse.findUnique({
    where: { id, isDeleted: false },
  });
  if (!warehouseIsExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Warehouse not found');
  }
  const result = await prisma.warehouse.update({
    where: { id, isDeleted: false },
    data: payload,
  });
  return result;
};
const deleteWarehouseFromDB = async (id: string) => {
  const warehouseIsExist = await prisma.warehouse.findUnique({
    where: { id, isDeleted: false },
  });
  if (!warehouseIsExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Warehouse not found');
  }
  await prisma.warehouse.update({
    where: { id, isDeleted: false },
    data: { isDeleted: true },
  });
  return null;
};

export const WarehouseServices = {
  createWarehouseIntoDB,
  getAllWarehouseFromDB,
  getSingleWarehouse,
  updateWarehouseFromDB,
  deleteWarehouseFromDB,
};
