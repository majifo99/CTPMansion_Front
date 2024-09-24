import { useState, useEffect } from 'react';
import { fetchSpecialities, addSpeciality, editSpeciality, deleteSpeciality } from '../services/LandingPageServices'; // Importa los servicios correctamente
import { Speciality } from '../types/Types'; // Importa tu tipo Speciality

export const useSpecialities = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch de especialidades cuando el componente carga
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchSpecialities(); // Llamada a la API para obtener especialidades
        setSpecialities(data);
      } catch (error) {
        setError('Error al obtener las especialidades');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para agregar especialidades
  const handleAddSpeciality = async (speciality: Speciality) => {
    try {
      const newSpeciality = await addSpeciality(speciality); // Llamada a la API para agregar especialidad
      setSpecialities([...specialities, newSpeciality]); // Actualizar el estado con la nueva especialidad
    } catch (error) {
      setError('Error al agregar la especialidad');
    }
  };

  // Función para editar especialidades
  const handleEditSpeciality = async (id: number, updatedSpeciality: Speciality) => {
    try {
      const editedSpeciality = await editSpeciality(id, updatedSpeciality); // Llamada a la API para editar la especialidad
      setSpecialities(specialities.map(s => (s.id === id ? editedSpeciality : s))); // Actualizar el estado con la especialidad editada
    } catch (error) {
      setError('Error al editar la especialidad');
    }
  };

  // Función para eliminar especialidades
  const handleDeleteSpeciality = async (id: number) => {
    try {
      await deleteSpeciality(id); // Llamada a la API para eliminar la especialidad
      setSpecialities(specialities.filter(s => s.id !== id)); // Actualizar el estado eliminando la especialidad
    } catch (error) {
      setError('Error al eliminar la especialidad');
    }
  };

  return {
    specialities,
    loading,
    error,
    handleAddSpeciality,
    handleEditSpeciality,
    handleDeleteSpeciality,
  };
};
