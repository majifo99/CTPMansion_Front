import axios from 'axios';
import Cookies from 'js-cookie';

// URL base para tu API
const BASE_URL = 'https://ctplamansion.onrender.com/api';

// Crear una instancia de Axios con el token de autorización incluido
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a cada solicitud
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token'); // Obtener el token desde las cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener la lista de usuarios
export const getUsers = async (): Promise<any> => {
  try {
    const response = await apiClient.get('/User');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Obtener roles de un usuario
export const getUserRoles = async (userId: number): Promise<any> => {
  try {
    const response = await apiClient.get(`/UserRole/${userId}/roles`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener roles para el usuario ${userId}:`, error);
    throw error;
  }
};

// Agregar rol a un usuario
export const addUserRole = async (userId: number, roleId: number): Promise<void> => {
  try {
    await apiClient.post('/UserRole/add', null, {
      params: {
        userId,
        roleId,
      },
    });
  } catch (error) {
    console.error(`Error al agregar rol ${roleId} al usuario ${userId}:`, error);
    throw error;
  }
};

// Quitar rol a un usuario
export const removeUserRole = async (userId: number, roleId: number): Promise<void> => {
  try {
    await apiClient.post('/UserRole/remove', null, {
      params: {
        userId,
        roleId,
      },
    });
  } catch (error) {
    console.error(`Error al quitar rol ${roleId} del usuario ${userId}:`, error);
    throw error;
  }
};

// Obtener datos del usuario por ID
export const getUserById = async (userId: number): Promise<any> => {
  try {
    const response = await apiClient.get(`/User/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los datos del usuario ${userId}:`, error);
    throw error;
  }
};

// Actualizar el perfil del usuario
export const updateUser = async (userId: number, updatedData: any): Promise<any> => {
  try {
    const response = await apiClient.put(`/User/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar los datos del usuario ${userId}:`, error);
    throw error;
  }
};

// Obtener solicitudes de laboratorio del usuario
export const getUserLabRequests = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/LaboratoryRequest/my-requests');
    return response.data;
  } catch (error) {
    console.error('Error al obtener solicitudes de laboratorio:', error);
    throw error;
  }
};

// Obtener solicitudes de sala del usuario
export const getUserRoomRequests = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/RoomRequest/my-requests');
    return response.data;
  } catch (error) {
    console.error('Error al obtener solicitudes de sala:', error);
    throw error;
  }
};
