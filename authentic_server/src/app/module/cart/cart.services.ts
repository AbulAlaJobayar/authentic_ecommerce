import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import { TCart } from './cart.interface';
import { errorLogger } from '../../config/logger';

const createCartIntoDB = async (userId: string, payload: TCart) => {
  const createCart = await prisma.cartItem.create({
    data: { ...payload, userId },
    select: {
      id: true,
      quantity: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      productId: true,
    },
  });
  return createCart;
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
  quantity: number
) => {
  if (quantity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Quantity must be greater than 0'
    );
  }
  try {
    // Update cart item within a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Verify cart item exists, is not deleted, and belongs to the user
      const cartItem = await tx.cartItem.findUnique({
        where: {
          id,
          userId,
          isDeleted: false,
        },
        select: {
          id: true,
          userId: true,
          productId: true,
          quantity: true,
        },
      });

      if (!cartItem) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Cart item not found or does not belong to user'
        );
      }

      // Update cart item
      const updatedCartItem = await tx.cartItem.update({
        where: { id: cartItem.id },
        data: {
          quantity,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          productId: true,
          quantity: true,
          updatedAt: true,
        },
      });

      return updatedCartItem;
    });
    return result;
  } catch (error) {
    errorLogger.error('Failed to update cart item', error);
  }
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
  getMyCartFromDB,
  updateMyCartFromDB,
  deleteMyCartFromDB,
};
