// src/services/udpService.ts
import axios from 'axios';
import { UDP } from '../types/Types';

const api = axios.create({
  baseURL: 'https://localhost:7055/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUDPs = async (): Promise<UDP[]> => {
  try {
    const response = await api.get('/UDP');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error al obtener UDPs:", error);
    return [];
  }
};

export const addUDP = async (udp: UDP) => {
  return await api.post('/UDP', udp);
};

export const editUDP = async (id: number, udp: UDP) => {
  return await api.put(`/UDP/${id}`, udp);
};

export const deleteUDP = async (id: number) => {
  return await api.delete(`/UDP/${id}`);
};
