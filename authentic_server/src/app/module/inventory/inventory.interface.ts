export type TInventoryFilterRequest = {
  searchTerm?: string | undefined;
  sku?: string | undefined;
  name?: string | undefined;
  status?: string | undefined;
  category?: string | undefined;
  isDeleted?: boolean | undefined;
};
