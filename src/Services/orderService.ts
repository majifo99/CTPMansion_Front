// src/Services/orderService.ts
import axios from 'axios';
import { Order, RequestStatus } from '../types/OrderTypes';

const apiUrl = 'https://localhost:7055/api/Order';

// Helper function to retrieve the JWT token from localStorage
const getToken = () => localStorage.getItem('token');

// Fetch orders by status (e.g., Pending, Approved, Rejected)
export const getOrdersByStatus = async (status: RequestStatus | null): Promise<Order[]> => {
  const token = getToken();
  
  // If status is null, don't filter by status and fetch all orders
  const url = status !== null 
    ? `${apiUrl}/orders-by-status?status=${status}` 
    : `${apiUrl}/orders`;  // Endpoint for all orders (or modify as needed)

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,  // Add the token to the request
    },
  });
  return response.data;
};

// Approve an order
export const approveOrder = async (id: number): Promise<void> => {
  const token = getToken();
  await axios.patch(`${apiUrl}/${id}/approve`, null, {
    headers: {
      Authorization: `Bearer ${token}`,  // Add the token to the request
    },
  });
};

// Reject an order
export const rejectOrder = async (id: number): Promise<void> => {
  const token = getToken();
  await axios.patch(`${apiUrl}/${id}/reject`, null, {
    headers: {
      Authorization: `Bearer ${token}`,  // Add the token to the request
    },
  });
};