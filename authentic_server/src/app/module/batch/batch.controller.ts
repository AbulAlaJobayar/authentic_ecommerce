import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { ProductBatchService } from './batch.services';
import sendResponse from '../../shared/sendResponse';

const createProductBatchIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductBatchService.createProductBatchIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'product Batch Created successfully!',
      data: result,
    });
  }
);
const getAllProductBatchFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductBatchService.getAllProductBatchFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product Batch Retrieved successfully!',
      data: result,
    });
  }
);
const getSingleProductBatchFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductBatchService.getSingleProductBatchFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product Batch Retrieved successfully!',
      data: result,
    });
  }
);
const updateProductBatchFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductBatchService.updateProductBatchFromDB(
      id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product Batch Updated successfully!',
      data: result,
    });
  }
);
const deleteProductBatchFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductBatchService.deleteProductBatchFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product Batch deleted successfully!',
      data: result,
    });
  }
);
export const ProductBatchController = {
  createProductBatchIntoDB,
  getAllProductBatchFromDB,
  getSingleProductBatchFromDB,
  updateProductBatchFromDB,
  deleteProductBatchFromDB,
};
