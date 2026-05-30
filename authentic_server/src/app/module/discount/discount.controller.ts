import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import { Request, Response } from 'express';
import { DiscountServices } from './discount.services';
import sendResponse from '../../shared/sendResponse';

const createDiscountIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountServices.createDiscountIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Discount created successfully!',
    data: result,
  });
});

const getAllDiscountFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountServices.getAllDiscountFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount Retrieved successfully!',
    data: result,
  });
});
const getSingleDiscountFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DiscountServices.getSingleDiscountFromDB(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discount Retrieved successfully!',
      data: result,
    });
  },
);
const updateDiscountFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DiscountServices.updateDiscountFromDB(id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount updated successfully!',
    data: result,
  });
});
const deleteDiscountFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DiscountServices.deleteDiscountFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discount deleted successfully!',
    data: result,
  });
});
export const DiscountController = {
  createDiscountIntoDB,
  getAllDiscountFromDB,
  getSingleDiscountFromDB,
  updateDiscountFromDB,
  deleteDiscountFromDB,
};
