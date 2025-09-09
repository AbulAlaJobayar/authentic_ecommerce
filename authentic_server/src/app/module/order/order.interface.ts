type Items = {
  productId: string;
  quantity: number;
};

export type TCreateOrder = {
  items: Items[];
  shippingCost: number;
  discountId?: string;
};
