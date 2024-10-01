// services/authService.ts
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    'https://localhost:7055/api/User/login',
    { email, password },
    { headers: { 'Content-Type': 'application/json-patch+json' } }
  );

  const { token } = response.data;
  localStorage.setItem('token', token); // Guardar el token en localStorage
  const decodedUser = jwtDecode(token); // Decodificar el token
  return decodedUser;  // Retornar el usuario decodificado
};

export const logout = () => {
  localStorage.removeItem('token');
};
