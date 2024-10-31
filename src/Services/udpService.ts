// src/Services/udpService.ts
import axios from 'axios';
import Cookies from 'js-cookie'; // Importar js-cookie para manejar las cookies
import { UDP } from '../types/Types';

const api = axios.create({
  baseURL: 'https://ctplamansion.onrender.com/api',
});

// Interceptor para agregar el token JWT a cada solicitud
api.interceptors.request.use(config => {
  const token = Cookies.get('token'); // Obtener el token desde las cookies
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

// Actualizar el balance de una UDP (PATCH)
export const patchUDPBalance = async (id: number, newBalance: number): Promise<UDP> => {
  const patchData = [
    {
      "path": "/balance", 
      "op": "replace",     
      "value": newBalance   
    }
  ];

  try {
    const response = await api.patch(`/UDP/${id}`, patchData, {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el balance de la UDP con ID ${id}:`, error);
    throw error;
  }
};

// Crear nueva UDP
export const addUDP = async (udp: Omit<UDP, 'id_UDP'>): Promise<UDP> => {
  try {
    const response = await api.post('/UDP', udp);
    return response.data;
  } catch (error) {
    console.error("Error al agregar UDP:", error);
    throw error;
  }
};

// Actualizar una UDP (PUT)
export const editUDP = async (id: number, udp: UDP): Promise<UDP> => {
  try {
    const response = await api.put(`/UDP/${id}`, udp);
    return response.data;
  } catch (error) {
    console.error("Error al editar UDP:", error);
    throw error;
  }
};

// Eliminar una UDP
export const deleteUDP = async (id: number): Promise<void> => {
  try {
    await api.delete(`/UDP/${id}`);
  } catch (error) {
    console.error("Error al eliminar UDP:", error);
    throw error;
  }
};
