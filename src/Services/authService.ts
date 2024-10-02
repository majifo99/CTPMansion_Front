import axios from 'axios';
import { jwtDecode } from "jwt-decode";// Asegúrate de que jwtDecode esté importado correctamente

// Define la estructura esperada del JWT decodificado
interface DecodedUser {
  name: string;
  email: string;
  roles: string[];  // El campo "role" es un array de roles
}

export const login = async (email: string, password: string): Promise<DecodedUser | null> => {
  try {
    const response = await axios.post(
      'https://localhost:7055/api/User/login',
      { email, password },
      { headers: { 'Content-Type': 'application/json-patch+json' } }
    );

    const { token } = response.data;
    localStorage.setItem('token', token); // Guardar el token en localStorage

    // Decodificar el token JWT
    const decodedToken: any = jwtDecode(token); // Decodificar el token
    const decodedUser: DecodedUser = {
      name: decodedToken.Name,
      email: decodedToken.Email,
      roles: decodedToken.role, // Extraer los roles desde el campo "role"
    };

    return decodedUser;  // Retornar el usuario decodificado con roles
  } catch (error) {
    console.error('Error durante el login:', error);
    return null;  // Manejar errores devolviendo null
  }
};

export const logout = () => {
  localStorage.removeItem('token'); // Eliminar token del localStorage al hacer logout
};
