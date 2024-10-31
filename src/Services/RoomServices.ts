import axios from 'axios';
import { Room } from '../types/Types'; // Definimos un tipo de 'Room' en Types para gestionar las salas
import { RoomRequest } from '../types/RoomRequestType'; // Importamos RoomRequestType para gestionar las solicitudes de sala

const API_URL = 'https://ctplamansion.onrender.com/api';

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
      config.headers.Authorization = `Bearer ${token}`; // Agregar el token a la cabecera de autorización
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Servicios para Salas ===

// Obtener todas las salas
export const fetchRooms = async (): Promise<Room[]> => {
  const response = await apiClient.get('/Room');
  return response.data;
};

// Obtener una sala por ID
export const fetchRoomById = async (id: number): Promise<Room> => {
  const response = await apiClient.get(`/Room/${id}`);
  return response.data;
};

// Crear una nueva sala
export const addRoom = async (room: Room): Promise<Room> => {
  const response = await apiClient.post('/Room', room);
  return response.data;
};

// Editar una sala por ID
export const editRoom = async (id: number, room: Room): Promise<Room> => {
  const response = await apiClient.put(`/Room/${id}`, room);
  return response.data;
};

// Eliminar una sala por ID
export const deleteRoom = async (id: number): Promise<void> => {
  await apiClient.delete(`/Room/${id}`);
};

// === Servicios para Solicitudes de Sala ===

// Obtener todas las solicitudes de sala
export const fetchRoomRequests = async (): Promise<RoomRequest[]> => {
  const response = await apiClient.get('/RoomRequest');
  return response.data;
};

// Aprobar una solicitud de sala
export const approveRoomRequest = async (id: number): Promise<void> => {
  await apiClient.post(`/RoomRequest/${id}/approve`);
};

// Rechazar una solicitud de sala
export const rejectRoomRequest = async (id: number): Promise<void> => {
  await apiClient.post(`/RoomRequest/${id}/reject`);
};
