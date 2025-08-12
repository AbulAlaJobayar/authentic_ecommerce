import { PrismaClient } from '@prisma/client';
import { imageUploader, MulterFile } from '../../shared/imageUpload';
import prisma from '../../shared/prisma';
import { TProduct } from './productValidation';

const createProductIntoDB = async (payload: TProduct, file: MulterFile) => {
  let image = '';
  if (file) {
    image = await imageUploader.uploadImageToS3(file);
  }

  const productData = {
    sku: payload.body.sku,
    name: payload.body.name,
    description: payload.body.description,
    image: image || 'no image found',
    sellingPrice: payload.body.sellingPrice,
    categoryId: payload.body.categoryId,
    inventoryId: payload.body.inventoryId,
  };
  // transaction Apply

  //TODO: fix transaction type any
  const result = await prisma.$transaction(
    async (
      transactionClient: Omit<
        PrismaClient,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
      >
    ) => {
      // create product
      const createProduct = await transactionClient.product.create({
        data: productData,
      });
      // create Inventory
      const inventoryData = {
        productId: createProduct.id,
        alertQuantity: payload.body.alertQuantity, // low stock alert threshold
      };
      const createInventory = await transactionClient.inventory.create({
        data: inventoryData,
      });

      const productBatchData = {
        inventoryId: createInventory.id,
        supplierId: payload.body.supplierId,
        warehouseId: payload.body.warehouseId,
        batchNumber: payload.body.batchNumber,
        expiryDate: payload.body.expiryDate,
        quantity: payload.body.quantity,
        buyingPrice: payload.body.buyingPrice,
        costPrice: payload.body.costPrice,
        sellingPrice: payload.body.sellingPrice,
        shelfCode: payload.body.shelfCode,
        rackCode: payload.body.rackCode,
      };

      const productBatch = await transactionClient.productBatch.create({
        data: productBatchData,
      });
      // update Inventory quantity
      await transactionClient.inventory.update({
        where: { id: createInventory.id },
        data: { quantity: productBatch.quantity },
      });
      return createProduct;
    }
  );

  return result;
};

//TODO: create pagination and filtering
const getAllProductFromDB = async () => {
  const result = await prisma.product.find();
  return result;
};

const updateProductFromDB = async (payload:string) => {
  console.log(payload)
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  updateProductFromDB,
};
