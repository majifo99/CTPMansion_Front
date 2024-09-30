import axios from 'axios';
import { Room } from '../types/Types'; // Definimos un tipo de 'Room' en Types para gestionar las salas

const API_URL = 'https://localhost:7055/api/Room';

// Obtener todas las salas
export const fetchRooms = async (): Promise<Room[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener una sala por ID
export const fetchRoomById = async (id: number): Promise<Room> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear una nueva sala
export const addRoom = async (room: Room): Promise<Room> => {
  const response = await axios.post(API_URL, room, {
    headers: { 'Content-Type': 'application/json-patch+json' },
  });
  return response.data;
};

// Editar una sala por ID
export const editRoom = async (id: number, room: Room): Promise<Room> => {
  const response = await axios.put(`${API_URL}/${id}`, room, {
    headers: { 'Content-Type': 'application/json-patch+json' },
  });
  return response.data;
};

// Eliminar una sala por ID
export const deleteRoom = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
