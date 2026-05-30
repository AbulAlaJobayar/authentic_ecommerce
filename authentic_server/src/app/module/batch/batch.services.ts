/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { TCreateProductBatch } from "./batch.interface";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status"
import { prisma } from "../../shared/prisma";




// ------------------------------
// Inventory Recalculate Helper
// ------------------------------
const recalculateInventoryQuantity = async (
  tx: any,
  inventoryId: string
) => {
  const result = await tx.productBatch.aggregate({
    where: {
      inventoryId,
      isDeleted: false,
    },
    _sum: {
      quantity: true,
    },
  });

  await tx.inventory.update({
    where: { id: inventoryId },
    data: {
      quantity: result._sum.quantity || 0,
    },
  });
};

// ------------------------------
// MAIN SERVICE
// ------------------------------
export const createProductBatchIntoDB = async (
  payload: TCreateProductBatch
) => {
  try {
    const formattedExpiryDate = moment(
      payload.expiryDate,
      "YYYY-MM-DD",
      true
    );

    //  validate date format
    if (!formattedExpiryDate.isValid()) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid expiry date format (YYYY-MM-DD required)"
      );
    }

    // optional business rule: expiry must be future
    if (formattedExpiryDate.isBefore(moment())) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Expiry date must be in the future"
      );
    }

    return await prisma.$transaction(async (tx) => {
      // ------------------------
      // 1. Check Inventory
      // ------------------------
      const inventory = await tx.inventory.findUnique({
        where: { id: payload.inventoryId },
      });

      if (!inventory || inventory.isDeleted) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Inventory not found or deleted"
        );
      }

      // ------------------------
      // 2. Check Supplier
      // ------------------------
      const supplier = await tx.supplier.findUnique({
        where: { id: payload.supplierId },
      });

      if (!supplier || supplier.isDeleted) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Supplier not found or deleted"
        );
      }

      // ------------------------
      // 3. Check Warehouse
      // ------------------------
      const warehouse = await tx.warehouse.findUnique({
        where: { id: payload.warehouseId },
      });

      if (!warehouse || warehouse.isDeleted) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Warehouse not found or deleted"
        );
      }

      // ------------------------
      // 4. Create Batch
      // ------------------------
      const batch = await tx.productBatch.create({
        data: {
          inventoryId: payload.inventoryId,
          batchNumber: payload.batchNumber,
          expiryDate: formattedExpiryDate.toDate(),
          quantity: payload.quantity,
          buyingPrice: payload.buyingPrice,
          costPrice: payload.costPrice,
          sellingPrice: payload.sellingPrice,
          shelfCode: payload.shelfCode,
          rackCode: payload.rackCode,
          supplierId: payload.supplierId,
          warehouseId: payload.warehouseId,
          remainingQuantity: payload.quantity,
        },
      });

      // ------------------------
      // 5. Recalculate Inventory (SAFE WAY)
      // ------------------------
      await recalculateInventoryQuantity(tx, batch.inventoryId);

      // ------------------------
      // 6. Update Product Price (SAFE RULE)
      // ------------------------
      const product = await tx.product.findUnique({
        where: { id: inventory.productId },
      });

      if (product) {
        const shouldUpdatePrice =
          payload.sellingPrice > product.sellingPrice;

        //  only update if business allows auto pricing
        if (shouldUpdatePrice) {
          await tx.product.update({
            where: { id: product.id },
            data: {
              sellingPrice: payload.sellingPrice,
            },
          });
        }


      }

      return batch;
    });
  } catch (error) {
    console.error("Create Product Batch Error:", error);
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
      updatedAt: true,
    },
  });
  return batch;
};
const getSingleProductBatchFromDB = async (id: string) => {
  const batch = await prisma.productBatch.findUnique({
    where: { id },
    select: {
      id: true,
      batchNumber: true,
      expiryDate: true,
      quantity: true,
      buyingPrice: true,
      isDeleted: true,
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
      updatedAt: true,
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
  payload: Partial<TCreateProductBatch>,
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
