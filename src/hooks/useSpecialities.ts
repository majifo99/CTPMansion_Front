import { useState, useEffect } from 'react';
import { Speciality } from '../types/Types';
import { fetchSpecialities } from '../services/LandingPageServices';

export const useSpecialities = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSpecialities = async () => {
      try {
        const specialitiesData = await fetchSpecialities();
        setSpecialities(specialitiesData);
        console.log(specialitiesData);
      } catch (err) {
        setError('Error al cargar las especialidades');
      } finally {
        setLoading(false);
      }
    };

    getSpecialities();
  }, []);

  return { specialities, loading, error };
};
