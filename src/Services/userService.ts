import axios from 'axios';

// URL base para tu API
const BASE_URL = 'https://localhost:7055/api';

// Obtener la lista de usuarios
export const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/User`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Obtener roles de un usuario
export const getUserRoles = async (userId: number, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/UserRole/${userId}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener roles para el usuario ${userId}:`, error);
    throw error;
  }
};

// Agregar rol a un usuario
export const addUserRole = async (userId: number, roleId: number, token: string) => {
  try {
    await axios.post(`${BASE_URL}/UserRole/add`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
export const removeUserRole = async (userId: number, roleId: number, token: string) => {
  try {
    await axios.post(`${BASE_URL}/UserRole/remove`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
