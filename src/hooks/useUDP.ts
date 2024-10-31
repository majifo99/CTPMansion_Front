// src/hooks/useUDPs.ts
import { useState, useEffect } from 'react';
import { UDP } from '../types/Types';
import { addUDP, deleteUDP, editUDP, getUDPs, getUDPById, patchUDPBalance } from '../services/udpService';

export const useUDPs = () => {
  const [udps, setUdps] = useState<UDP[]>([]);
  const [selectedUdp, setSelectedUdp] = useState<UDP | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las UDPs al montar el componente
  const fetchUDPsData = async () => {
    setLoading(true);
    try {
      const data = await getUDPs();
      setUdps(data);
      setError(null);
    } catch {
      setError("Error al obtener UDPs");
      setUdps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUDPsData();
  }, []);

  // Función para añadir una nueva UDP
  const handleAddUDP = async (newUDP: Omit<UDP, 'id_UDP'>) => {
    try {
      await addUDP(newUDP);
      fetchUDPsData();
    } catch (error) {
      console.error('Error al agregar UDP:', error);
      setError('Error al agregar UDP');
    }
  };

  // Función para editar una UDP existente
  const handleEditUDP = async (id: number, updatedUDP: Omit<UDP, 'id_UDP'>) => {
    try {
      const udpWithId = { id_UDP: id, ...updatedUDP }; // Agrega el campo `id_UDP`
      await editUDP(id, udpWithId); // Llamada con el objeto completo
      fetchUDPsData();
    } catch (error) {
      console.error('Error al editar UDP:', error);
      setError('Error al editar UDP');
    }
  };

  // Función para eliminar una UDP
  const handleDeleteUDP = async (id: number) => {
    try {
      await deleteUDP(id);
      fetchUDPsData();
    } catch (error) {
      console.error('Error al eliminar UDP:', error);
      setError('Error al eliminar UDP');
    }
  };

  // Actualizar el balance de una UDP específica
  const updateUDPBalance = async (id: number, newBalance: number) => {
    try {
      setLoading(true);
      await patchUDPBalance(id, newBalance);
      const udp = await getUDPById(id);
      setSelectedUdp(udp);
    } catch (error) {
      console.error('Error al actualizar el balance:', error);
      setError('Error al actualizar el balance');
    } finally {
      setLoading(false);
    }
  };

  return {
    udps,
    selectedUdp,
    loading,
    error,
    fetchUdpById: getUDPById,
    updateUDPBalance,
    handleAddUDP,
    handleEditUDP,
    handleDeleteUDP,
  };
};
