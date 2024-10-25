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

// Obtener todas las UDPs
export const getUDPs = async (): Promise<UDP[]> => {
  try {
    const response = await api.get('/UDP');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error al obtener UDPs:", error);
    return [];
  }
};

// Obtener una UDP por su ID
export const getUDPById = async (id: number): Promise<UDP | null> => {
  try {
    const response = await api.get(`/UDP/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener UDP con ID ${id}:`, error);
    return null;
  }
};

// PATCH: Actualizar el balance de una UDP
export const patchUDPBalance = async (id: number, newBalance: number): Promise<UDP> => {
  const patchData = [
    {
      "path": "/balance", 
      "op": "replace",     
      "value": newBalance   // El nuevo valor del balance
    }
  ];

  try {
    const response = await api.patch(`/UDP/${id}`, patchData, {
      headers: {
        'Content-Type': 'application/json-patch+json', // Asegurar que el contenido sea JSON Patch
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el balance de la UDP con ID ${id}:`, error);
    throw error;
  }
};

// Crear nueva UDP
export const addUDP = async (udp: UDP) => {
  return await api.post('/UDP', udp);
};

// Actualizar una UDP
export const editUDP = async (id: number, udp: UDP) => {
  return await api.put(`/UDP/${id}`, udp);
};

// Eliminar una UDP
export const deleteUDP = async (id: number) => {
  return await api.delete(`/UDP/${id}`);
};
