// src/services/orderService.ts

import axios from 'axios';
import { Order, ApprovedOrder, OrderStatus } from '../types/Order';

// Configuración de Axios
const api = axios.create({
  baseURL: 'https://localhost:7055/api',
});

// Interceptor para incluir el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Función para crear una orden
export const createOrder = async (order: Order): Promise<Order> => {
  // Envía el objeto directamente sin "orderDto"
  const response = await api.post('/Order', order, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

// Función para obtener una orden por ID
export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get(`/Order/${id}`);
  return response.data;
};

// Función para obtener órdenes aprobadas
export const getApprovedOrders = async (): Promise<ApprovedOrder[]> => {
  const response = await api.get('/Order/approved-orders');
  return response.data;
};

// Función para obtener órdenes por estado
export const getOrdersByStatus = async (status: number): Promise<OrderStatus[]> => {
  const response = await api.get(`/Order/orders-by-status?status=${status}`);
  return response.data;
};

// Función para aprobar una orden
export const approveOrder = async (id: number): Promise<void> => {
  await api.patch(`/Order/${id}/approve`);
};

// Función para rechazar una orden
export const rejectOrder = async (id: number): Promise<void> => {
  await api.patch(`/Order/${id}/reject`);
};

// Función para obtener órdenes por UDP
export const getOrdersByUDP = async (udpId: number): Promise<Order[]> => {
  const response = await api.get(`/Order/udp/${udpId}`);
  return response.data;
};

// Función para obtener órdenes por usuario
export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const response = await api.get(`/Order/user/${userId}`);
  return response.data;
};

// Función para obtener órdenes por producto
export const getOrdersByProductName = async (name: string): Promise<Order[]> => {
  const response = await api.get(`/Order/product/${name}`);
  return response.data;
};
