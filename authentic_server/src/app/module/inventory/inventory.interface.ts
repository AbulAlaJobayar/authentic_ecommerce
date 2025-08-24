import { Status } from "../../../../generated/prisma";
export type TInventoryFilterRequest = {
  searchTerm?: string | undefined;
  sku?: string | undefined;
  name?: string | undefined;
  status?: string | undefined;
  category?: string | undefined;
  isDeleted?: boolean | undefined;
};


export type TUpdateProductRequest = {
  product?: {
    name?: string;
    sku?: string;
    description?: string;
    status?: Status;
  };
  inventory?: {
    alertQuantity?: number;
  };
};
