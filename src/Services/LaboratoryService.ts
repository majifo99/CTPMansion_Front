import axios from "axios";
import { Laboratory } from '../types/LaboratoryType';

const API_URL = 'https://localhost:7055/api'; // Asegúrate de cambiar a la URL correcta de la API

// Crear una instancia de axios con la URL base y encabezados predeterminados
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejo de respuestas
const handleResponse = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// Función para realizar el login y obtener el token JWT
export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await apiClient.post<{ token: string }>('/User/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// === Servicios relacionados a laboratorios ===

export const getLaboratories = (): Promise<Laboratory[]> => {
  return handleResponse<Laboratory[]>(`/Laboratory`);
};

export const getLaboratoryById = (id: number): Promise<Laboratory> => {
  return handleResponse<Laboratory>(`/Laboratory/${id}`);
};

export const addLaboratory = async (newLaboratory: Laboratory): Promise<Laboratory> => {
  try {
    const response = await apiClient.post<Laboratory>('/Laboratory', newLaboratory);
    return response.data;
  } catch (error) {
    console.error('Error adding laboratory:', error);
    throw error;
  }
};

export const updateLaboratory = async (id: number, updatedLaboratory: Laboratory): Promise<Laboratory> => {
  try {
    const response = await apiClient.put<Laboratory>(`/Laboratory/${id}`, updatedLaboratory);
    return response.data;
  } catch (error) {
    console.error('Error updating laboratory:', error);
    throw error;
  }
};

export const patchLaboratory = async (id: number, partialLaboratory: Partial<Laboratory>): Promise<Laboratory> => {
  try {
    const response = await apiClient.patch<Laboratory>(`/Laboratory/${id}`, partialLaboratory);
    return response.data;
  } catch (error) {
    console.error('Error patching laboratory:', error);
    throw error;
  }
};

export const deleteLaboratory = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/Laboratory/${id}`);
  } catch (error) {
    console.error('Error deleting laboratory:', error);
    throw error;
  }
};