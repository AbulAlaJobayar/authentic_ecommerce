import  httpStatus  from 'http-status';
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import { productFiltarableableFields } from "./inventory.constant";
import { InventoryServices } from "./inventory.services";
import sendResponse from "../../shared/sendResponse";


const getProductFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFiltarableableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await InventoryServices.getAllInventoryFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});
export const InventoryController={
    getProductFromDB
}