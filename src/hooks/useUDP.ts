// src/hooks/useUDPs.ts
import { useState, useEffect } from 'react';
import { getUDPs, getUDPById, patchUDPBalance } from '../Services/udpService';
import { UDP } from '../types/Types';

export const useUDPs = () => {
  const [udps, setUdps] = useState<UDP[]>([]);
  const [selectedUdp, setSelectedUdp] = useState<UDP | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las UDPs al montar el componente
  useEffect(() => {
    const fetchUDPs = async () => {
      setLoading(true);
      const data = await getUDPs();
      if (data) {
        setUdps(data);
      } else {
        setError("Error al obtener UDPs");
      }
      setLoading(false);
    };

    fetchUDPs();
  }, []);

  // Función para seleccionar una UDP y obtener su información actual
  const fetchUdpById = async (id: number) => {
    setLoading(true);
    const udp = await getUDPById(id);
    setSelectedUdp(udp);
    setLoading(false);
  };


  const updateUDPBalance = async (id: number, newBalance: number) => {
    try {
      setLoading(true);
      await patchUDPBalance(id, newBalance);  // Realiza el PATCH para actualizar
      // Luego de hacer el PATCH, obtén nuevamente la UDP actualizada desde el backend
      const udp = await getUDPById(id);
      setSelectedUdp(udp);  // Actualiza la UDP seleccionada en el estado
      setLoading(false);
    } catch (error) {
      setError('Error al actualizar el balance');
      setLoading(false);
    }
  };

  return {
    udps,
    selectedUdp,
    loading,
    error,
    fetchUdpById,
    updateUDPBalance,
  };
};
