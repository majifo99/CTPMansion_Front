import { useState, useEffect } from 'react';
import { Laboratory } from '../types/LaboratoryType';
import { addLaboratory, deleteLaboratory, getLaboratories, updateLaboratory } from '../Services/LaboratoryService';


export const useLaboratories = () => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todos los laboratorios
  const fetchLaboratories = async () => {
    try {
      const data = await getLaboratories();
      setLaboratories(data);
    } catch (err) {
      console.error('Error fetching laboratories:', err);
      setError('Error fetching laboratories');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchLaboratories().finally(() => setLoading(false));
  }, []);

  // Agregar retraso antes de la recarga sin cambiar el estado loading
  const delayedFetchLaboratories = async (delay: number = 2000) => {
    setTimeout(async () => {
      await fetchLaboratories();
    }, delay);
  };

  // Función para agregar un laboratorio
  const handleAddLaboratory = async (newLaboratory: Laboratory) => {
    try {
      await addLaboratory(newLaboratory);
      delayedFetchLaboratories();
    } catch (err) {
      console.error('Error adding laboratory:', err);
      setError('Error adding laboratory');
    }
  };

  // Función para editar un laboratorio
  const handleEditLaboratory = async (id: number, updatedLaboratory: Laboratory) => {
    try {
      await updateLaboratory(id, updatedLaboratory);
      delayedFetchLaboratories();
    } catch (err) {
      console.error('Error editing laboratory:', err);
      setError('Error editing laboratory');
    }
  };

  // Función para eliminar un laboratorio
  const handleDeleteLaboratory = async (id: number) => {
    try {
      await deleteLaboratory(id);
      delayedFetchLaboratories();
    } catch (err) {
      console.error('Error deleting laboratory:', err);
      setError('Error deleting laboratory');
    }
  };

  return {
    laboratories,
    loading,
    error,
    handleAddLaboratory,
    handleEditLaboratory,
    handleDeleteLaboratory,
  };
};