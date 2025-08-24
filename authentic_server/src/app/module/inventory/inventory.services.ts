/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../helper/paginationHelper';
import { TPaginationOption } from '../../interfaces/pagination';
import prisma from '../../shared/prisma';
import { productSearchableFields } from './inventory.constant';
import { TInventoryFilterRequest } from './inventory.interface';

const getAllInventoryFromDB = async (
  filters: TInventoryFilterRequest,
  option: TPaginationOption
) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(option);

  const andConditions: any[] = [];

  // ✅ Search logic
  if (searchTerm) {
    andConditions.push({
      OR: [
        // Example: search inventory `id`
        { id: { contains: searchTerm, mode: 'insensitive' } },
        // Search inside product fields
        {
          product: {
            OR: productSearchableFields.map((field) => ({
              [field]: { contains: searchTerm, mode: 'insensitive' },
            })),
          },
        },
      ],
    });
  }

  // ✅ Filters logic
  const inventoryFilters: any = {};
  const productFilters: any = {};

  Object.keys(filterData).forEach((key) => {
    const value = filterData[key as keyof typeof filterData];
    if (value === undefined || value === null || value === '') return; // skip invalid filters

    if (['name', 'category', 'status', 'sku'].includes(key)) {
      productFilters[key] = value;
    } else if (key === 'isDeletedInventory') {
      inventoryFilters['isDeleted'] = value;
    } else if (key === 'isDeletedProduct') {
      productFilters['isDeleted'] = value;
    } else {
      inventoryFilters[key] = value;
    }
  });

  if (Object.keys(inventoryFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(inventoryFilters).map(([key, value]) => ({
        [key]: { equals: value },
      })),
    });
  }

  if (Object.keys(productFilters).length > 0) {
    andConditions.push({
      AND: Object.entries(productFilters).map(([key, value]) => ({
        product: { [key]: { equals: value } },
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.inventory.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? sortBy.startsWith('product.')
          ? { product: { [sortBy.replace('product.', '')]: sortOrder } }
          : { [sortBy]: sortOrder }
        : { createdAt: 'desc' },
    select: {
      product: {
        select: {
          id: true,
          sku: true,
          name: true,
          description: true,
          image: true,
          status: true,
          sellingPrice: true,
          category: true,
          isDeleted: true,
          createdAt: true,
          updatedAt: true,
        },
      },

      quantity: true,
      alertQuantity: true,
      isDeleted: true,
      createdAt: true,
      updatedAt: true,

      productBatch: {
        select: {
          id: true,
          batchNumber: true,
          expiryDate: true,
          quantity: true,
          isDeleted: true,
          buyingPrice: true,
          costPrice: true,
          sellingPrice: true,
          shelfCode: true,
          rackCode: true,
          supplier: true,
          warehouse: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  const total = await prisma.inventory.count({ where: whereConditions });

  return {
    meta: { total, page, limit },
    data: result,
  };
};
export const InventoryServices = {
  getAllInventoryFromDB,
};
