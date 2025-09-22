type Items = {
  productId: string;
  quantity: number;
};

type TShipment = {
  origin: string;
  destination: string;
};

export type TCreateOrder = {
  items: Items[];
  shippingCost: number;
  discountId?: string;
  shipment: TShipment;
};
export type TOrderFilterRequest = {
  searchTerm?: string | undefined;
  orderNumber?: string | undefined;
  status?: string | undefined;
};
