/* eslint-disable @typescript-eslint/no-explicit-any */
import { imageUploader, MulterFile } from '../../shared/imageUpload';
import prisma from '../../shared/prisma';
import { TPaginationOption } from '../../interfaces/pagination';
import { TProduct, TProductFilterRequest } from './product.interface';
import { paginationHelpers } from '../../helper/paginationHelper';
import { productSearchableFields } from './product.constant';
import { logger } from '../../config/logger';
import { Status } from '../../../../generated/prisma';

const createProductIntoDB = async (payload: TProduct, file: MulterFile) => {
  try {
    const image = file
      ? await imageUploader.uploadImageToS3(file)
      : 'no image found';
    const productData = {
      sku: payload.product.sku,
      name: payload.product.name,
      description: payload.product.description,
      image: [image || 'no image found'],
      sellingPrice: payload.productBatch.sellingPrice,
      categoryId: payload.product.categoryId,
    };
    // Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create product
      const createProduct = await tx.product.create({ data: productData });
      const inventoryData = {
        productId: createProduct.id,
        alertQuantity: payload.inventory.alertQuantity, // low stock alert threshold
        quantity: payload.productBatch.quantity,
      };
      const createInventory = await tx.inventory.create({
        data: inventoryData,
      });
      const productBatchData = {
        inventoryId: createInventory.id,
        batchNumber: payload.productBatch.batchNumber,
        expiryDate: payload.productBatch.expiryDate,
        quantity: payload.productBatch.quantity,
        buyingPrice: payload.productBatch.buyingPrice,
        costPrice: payload.productBatch.costPrice,
        sellingPrice: payload.productBatch.sellingPrice,
        shelfCode: payload.productBatch.shelfCode,
        rackCode: payload.productBatch.rackCode,
        supplierId: payload.productBatch.supplierId,
        warehouseId: payload.productBatch.warehouseId,
      };
      await tx.productBatch.create({ data: productBatchData });
      return createProduct;
    });
    return result;
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
};

const getAllProductFromDB = async (
  filters: TProductFilterRequest,
  option: TPaginationOption
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
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
  andConditions.push({ isDeleted: false });
  andConditions.push({ status: Status.ACTIVE });
  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.product.findMany({
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
      name: true,
      image: true,
      sellingPrice: true,
    },
  });
  const total = await prisma.product.count({
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
const getSingleProductFromDB = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id, isDeleted: false, status: Status.ACTIVE },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      sku: true,
      sellingPrice: true,
      category: true,
      reviews: true,
    },
  });
  return result;
};

const updateProductFromDB = async (payload: string) => {
  console.log(payload);
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  updateProductFromDB,
  getSingleProductFromDB,
};
