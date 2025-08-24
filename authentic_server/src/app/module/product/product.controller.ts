import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ProductServices } from './product.services';
import { MulterFile } from '../../shared/imageUpload';
import { productFiltarableableFields } from './product.constant';
import pick from '../../shared/pick';

const createProductIntoDB = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;

  const result = await ProductServices.createProductIntoDB(
    req.body,
    file as MulterFile
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'product is Created successfully!',
    data: result,
  });
});
const getProductFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFiltarableableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ProductServices.getAllProductFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleProductFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductServices.getSingleProductFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'product Retrieved successfully!',
      data: result,
    });
  }
);
export const ProductController = {
  createProductIntoDB,
  getProductFromDB,
  getSingleProductFromDB,
};
