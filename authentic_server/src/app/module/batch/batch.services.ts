import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import { TCreateProductBatch } from './batch.interface';
// import { errorLogger } from '../../config/logger';
import moment from 'moment';

const createProductBatchIntoDB = async (payload: TCreateProductBatch) => {
  payload.expiryDate = moment(payload.expiryDate, 'YYYY-MM-DD')
    .toDate()
    .toISOString();
  try {
    const result = await prisma.$transaction(async (tx) => {
      const isInventoryExist = await tx.inventory.findUnique({
        where: {
          id: payload.inventoryId,
        },
      });
      if (!isInventoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Inventory Not Found');
      }
      if (isInventoryExist.isDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, 'Inventory is Deleted');
      }
      const isSupplierExist = await tx.supplier.findUnique({
        where: { id: payload.supplierId },
      });
      if (!isSupplierExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Supplier Not Found');
      }
      if (isSupplierExist.isDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, 'Inventory is Deleted');
      }
      const isWarehouseExist = await tx.warehouse.findUnique({
        where: { id: payload.warehouseId },
      });
      if (!isWarehouseExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'warehouse Not Found');
      }
      if (isWarehouseExist.isDeleted) {
        throw new AppError(httpStatus.NOT_FOUND, 'warehouse is Deleted');
      }
      //   create new Product Batch
      const batch = await tx.productBatch.create({
        data: payload,
      });
      const inventory = await tx.inventory.update({
        where: { id: batch.inventoryId },
        data: {
          quantity: {
            increment: batch.quantity,
          },
        },
      });

      //update product price if the new batch price is higher than the existing price
      const product = await tx.product.findUnique({
        where: { id: inventory.productId },
      });
      if (product?.sellingPrice && batch.sellingPrice > product?.sellingPrice) {
        await tx.product.update({
          where: { id: product.id },
          data: { sellingPrice: batch.sellingPrice },
        });
      }
      return batch;
    });
    return result;
  } catch (error) {
    console.log(error);
   // errorLogger.error('Failed to create product batch', error);
    throw error;
  }
};

const getAllProductBatchFromDB = async () => {
  const batch = await prisma.productBatch.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      batchNumber: true,
      expiryDate: true,
      quantity: true,
      buyingPrice: true,
      costPrice: true,
      sellingPrice: true,
      shelfCode: true,
      rackCode: true,
      inventoryId: true,
      supplierId: true,
      warehouseId: true,
      inventory: {
        select: {
          product: true,
        },
      },
      supplier: true,
      warehouse: true,
      createdAt: true,
      updatedAt:true
    },
  });
  return batch;
};
const getSingleProductBatchFromDB = async (id: string) => {
  const batch = await prisma.productBatch.findUnique({
    where: { id },select: {
      id: true,
      batchNumber: true,
      expiryDate: true,
      quantity: true,
      buyingPrice: true,
      isDeleted:true,
      costPrice: true,
      sellingPrice: true,
      shelfCode: true,
      rackCode: true,
      inventoryId: true,
      supplierId: true,
      warehouseId: true,
      inventory: {
        select: {
          product: true,
        },
      },
      supplier: true,
      warehouse: true,
      createdAt: true,
      updatedAt:true
    },
  });
  if (!batch) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Batch Not Found');
  }
  if (batch.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Batch is Deleted');
  }
  return batch;
};

const updateProductBatchFromDB = async (
  id: string,
  payload: Partial<TCreateProductBatch>
) => {
  // inventory Is Exist
  if (payload.inventoryId) {
    const inventory = await prisma.inventory.findUnique({
      where: { id: payload.inventoryId, isDeleted: false },
    });
    if (!inventory) {
      throw new AppError(httpStatus.NOT_FOUND, 'Inventory Not Found');
    }
  }
  // Supplier is Exist
  if (payload.supplierId) {
    const result = await prisma.supplier.findUnique({
      where: { id: payload.supplierId, isDeleted: false },
    });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'supplier Not Found');
    }
  }
  // Warehouse is Exist
  if (payload.warehouseId) {
    const result = await prisma.warehouse.findUnique({
      where: { id: payload.warehouseId, isDeleted: false },
    });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Warehouse Not found');
    }
  }
  const existingBatch = await prisma.productBatch.findFirst({
    where: { id },
  });
  if (!existingBatch) {
    throw new AppError(httpStatus.NOT_FOUND, 'batch Not Found');
  }
  // 3. Calculate quantity difference (if payload has new quantity)
  let quantityDifference = 0;
  if (payload.quantity !== undefined) {
    quantityDifference = payload.quantity - existingBatch.quantity;
  }
  const batch = await prisma.productBatch.update({
    where: { id: existingBatch.id },
    data: payload,
  });
  if (!batch) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Batch Not updated');
  }
  // 5. Update inventory quantity if there was a change
  if (quantityDifference !== 0) {
    await prisma.inventory.update({
      where: { id: batch.inventoryId },
      data: {
        quantity: { increment: quantityDifference },
      },
    });
  }
  return batch;
};

const deleteProductBatchFromDB = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    // 1. Find the batch
    const batch = await tx.productBatch.findUnique({
      where: { id },
    });

    if (!batch) {
      throw new AppError(httpStatus.NOT_FOUND, 'Batch Not Found');
    }

    // 2. Soft delete batch
    const updatedBatch = await tx.productBatch.update({
      where: { id },
      data: { isDeleted: true },
    });

    // 3. Decrement inventory quantity
    await tx.inventory.update({
      where: { id: batch.inventoryId },
      data: {
        quantity: {
          decrement: batch.quantity,
        },
      },
    });

    return updatedBatch;
  });
  return result;
};
export const ProductBatchService = {
  createProductBatchIntoDB,
  getAllProductBatchFromDB,
  getSingleProductBatchFromDB,
  updateProductBatchFromDB,
  deleteProductBatchFromDB,
};
