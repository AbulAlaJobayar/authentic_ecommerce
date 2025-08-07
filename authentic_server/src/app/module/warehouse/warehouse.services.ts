import httpStatus from 'http-status';
import { Warehouse } from '../../../../generated/prisma';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';

const createWarehouseIntoDB = async (payload: Warehouse) => {
  const isWarehouseExist = await prisma.warehouse.findFirst({
    where: { name: payload.name, isDeleted: false },
  });
  if (isWarehouseExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Warehouse with this name already exists'
    );
  }
  const result = await prisma.warehouse.create({
    data: payload,
  });
  return result;
};
const getAllWarehouseFromDB = async () => {
  const result = await prisma.warehouse.findMany({
    where: { isDeleted: false },
  });
  return result;
};

const updateWarehouseFromDB = async (
  id: string,
  payload: Partial<{ payload: { name: string; address: string } }>
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
  updateWarehouseFromDB,
  deleteWarehouseFromDB,
};
