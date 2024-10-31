// src/Services/authService.ts

import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importación correcta de jwt-decode
import Cookies from 'js-cookie';

// Define la estructura esperada del JWT decodificado
interface DecodedUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

// Realizar login y almacenar token en cookies
export const login = async (email: string, password: string): Promise<DecodedUser | null> => {
  try {
    const response = await axios.post(
      'https://ctplamansion.onrender.com/api/User/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json-patch+json' } }
    );

    const { token } = response.data;

    // Guardar el token en las cookies con una expiración de 1 día
    Cookies.set('token', token, { expires: 1 }); 

    // Decodificar el token JWT para extraer los datos del usuario
    const decodedToken: any = jwtDecode(token);
    const decodedUser: DecodedUser = {
      id: parseInt(decodedToken.nameid),
      name: decodedToken.Name,
      email: decodedToken.Email,
      roles: Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role],
    };

    return decodedUser; // Retornar el usuario decodificado con roles
  } catch (error) {
    console.error('Error durante el login:', error);
    return null;
  }
};

// Eliminar el token de las cookies al hacer logout
export const logout = () => {
  Cookies.remove('token');
};
