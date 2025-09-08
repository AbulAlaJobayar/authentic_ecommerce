import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { CartServices } from './cart.services';
import sendResponse from '../../shared/sendResponse';

const createCartIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await CartServices.createCartIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Cart Created successfully!',
    data: result,
  });
});

const getMyCartFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await CartServices.getMyCartFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart fetched successfully!',
    data: result,
  });
});
const updateMyCartFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const result = await CartServices.updateMyCartFromDB(id, userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully!',
    data: result,
  });
});
const deleteCartFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id}=req.params;
  const {id:userId}=req.user;
 const result = await CartServices.deleteMyCartFromDB(id,userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart Deleted successfully!',
    data: result,
  });
});
export const CartController = {
  createCartIntoDB,
  getMyCartFromDB,
  updateMyCartFromDB,
  deleteCartFromDB,
};
