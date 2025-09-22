type Items = {
  productId: string;
  quantity: number;
};
type Payment = {
  method: string;
  transactionId: string;
  paymentStatus: string;
  amount: number;
};

export type TCreateOrder = {
  items: Items[];
  shippingCost: number;
  discountId?: string;
  payment: Payment;
};
export type TOrderFilterRequest = {
  searchTerm?: string | undefined;
  orderNumber?: string | undefined;
  status?: string | undefined;
};