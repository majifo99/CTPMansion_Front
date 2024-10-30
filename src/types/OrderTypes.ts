// src/types/OrderTypes.ts
export enum RequestStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
  }
  
  export interface Product {
    id_Product: number;
    name: string;
  }


  export interface NewOrder {
    orderDate: string;
    userId: number;
    requesterArea: string;
    orderDetails: OrderDetail[];
    receiver: string;
    comments: string;
  }
  
  export interface OrderDetail {
    orderDetailId: number;
    product: Product;
    quantity: number;
    unitOfMeasure: string;
    received: boolean | null;  // Optional field to mark if the product is received
  }
  
  export interface Order {
    orderId: number;
    orderDate: string;
    userId: number;
    requesterArea: string;
    receiver: string;
    comments: string | null;
    status: RequestStatus;
    orderDetails: OrderDetail[];
  }
  