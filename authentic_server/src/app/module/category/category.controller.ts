import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { CategoryServices } from './category.services';

const createCategoryIntoDB = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category Created successfully!',
    data: result,
  });
});
const getCategoryFromDB = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Retrieved successfully!',
    data: result,
  });
});
const updateCategoryFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategoryFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated successfully!',
    data: result,
  });
});
const deleteCategoryFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted successfully!',
    data: result,
  });
});

export const CategoryController = {
  createCategoryIntoDB,
  getCategoryFromDB,
  updateCategoryFromDB,
  deleteCategoryFromDB,
};
