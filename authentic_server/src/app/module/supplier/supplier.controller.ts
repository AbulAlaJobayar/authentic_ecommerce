/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { SupplierServices } from './supplier.services';
import pick from '../../shared/pick';
import { supplierFiltarableableFields } from './supplier.constant';

const createUserIntoDB = catchAsync(async (req, res) => {
  const result = await SupplierServices.createSupplierIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Supplier created successfully!',
    data: result,
  });
});
const getAllSupplierFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, supplierFiltarableableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SupplierServices.getAllSupplierFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier Retrieved successfully!',
    data: result,
  });
});
const getSingleSupplierFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SupplierServices.getSingleSupplierFromDB(id as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier Retrieved successfully!',
    data: result,
  });
});

const updateSupplierFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SupplierServices.updateSupplierFromDB(id as any, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier Updated successfully!',
    data: result,
  });
});
const deleteSupplierFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SupplierServices.deleteSupplierFromDB(id as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier Deleted successfully!',
    data: result,
  });
});
export const SupplierController = {
  createUserIntoDB,
  getAllSupplierFromDB,
  getSingleSupplierFromDB,
  updateSupplierFromDB,
  deleteSupplierFromDB,
};
