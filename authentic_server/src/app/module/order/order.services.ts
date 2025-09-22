import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import { Request } from 'express';
import { TCreateOrder, TOrderFilterRequest } from './order.interface';
import { generateOrderNumber } from '../../utils/orderNumber';
import { TPaginationOption } from '../../interfaces/pagination';
import { paginationHelpers } from '../../helper/paginationHelper';
import { orderSearchableFields } from './order.constant';

const createOrderIntoDB = async (req: Request) => {
  const userId = req.user.id;
  const payload: TCreateOrder = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const order = await prisma.$transaction(async (tx) => {
      // Fetch products
      const products = await tx.product.findMany({
        where: {
          id: { in: payload.items.map((i) => i.productId) },
          isDeleted: false,
        },
      });

      if (products.length !== payload.items.length) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'One or more products not found'
        );
      }

      // Calculate subtotal and prepare order items
      let subtotal = 0;
      const orderItemsData = payload.items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        const totalPrice = product.sellingPrice * item.quantity;
        subtotal += totalPrice;
        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.sellingPrice,
          totalPrice,
        };
      });

      // Calculate discount if applicable
      let discountAmount = 0;
      if (payload.discountId) {
        const now = new Date();
        const discount = await tx.discount.findFirst({
          where: {
            id: payload.discountId,
            active: true,
            isDeleted: false,
            startDate: { lte: now },
            endDate: { gte: now },
          },
        });

        if (discount) {
          // Filter items that the discount applies to
          const applicableItems = orderItemsData.filter((item) =>
            discount.ProductIds.includes(item.productId)
          );

          const applicableSubtotal = applicableItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );

          discountAmount = (applicableSubtotal * discount.percentage) / 100;

          if (discount.maxAmount && discountAmount > discount.maxAmount) {
            discountAmount = discount.maxAmount;
          }
        }
      }

      const total = subtotal - discountAmount + payload.shippingCost;
      const orderNumber = generateOrderNumber();

      // Create order
      const createdOrder = await tx.order.create({
        data: {
          userId,
          orderNumber,
          shippingCost: payload.shippingCost,
          total,
          discountId: payload.discountId,
          orderItems: {
            create: orderItemsData,
          },
        },
      });
      // create shipment
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
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getAllOrderFromDB = async (
  filters: TOrderFilterRequest,
  option: TPaginationOption
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
  option: TPaginationOption
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
