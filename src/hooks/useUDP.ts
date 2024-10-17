// src/hooks/useUDPs.ts
import { useState, useEffect } from 'react';
import { UDP } from '../types/Types';
import { addUDP, deleteUDP, editUDP, getUDPs } from '../Services/udpService';

export const useUDPs = () => {
  const [udps, setUDPs] = useState<UDP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUDPsData = async () => {
    setLoading(true);
    try {
      const data = await getUDPs();
      setUDPs(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar UDPs');
      setUDPs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUDPsData();
  }, []);

  const handleAddUDP = async (newUDP: Omit<UDP, 'id_UDP'>) => {
    try {
      await addUDP(newUDP);
      fetchUDPsData();
    } catch (error) {
      console.error('Error al agregar UDP:', error);
    }
  };

  const handleEditUDP = async (id: number, updatedUDP: Omit<UDP, 'id_UDP'>) => {
    try {
      await editUDP(id, updatedUDP);
      fetchUDPsData();
    } catch (error) {
      console.error('Error al editar UDP:', error);
    }
  };

  const handleDeleteUDP = async (id: number) => {
    try {
      await deleteUDP(id);
      fetchUDPsData();
    } catch (error) {
      console.error('Error al eliminar UDP:', error);
    }
  };

  return {
    udps,
    loading,
    error,
    handleAddUDP,
    handleEditUDP,
    handleDeleteUDP,
  };
};
