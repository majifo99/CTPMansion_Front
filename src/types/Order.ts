// src/types/Order.ts

export interface Product {
  id_Product?: number; // Opcional ya que el backend lo asignará automáticamente
  name: string;
}

export interface OrderDetail {
  product: Product;
  quantity: number;
  unitOfMeasure: string;
  received: boolean;
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
