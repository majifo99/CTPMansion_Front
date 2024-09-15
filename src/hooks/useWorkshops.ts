import { useState, useEffect } from 'react';
import { Workshop } from '../types/Types';
import { fetchWorkshops } from '../services/LandingPageServices';

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const workshopsData = await fetchWorkshops();
        setWorkshops(workshopsData);
      } catch (err) {
        setError('Error al cargar los talleres');
      } finally {
        setLoading(false);
      }
    };

    getWorkshops();
  }, []);

  return { workshops, loading, error };
};