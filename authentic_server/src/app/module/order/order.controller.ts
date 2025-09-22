import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { OrderServices } from './order.services';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { orderFilterableFields } from './order.constant';

const createOrderIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

const getAllOrderFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await OrderServices.getAllOrderFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getOrderByUserIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const filters = pick(req.query, orderFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OrderServices.getOrderByUserIdFromDB(
      id,
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleOrderFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully!',
    data: result,
  });
});
const deleteOrderFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.deleteOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders deleted successfully!',
    data: result,
  });
});
export const OrderController = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrderByUserIdFromDB,
  getSingleOrderFromDB,
  deleteOrderFromDB
};
