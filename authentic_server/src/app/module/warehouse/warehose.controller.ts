import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { WarehouseServices } from './warehouse.services';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { warehouseFilterableFields } from './warehouse.const';

const createWarehouseIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await WarehouseServices.createWarehouseIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Warehouse Created successfully!',
      data: result,
    });
  },
);

const getWarehouseFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, warehouseFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await WarehouseServices.getAllWarehouseFromDB(
    filters,
    options,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Warehouse Retrieved successfully!',
    data: result,
  });
});
const getSingleWarehouseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WarehouseServices.getSingleWarehouse(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warehouse Retrieved successfully!',
      data: result,
    });
  },
);

const updateWarehouseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WarehouseServices.updateWarehouseFromDB(id as string, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warehouse Updated successfully!',
      data: result,
    });
  },
);
const deleteWarehouseFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WarehouseServices.deleteWarehouseFromDB(id as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warehouse Deleted successfully!',
      data: result,
    });
  },
);

export const WarehouseController = {
  createWarehouseIntoDB,
  getWarehouseFromDB,
  getSingleWarehouseFromDB,
  updateWarehouseFromDB,
  deleteWarehouseFromDB,
};
