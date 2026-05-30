import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { prisma } from '../../shared/prisma';
import { TCreateDiscount, TUpdateDiscount } from './discount.validation';

const createDiscountIntoDB = async (payload: TCreateDiscount) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: {
          id: {
            in: payload.productIds || [],
          },
          isDeleted: false,
        },
      });
      if (!products || products.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, 'Products not found');
      }
      //Calculate Total Price
      const totalPrice = products.reduce(
        (sum, product) => sum + Number(product.sellingPrice),
        0,
      );
      // Discount Amount
      let discountAmount = 0;
      if (payload.percentage) {
        discountAmount = (totalPrice * payload.percentage) / 100;
      }
      // finalPrice
      const finalPrice = totalPrice - discountAmount;
      // create discount
      const createDiscount = await tx.discount.create({
        data: {
          name: payload.name,
          image: payload.image,
          code: payload.code,
          productIds: payload.productIds,
          percentage: payload.percentage,
          price: totalPrice,
          totalPrice: finalPrice,
          appliesTo: payload.appliesTo,
          startDate: payload.startDate,
          endDate: payload.endDate,
        },
      });
      return createDiscount;
    });
    return result;
  } catch (error) {
    return error;
  }
};
// get All Discount
const getAllDiscountFromDB = async () => {
  const discounts = await prisma.discount.findMany({
    where: {
      isDeleted: false,
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
    data: payload,
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
