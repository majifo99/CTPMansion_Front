import { useState, useEffect } from 'react';

import { Laboratory } from '../types/Types';  // Importar el tipo Laboratory
import { getLaboratories } from '../Services/LaboratoryService';

export const useLabs = () => {
  const [labs, setLabs] = useState<Laboratory[]>([]);  // Estado para almacenar los laboratorios
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLabs = async () => {
      setLoading(true);  // Iniciar la carga
      try {
        const data = await getLaboratories();  // Llamada al servicio para obtener laboratorios
        if (Array.isArray(data)) {
          setLabs(data);  // Asignar los laboratorios obtenidos
        } else {
          throw new Error('Se esperaba un arreglo de laboratorios');
        }
      } catch (err) {
        setError(err.message);  // Asignar mensaje de error
      } finally {
        setLoading(false);  // Finalizar la carga
      }
    };

    getLabs();
  }, []);

  return { labs, loading, error };
};
