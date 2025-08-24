import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import pick from '../../shared/pick';
import { productFiltarableableFields } from './inventory.constant';
import { InventoryServices } from './inventory.services';
import sendResponse from '../../shared/sendResponse';

const getAllInventoryFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, productFiltarableableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await InventoryServices.getAllInventoryFromDB(
      filters,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Inventory Retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleInventoryFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InventoryServices.getSingleInventoryFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Inventory Retrieved successfully!',
      data: result,
    });
  }
);
const updateInventoryFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InventoryServices.updateInventoryFromDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Inventory updated successfully!',
      data: result,
    });
  }
);
const deleteInventoryFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await InventoryServices.deleteInventoryFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Inventory deleted successfully!',
      data: result,
    });
  }
);
export const InventoryController = {
  getAllInventoryFromDB,
  getSingleInventoryFromDB,
  updateInventoryFromDB,
  deleteInventoryFromDB
};
