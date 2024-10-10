import { useState, useEffect } from 'react';
import { fetchLaboratories, fetchLabRequests, approveLabRequest, rejectLabRequest } from '../Services/LaboratoryService';
import { Laboratory } from '../types/Types';
import { LabRequest } from '../types/LaboratoryRequestType';

export const useLabsAndRequests = () => {
  const [labs, setLabs] = useState<Laboratory[]>([]);
  const [labRequests, setLabRequests] = useState<LabRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLabsData = async () => {
    try {
      const data = await fetchLaboratories();
      setLabs(data);
    } catch (error) {
      console.error('Error al obtener los laboratorios:', error);
      setError('Error al obtener los laboratorios');
    }
  };

  const fetchLabRequestsData = async () => {
    try {
      const data = await fetchLabRequests();
      setLabRequests(data);
    } catch (error) {
      console.error('Error al obtener las solicitudes de laboratorio:', error);
      setError('Error al obtener las solicitudes de laboratorio');
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchLabsData(), fetchLabRequestsData()])
      .finally(() => setLoading(false));
  }, []);

  const delayedFetchData = async (delay: number = 2000) => {
    setTimeout(async () => {
      await Promise.all([fetchLabsData(), fetchLabRequestsData()]);
    }, delay);
  };

  const handleApproveLabRequest = async (id: number) => {
    try {
      await approveLabRequest(id);
      delayedFetchData();
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
      setError('Error al aprobar la solicitud');
    }
  };

  const handleRejectLabRequest = async (id: number) => {
    try {
      await rejectLabRequest(id);
      delayedFetchData();
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
      setError('Error al rechazar la solicitud');
    }
  };

  return {
    labs,
    labRequests,
    loading,
    error,
    handleApproveLabRequest,
    handleRejectLabRequest,
    fetchLabRequestsData,
  };
};
