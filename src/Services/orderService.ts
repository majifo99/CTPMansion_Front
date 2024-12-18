// src/Services/orderService.ts
import axios from 'axios';
import Cookies from 'js-cookie'; // Importar js-cookie para manejar las cookies
import { Order, RequestStatus } from '../types/OrderTypes';

const apiUrl = 'https://ctplamansion.onrender.com/api/Order';

// Helper function para obtener el JWT token desde cookies
const getToken = () => Cookies.get('token');

// Instancia de axios con configuración de URL base y autenticación
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token a cada solicitud
api.interceptors.request.use((config) => {
  const token = getToken(); // Obtener el token desde las cookies
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Función para crear una orden
export const createOrder = async (order: Order): Promise<Order> => {
  const response = await api.post('/', order);
  return response.data;
};

// Función para obtener órdenes por estado (ej. Pending, Approved, Rejected)
export const getOrdersByStatus = async (status: RequestStatus | null): Promise<Order[]> => {
  const url = status !== null 
    ? `/orders-by-status?status=${status}` 
    : '/orders'; // Endpoint para todas las órdenes

  const response = await api.get(url);
  return response.data;
};

// Aprobar una orden
export const approveOrder = async (id: number): Promise<void> => {
  await api.patch(`/${id}/approve`);
};

// Rechazar una orden
export const rejectOrder = async (id: number): Promise<void> => {
  await api.patch(`/${id}/reject`);
};
