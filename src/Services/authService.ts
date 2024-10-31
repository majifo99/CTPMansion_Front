// src/Services/authService.ts

import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Importación correcta de jwt-decode
import Cookies from 'js-cookie';
import { DecodedUser, LoginResponse } from '../types/AuthServiceTypes'; // Importa los tipos

// Realizar login y almacenar token en cookies
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      'https://localhost:7055/api/User/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json-patch+json' } }
    );

    const { token } = response.data;

    // Guardar el token en las cookies con una expiración de 1 día
    Cookies.set('token', token, { expires: 1 }); 

    // Decodificar el token JWT para extraer los datos del usuario
    const decodedToken: DecodedUser = jwtDecode(token);

    const decodedUser: DecodedUser = {
      id: parseInt(decodedToken.id.toString()),
      name: decodedToken.name,
      email: decodedToken.email,
      roles: Array.isArray(decodedToken.roles) ? decodedToken.roles : [decodedToken.roles],
    };

    return decodedUser; // Retornar el usuario decodificado con roles
  } catch (error) {
    console.error('Error durante el login:', error);
    return null;
  }
};

// Eliminar el token de las cookies al hacer logout
export const logout = (): void => {
  Cookies.remove('token');
};