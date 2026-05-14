import { categoryFilterableFields } from './category.constant';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { CategoryServices } from './category.services';
import pick from '../../shared/pick';

const createCategoryIntoDB = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category Created successfully!',
    data: result,
  });
});
const getCategoryFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, categoryFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CategoryServices.getAllCategoryFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Retrieved successfully!',
    data: result,
  });
});
const getSingleFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingleCategory(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Retrieved successfully!',
    data: result,
  });
});
const updateCategoryFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.updateCategoryFromDB(
    id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated successfully!',
    data: result,
  });
});
const deleteCategoryFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id as string);
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
  getSingleFromDB,
  updateCategoryFromDB,
  deleteCategoryFromDB,
};
