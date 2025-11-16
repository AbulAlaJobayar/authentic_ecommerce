import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import { TCart } from './cart.interface';
// import { errorLogger } from '../../config/logger';

const createCartIntoDB = async (userId: string, payload: TCart) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const isProductExist = await tx.product.findFirst({
        where: { id: payload.productId, isDeleted: false },
      });
      if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found');
      }

      const total = payload.quantity * isProductExist.sellingPrice;
      const cartItem = await tx.cartItem.create({
        data: {
          productId: isProductExist.id,
          quantity: payload.quantity,
          total,
          userId,
        },
        select: {
          id: true,
          quantity: true,
          total: true,
          product: {
            select: {
              name: true,
              sellingPrice: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
      });
      return cartItem;
    });
    return result;
  } catch (error) {
    console.log(error)
   // errorLogger.error('Failed to create cart item', error);
  }
};

const getSingleCartFromDB = async (id: string, userId: string) => {
  const result = await prisma.cartItem.findFirst({
    where: { id, userId, isDeleted: false },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart item not found');
  }
  return result;
};
const getMyCartFromDB = async (id: string) => {
  const result = await prisma.cartItem.findMany({
    where: { userId: id, isDeleted: false },
  });
  return result;
};
const updateMyCartFromDB = async (
  id: string,
  userId: string,
  payload: { quantity: number }
) => {
  if (payload.quantity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Quantity must be greater than 0'
    );
  }
  // Verify cart item exists, is not deleted, and belongs to the user
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id,
      userId,
      isDeleted: false,
    },
    select: {
      id: true,
      userId: true,
      productId: true,
      total: true,
      quantity: true,
      product: {
        select: {
          sellingPrice: true,
        },
      },
    },
  });

  if (!cartItem) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Cart item not found or does not belong to user'
    );
  }
  // Update cart item
  let total = cartItem.total;
  if (payload.quantity && payload.quantity > 0) {
    total = payload.quantity * cartItem.product.sellingPrice;
  }

  const updateCart = {
    quantity: payload.quantity,
    total,
  };

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: {
      ...updateCart,
      updatedAt: new Date(),
    },
    select: {
      id: true,
      productId: true,
      quantity: true,
      total: true,
      updatedAt: true,
    },
  });
  return updatedCartItem;
};

const deleteMyCartFromDB = async (id: string, userId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const cartItem = await tx.cartItem.findUnique({
      where: { id, userId },
    });
    if (!cartItem) {
      throw new AppError(httpStatus.NOT_FOUND, 'Cart item not found');
    }
    if (cartItem.isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'Cart item is already deleted');
    }
    await tx.cartItem.update({
      where: { id: cartItem.id },
      data: { isDeleted: true },
    });
    return null;
  });
  return result;
};

export const CartServices = {
  createCartIntoDB,
  getSingleCartFromDB,
  getMyCartFromDB,
  updateMyCartFromDB,
  deleteMyCartFromDB,
};
