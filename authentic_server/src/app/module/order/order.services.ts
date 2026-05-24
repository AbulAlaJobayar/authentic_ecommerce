/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { prisma } from '../../shared/prisma';
import { Request } from 'express';
import { TCreateOrder, TOrderFilterRequest } from './order.interface';
import { generateOrderNumber } from '../../utils/orderNumber';
import { TPaginationOption } from '../../interfaces/pagination';
import { paginationHelpers } from '../../helper/paginationHelper';
import { orderSearchableFields } from './order.constant';

const createOrderIntoDB = async (req: Request) => {
  const userId = req.user.id;
  const payload: TCreateOrder = req.body;

  const user = await prisma.user.findFirst({
    where: { id: userId, isDeleted: false },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const order = await prisma.$transaction(async (tx) => {
    let subtotal = 0;

    const orderItemsData: any[] = [];

    for (const item of payload.items) {
      // 1. Get inventory
      const inventory = await tx.inventory.findFirst({
        where: {
          productId: item.productId,
          isDeleted: false,
        },
      });

      if (!inventory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Inventory not found');
      }

      // 2. Get batches FIFO (expiry first)
      const batches = await tx.productBatch.findMany({
        where: {
          inventoryId: inventory.id,
          isDeleted: false,
          remainingQuantity: { gt: 0 },
          expiryDate: { gt: new Date() },
        },
        orderBy: {
          expiryDate: 'asc',
        },
      });

      let remainingQty = item.quantity;

      for (const batch of batches) {
        if (remainingQty <= 0) break;

        const deduct = Math.min(batch.remainingQuantity, remainingQty);

        // 3. Update batch stock
        await tx.productBatch.update({
          where: { id: batch.id },
          data: {
            remainingQuantity: {
              decrement: deduct,
            },
          },
        });

        // 4. Push order item
        orderItemsData.push({
          productId: item.productId,
          batchId: batch.id,
          quantity: deduct,
          unitPrice: batch.sellingPrice,
          totalPrice: batch.sellingPrice * deduct,
        });

        subtotal += batch.sellingPrice * deduct;

        remainingQty -= deduct;

        // 5. Stock movement
        await tx.stockMovement.create({
          data: {
            inventoryId: inventory.id,
            batchId: batch.id,
            quantity: deduct,
            type: 'OUT',
            reason: 'ORDER',
          },
        });
      }

      if (remainingQty > 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
      }

      // 6. Sync inventory quantity
      const totalStock = await tx.productBatch.aggregate({
        where: { inventoryId: inventory.id },
        _sum: { remainingQuantity: true },
      });

      await tx.inventory.update({
        where: { id: inventory.id },
        data: {
          quantity: totalStock._sum.remainingQuantity || 0,
        },
      });
    }

    const discountAmount = 0;
    const total = subtotal - discountAmount + payload.shippingCost;

    const orderNumber = generateOrderNumber();

    const createdOrder = await tx.order.create({
      data: {
        userId,
        orderNumber,
        shippingCost: payload.shippingCost,
        total,
        orderItems: {
          create: orderItemsData,
        },
      },
    });

    await tx.shipment.create({
      data: {
        orderId: createdOrder.id,
        origin: payload.shipment.origin,
        destination: payload.shipment.destination,
        cost: payload.shippingCost,
      },
    });

    return createdOrder;
  });

  return order;
};
const getAllOrderFromDB = async (
  filters: TOrderFilterRequest,
  option: TPaginationOption,
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map((field) => ({
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
          equals: (filterData as Record<string, string | undefined>)[key],
        },
      })),
    });
  }
  andConditions.push({ isDeleted: false });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
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
      user: true,
      userId: true,
      orderNumber: true,
      shippingCost: true,
      total: true,
      payment: true,
      status: true,
      shipment: true,
      discount: true,
      discountId: true,
      orderItems: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.order.count({
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
const getOrderByUserIdFromDB = async (
  userId: string,
  filters: TOrderFilterRequest,
  option: TPaginationOption,
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map((field) => ({
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
          equals: (filterData as Record<string, string | undefined>)[key],
        },
      })),
    });
  }
  andConditions.push({
    isDeleted: false,
    userId: userId,
    payment: { isNot: null },
    shipment: { isNot: null },
  });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
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
      user: true,
      userId: true,
      orderNumber: true,
      shippingCost: true,
      total: true,
      payment: true,
      status: true,
      shipment: true,
      discount: true,
      discountId: true,
      orderItems: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.order.count({
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
const getSingleOrderFromDB = async (orderId: string) => {
  const result = await prisma.order.findFirst({
    where: {
      id: orderId,
      isDeleted: false,
      payment: { isNot: null },
      shipment: { isNot: null },
    },
  });
  return result;
};
const deleteOrderFromDB = async (id: string) => {
  const result = await prisma.order.update({
    where: { id },
    data: { isDeleted: true },
  });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrderByUserIdFromDB,
  getSingleOrderFromDB,
  deleteOrderFromDB,
};
