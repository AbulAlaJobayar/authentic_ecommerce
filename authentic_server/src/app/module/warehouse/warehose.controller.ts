import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { WarehouseServices } from './warehouse.services';
import sendResponse from '../../shared/sendResponse';

const createWarehouseIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await WarehouseServices.createWarehouseIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Warehouse Created successfully!',
      data: result,
    });
  }
);

const getWarehouseIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await WarehouseServices.getAllWarehouseFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Warehouse Retrieved successfully!',
    data: result,
  });
});
const updateWarehouseIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WarehouseServices.updateWarehouseFromDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warehouse Updated successfully!',
      data: result,
    });
  }
);
const deleteWarehouseIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WarehouseServices.deleteWarehouseFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Warehouse Deleted successfully!',
      data: result,
    });
  }
);

export const WarehouseController = {
  createWarehouseIntoDB,
  getWarehouseIntoDB,
  updateWarehouseIntoDB,
  deleteWarehouseIntoDB,
};
