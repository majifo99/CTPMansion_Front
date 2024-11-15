import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserById, updateUser } from '../services/userService'; // Ajustar la ruta según sea necesario

export const useUserProfile = (userId: number | undefined) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Obtener el token desde las cookies
  const token = Cookies.get('token');

  // Obtener datos del usuario por ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId && token) {
          setLoading(true);
          const userData = await getUserById(userId);
          setUser(userData);
          setLoading(false);
        }
      } catch (err) {
        setError('Error al obtener los datos del usuario.');
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token]);

  // Actualizar los datos del usuario
  const handleUpdateUser = async (updatedData: any) => {
    try {
      if (!token) throw new Error('Token no disponible.');
      setLoading(true);
      const updatedUser = await updateUser(userId!, updatedData);
      setUser(updatedUser);
      setUpdateSuccess(true);
      setLoading(false);
    } catch (err) {
      setError('Error al actualizar los datos del usuario.');
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateSuccess,
    handleUpdateUser,
  };
};
