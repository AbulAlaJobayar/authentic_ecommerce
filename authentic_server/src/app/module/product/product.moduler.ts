import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ProductServices } from './productServices';
import { MulterFile } from '../../shared/imageUpload';

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
export const ProductController={
     createProductIntoDB
}
