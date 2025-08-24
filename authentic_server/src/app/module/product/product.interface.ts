export type TProductFilterRequest = {
  searchTerm?: string | undefined;
  sku?: string | undefined;
  name?: string | undefined;
  status?: string | undefined;
  category?: string | undefined;
};

export type TProduct = {
  product: {
    name: string;
    sku: string;
    description: string;
    categoryId: string;
  };
  inventory: {
    alertQuantity: number;
  };
  productBatch: {
    batchNumber: string;
    expiryDate: string;
    quantity: number;
    buyingPrice: number;
    costPrice: number;
    sellingPrice: number;
    shelfCode: string;
    rackCode: string;
    supplierId: string;
    warehouseId: string;
  };
};
