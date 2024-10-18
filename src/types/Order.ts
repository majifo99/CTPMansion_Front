// types/Order.ts

export interface OrderDetail {
  id: number;
  orderDetailId: number;
  orderId: number;
  productId: number;
  product:  | null; // Aquí usas el tipo Product en lugar de any
  quantity: number;
  unitOfMeasure: string;
  received: boolean | null;
}

export interface Order {
  id: number;
  orderId: number;
  orderDate: string;
  userId: number;
  requester: string | null;
  receiver: string;
  comments: string;
  status: number; // Puede ser 0: pendiente, 1: aprobado, -1: rechazado, etc.
  orderDetails: OrderDetail[]; // Detalles de la orden
  udpId: number;
  udp: null; // Aquí usas el tipo UDP en lugar de any
  isSentToDirector: boolean;
  approvalDate: string | null;
}