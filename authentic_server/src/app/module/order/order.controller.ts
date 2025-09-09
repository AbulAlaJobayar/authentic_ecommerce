import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { OrderServices } from './order.services';
import sendResponse from '../../shared/sendResponse';

const createOrderIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});
 export const OrderController={
    createOrderIntoDB
 }