import { useState, useEffect } from 'react';
import { addLaboratory, deleteLaboratory, fetchLaboratories, updateLaboratory } from '../Services/LaboratoryService';
import { Laboratory } from '../types/Types';

export const useLaboratories = () => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para manejar errores
  const handleError = (message: string, err: any) => {
    console.error(message, err);
    setError(message);
  };

  // Función para cargar laboratorios
  const loadLaboratories = async () => {
    setLoading(true);
    try {
      const data = await fetchLaboratories();
      setLaboratories(data);
      setError(null); // Restablecer el error en caso de éxito
    } catch (err) {
      handleError('Error fetching laboratories', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar laboratorios al montar el componente
  useEffect(() => {
    loadLaboratories();
  }, []);

  // Función para agregar retraso en la recarga de laboratorios
  const delayedReload = (delay: number = 2000) => {
    setLoading(true);
    setTimeout(loadLaboratories, delay);
  };

  // Función para agregar un laboratorio
  const handleAddLaboratory = async (newLaboratory: Laboratory) => {
    try {
      await addLaboratory(newLaboratory);
      delayedReload();
    } catch (err) {
      handleError('Error adding laboratory', err);
    }
  };

  // Función para editar un laboratorio
  const handleEditLaboratory = async (id: number, updatedLaboratory: Laboratory) => {
    try {
      await updateLaboratory(id, updatedLaboratory);
      delayedReload();
    } catch (err) {
      handleError('Error editing laboratory', err);
    }
  };

  // Función para eliminar un laboratorio
  const handleDeleteLaboratory = async (id: number) => {
    try {
      await deleteLaboratory(id);
      delayedReload();
    } catch (err) {
      handleError('Error deleting laboratory', err);
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
