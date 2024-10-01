import { useState, useEffect } from 'react';
import { fetchRooms, addRoom, editRoom, deleteRoom } from '../Services/RoomServices'; // Importamos el servicio de API
import { Room } from '../types/Types'; // Importamos el tipo 'Room'

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // `loading` solo se usa al inicio
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todas las salas
  const fetchRoomsData = async () => {
    try {
      const data = await fetchRooms(); // Llamada al servicio API
      setRooms(data);
    } catch (error) {
      console.error('Error al obtener las salas:', error);
      setError('Error al obtener las salas');
    }
  };

  useEffect(() => {
    setLoading(true); // Solo mostramos loading durante la carga inicial
    fetchRoomsData().finally(() => setLoading(false)); // Finalmente ocultamos el estado de carga
  }, []);

  // Recargar las salas con un retraso, sin cambiar el estado de `loading`
  const delayedFetchRooms = async (delay: number = 2000) => {
    setTimeout(async () => {
      await fetchRoomsData();
    }, delay); // Introducimos un retraso de 2 segundos por defecto
  };

  // Función para agregar una sala
  const handleAddRoom = async (newRoom: Room) => {
    try {
      await addRoom(newRoom); // Llamada al servicio para agregar la sala
      delayedFetchRooms(); // Recargar las salas con un retraso
    } catch (error) {
      console.error('Error al agregar la sala:', error);
      setError('Error al agregar la sala');
    }
  };

  // Función para editar una sala
  const handleEditRoom = async (id: number, updatedRoom: Room) => {
    try {
      await editRoom(id, updatedRoom); // Llamada al servicio para editar la sala
      delayedFetchRooms(); // Recargar las salas con un retraso
    } catch (error) {
      console.error('Error al editar la sala:', error);
      setError('Error al editar la sala');
    }
  };

  // Función para eliminar una sala
  const handleDeleteRoom = async (id: number) => {
    try {
      await deleteRoom(id); // Llamada al servicio para eliminar la sala
      delayedFetchRooms(); // Recargar las salas con un retraso
    } catch (error) {
      console.error('Error al eliminar la sala:', error);
      setError('Error al eliminar la sala');
    }
  };

  return {
    rooms,
    loading, // El loading se usa solo para la carga inicial
    error,
    handleAddRoom,
    handleEditRoom,
    handleDeleteRoom,
  };
};
