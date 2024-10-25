// src/types/Order.ts

export interface Product {
  id_Product: number;
  name: string;
}

export interface OrderDetail {
  id: number;
  orderDetailId: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  unitOfMeasure: string;
  received: boolean | null;
}

export interface Order {
  orderDate: string;
  userId: number;
  requesterArea: string;
  orderDetails: OrderDetail[];
  receiver: string;
  comments: string;
}

export interface ApprovedOrder extends Order {
  approvedDate: string;
}

export interface OrderStatus {
  status: number;
  orderId: number;
}
