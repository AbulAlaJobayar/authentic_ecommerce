import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';
import { Request } from 'express';
import { TCreateOrder } from './order.interface';
import { generateOrderNumber } from '../../utils/orderNumber';

const createOrderIntoDB = async (req: Request) => {
  const userId = req.user.id;
  const payload: TCreateOrder = req.body;
  try {
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
        include: {
          orderItems: true,
        },
      });

      return createdOrder;
    });
    return order;
  } catch (error) {
    console.log(error);
    throw error
  }
};

export const OrderServices = {
  createOrderIntoDB,
};
