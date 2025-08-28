/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { paginationHelpers } from '../../helper/paginationHelper';
import { TPaginationOption } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { productSearchableFields } from './inventory.constant';
import {
  TInventoryFilterRequest,
  TUpdateProductRequest,
} from './inventory.interface';
import { AppError } from '../../error/AppError';
import { logger } from '../../config/logger';

const getAllInventoryFromDB = async (
  filters: TInventoryFilterRequest,
  option: TPaginationOption
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);

  const andConditions: any[] = [];

  // Search logic
  if (searchTerm) {
    andConditions.push({
      OR: [
        // Example: search inventory `id`
        { id: { contains: searchTerm, mode: 'insensitive' } },
        // Search inside product fields
        {
          product: {
            OR: productSearchableFields.map((field) => ({
              [field]: { contains: searchTerm, mode: 'insensitive' },
            })),
          },
        },
      ],
    });
  }

  // Filters logic
  const inventoryFilters: any = {};
  const productFilters: any = {};

  Object.keys(filterData).forEach((key) => {
    const value = filterData[key as keyof typeof filterData];
    if (value === undefined || value === null || value === '') return; // skip invalid filters

    if (['name', 'category', 'status', 'sku'].includes(key)) {
      productFilters[key] = value;
    } else if (key === 'isDeletedInventory') {
      inventoryFilters['isDeleted'] = value;
    } else if (key === 'isDeletedProduct') {
      productFilters['isDeleted'] = value;
    } else {
      inventoryFilters[key] = value;
    }
  });

  if (Object.keys(inventoryFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(inventoryFilters).map(([key, value]) => ({
        [key]: { equals: value },
      })),
    });
  }

  if (Object.keys(productFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(productFilters).map(([key, value]) => ({
        product: { [key]: { equals: value } },
      })),
    });
  }
 andConditions.push({isDeleted:false})
  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.inventory.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? sortBy.startsWith('product.')
          ? { product: { [sortBy.replace('product.', '')]: sortOrder } }
          : { [sortBy]: sortOrder }
        : { createdAt: 'desc' },
    select: {
      id: true,
      quantity: true,
      alertQuantity: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          description: true,
          image: true,
          status: true,
          sellingPrice: true,
          category: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      },

      productBatch: {
        select: {
          id: true,
          batchNumber: true,
          expiryDate: true,
          quantity: true,
          isDeleted: true,
          buyingPrice: true,
          costPrice: true,
          sellingPrice: true,
          shelfCode: true,
          rackCode: true,
          supplier: true,
          warehouse: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  const total = await prisma.inventory.count({ where: whereConditions });

  return {
    meta: { total, page, limit },
    data: result,
  };
};
const getSingleInventoryFromDB = async (id: string) => {
  const result = await prisma.inventory.findUnique({
    where: { id },
    select: {
      id: true,
      quantity: true,
      alertQuantity: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          description: true,
          image: true,
          status: true,
          sellingPrice: true,
          category: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      },

      productBatch: {
        select: {
          id: true,
          batchNumber: true,
          expiryDate: true,
          quantity: true,
          isDeleted: true,
          buyingPrice: true,
          costPrice: true,
          sellingPrice: true,
          shelfCode: true,
          rackCode: true,
          supplier: true,
          warehouse: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'inventory Not Found');
  }
  console.log();
  if (result.product.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, ' Product is  deleted');
  }
  if (result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, ' Inventory is  deleted');
  }
  return result;
};

const updateInventoryFromDB = async (
  id: string,
  payload: TUpdateProductRequest
) => {
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    select: {
      id: true,
      productId: true,
      quantity: true,
      alertQuantity: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          description: true,
          image: true,
          status: true,
          sellingPrice: true,
          category: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      },

      productBatch: {
        select: {
          id: true,
          batchNumber: true,
          expiryDate: true,
          quantity: true,
          isDeleted: true,
          buyingPrice: true,
          costPrice: true,
          sellingPrice: true,
          shelfCode: true,
          rackCode: true,
          supplier: true,
          warehouse: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  if (!inventory) {
    throw new AppError(httpStatus.NOT_FOUND, ' inventory not found');
  }
  if (payload.product) {
    console.log(payload.product);
    await prisma.product.update({
      where: { id: inventory.productId },
      data: payload.product,
    });
  }
  if (payload.inventory) {
    await prisma.inventory.update({
      where: { id: inventory.id },
      data: payload.inventory,
    });
  }

  return inventory;
};
const deleteInventoryFromDB = async (id: string) => {
  const invent = await prisma.inventory.findUnique({
    where: { id },
  });
  if (!invent) {
    throw new AppError(httpStatus.NOT_FOUND, 'inventory not found');
  }
  if (invent.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'inventory is already deleted');
  }
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Mark inventory as deleted
      const inventory = await tx.inventory.update({
        where: { id },
        data: { isDeleted: true },
      });
      // 2. Mark product as deleted
      await tx.product.update({
        where: { id: inventory.productId },
        data: { isDeleted: true, status: 'DISCONTINUED' },
      });
      // 3. Mark related productBatches as deleted
      await tx.productBatch.updateMany({
        where: { inventoryId: id },
        data: { isDeleted: true },
      });

      return null;
    });
    return result;
  } catch (error) {
    logger.error(error);
    console.log(error);
  }
};

export const InventoryServices = {
  getAllInventoryFromDB,
  getSingleInventoryFromDB,
  updateInventoryFromDB,
  deleteInventoryFromDB,
};
