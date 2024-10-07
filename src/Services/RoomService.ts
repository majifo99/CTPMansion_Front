import axios from 'axios';
import { Room } from '../types/Types'; // Importar el tipo Room

const API_URL = 'https://localhost:7055/api/Room'; // Ajustar la URL base según sea necesario

// Crear una instancia de Axios con configuración predeterminada
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token en el encabezado de autorización
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Obtener todas las salas
export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await apiClient.get('/');
    return response.data; // Se espera que la respuesta sea un array de salas
  } catch (error) {
    throw new Error('Failed to fetch rooms'); // Manejar errores de manera adecuada
  }
};

