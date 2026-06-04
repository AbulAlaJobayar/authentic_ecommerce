import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { prisma } from '../../shared/prisma';
import { TCreateDiscount, TUpdateDiscount } from './discount.validation';

const createDiscountIntoDB = async (payload: TCreateDiscount) => {
  const result = await prisma.$transaction(async (tx) => {
    const isExistCode = await tx.discount.findUnique({
      where: {
        code: payload.code,
      },
    });
    if (isExistCode) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Discount with this code already exists',
      );
    }
    // validate productIds
    const productIds = payload.productIds || [];
    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    // console.log(products,)
console.log(products,"from db")
console.log(productIds,"productIds from payload")
    if (products.length !== productIds.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Some products not found or deleted',
      );
    }

    // create Discount
    const discount = await tx.discount.create({
      data: {
        name: payload.name,
        image: payload.image[0],
        code: payload.code,
        percentage: payload.percentage || 0,
        maxAmount: payload.maxAmount,
        active: payload.active ?? true,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
      },
    });

    // update products with discountId
    await tx.product.updateMany({
      where: {
        id: {
          in: productIds,
        },
      },
      data: {
        discountId: discount.id,
      },
    });
    return discount;
  });
  return result;
};
// get All Discount
const getAllDiscountFromDB = async () => {
  const discounts = await prisma.discount.findMany({
    where: {
      active: true,
      endDate: {
        gte: new Date(),
      },
    },
  });
  return discounts;
};
//get Single Discount
const getSingleDiscountFromDB = async (id: string) => {
  const result = await prisma.discount.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
//update discount
const updateDiscountFromDB = async (id: string, payload: TUpdateDiscount) => {
  await prisma.discount.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.discount.update({
    where: {
      id,
    },
    data:{payload},
  });
  return result;
};
const deleteDiscountFromDB = async (id: string) => {
  const result = await prisma.discount.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      active: false,
    },
  });
  return result;
};

export const DiscountServices = {
  createDiscountIntoDB,
  getAllDiscountFromDB,
  getSingleDiscountFromDB,
  updateDiscountFromDB,
  deleteDiscountFromDB,
};
