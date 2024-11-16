// src/hooks/useRoomsAndRequests.ts
import { useState, useEffect } from 'react';
import { RoomRequest } from '../types/RoomRequestType';

export const useRoomsAndRequests = () => {
  const [roomRequests, setRoomRequests] = useState<RoomRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequestsData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/requests'); // Llamada API sin filtro
      const data = await response.json();
      setRoomRequests(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las solicitudes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestsData();
  }, []);

  return { roomRequests, loading, error, fetchRequestsData };
};
