import axios from 'axios';
import Cookies from 'js-cookie';
import { LabRequest } from '../types/LaboratoryRequestType';
import { RoomRequest } from '../types/RoomRequestType';
import { Order } from '../types/OrderTypes';

const API_URL = 'https://ctplamansion.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enviar cookies con las solicitudes
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchUserLabRequests = async (userId: number): Promise<LabRequest[]> => {
  const response = await apiClient.get(`/LaboratoryRequest/user/${userId}`);
  return response.data;
};

export const fetchUserRoomRequests = async (userId: number): Promise<RoomRequest[]> => {
  const response = await apiClient.get(`/RoomRequest/user/${userId}`);
  return response.data;
};

export const fetchUserOrders = async (userId: number): Promise<Order[]> => {
  const response = await apiClient.get(`/Order/user/${userId}`);
  return response.data;
};