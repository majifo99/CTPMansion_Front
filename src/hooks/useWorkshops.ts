import { useState, useEffect } from 'react';
import { Workshop, Speciality } from '../types/Types';
import {
  getAllWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  fetchSpecialities,  // Importamos la función para obtener las especialidades
} from '../services/LandingPageServices';

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [specialities, setSpecialities] = useState<Speciality[]>([]); // Añadir estado para especialidades
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los workshops
  const fetchWorkshops = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllWorkshops();
      setWorkshops(data);
    } catch (err) {
      setError('Error al cargar los talleres');
    } finally {
      setLoading(false);
    }
  };

  // Cargar las especialidades
  const fetchSpecialitiesList = async () => {
    try {
      const data = await fetchSpecialities();
      setSpecialities(data); // Guardar especialidades en el estado
    } catch (err) {
      setError('Error al cargar las especialidades');
    }
  };

  // Función para agregar un nuevo workshop
  const handleAddWorkshop = async (workshopData: Omit<Workshop, 'id'>) => {
    try {
      const newWorkshop = await createWorkshop(workshopData);
      setWorkshops((prevWorkshops) => [...prevWorkshops, newWorkshop]);
    } catch (err) {
      setError('Error al agregar el taller');
    }
  };

  // Función para editar un workshop
  const handleEditWorkshop = async (id: number, updatedWorkshop: Omit<Workshop, 'id'>) => {
    try {
      const editedWorkshop = await updateWorkshop(id, updatedWorkshop);
      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) => (workshop.id === id ? editedWorkshop : workshop))
      );
    } catch (err) {
      setError('Error al actualizar el taller');
    }
  };

  // Función para eliminar un workshop
  const handleDeleteWorkshop = async (id: number) => {
    try {
      await deleteWorkshop(id);
      setWorkshops((prevWorkshops) => prevWorkshops.filter((workshop) => workshop.id !== id));
    } catch (err) {
      setError('Error al eliminar el taller');
    }
  };

  // Cargar workshops y especialidades al montar
  useEffect(() => {
    fetchWorkshops();
    fetchSpecialitiesList(); // Cargar especialidades
  }, []);

  return {
    workshops,
    specialities,  // Devolvemos las especialidades también
    loading,
    error,
    handleAddWorkshop,
    handleEditWorkshop,
    handleDeleteWorkshop,
  };
};
