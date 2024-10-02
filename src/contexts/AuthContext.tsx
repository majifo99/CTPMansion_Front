//authcontext
import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de importar correctamente jwt-decode
import { login as authLogin, logout as authLogout } from '../Services/authService';

// Definir la interfaz del usuario
interface UserType {
  id: number;            // Agregar el ID del usuario si es necesario
  name: string;
  lastName: string;
  lastName2: string;
  email: string;
  phoneNumber: string;
  roles: string[];  // Los roles del usuario decodificados
}

// Definir la interfaz del contexto de autenticación
interface AuthContextType {
  token: string | null;
  user: UserType | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider: Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  // Función para decodificar el token JWT y extraer los datos del usuario
  const decodeToken = (token: string): UserType => {
    const decodedToken: any = jwtDecode(token); // Decodifica el token
    const decodedUser: UserType = {
      id: parseInt(decodedToken.nameid),         // Asegúrate de que los campos coincidan con tu JWT
      name: decodedToken.Name,
      lastName: decodedToken.lastName,           // Usar campos relevantes del JWT
      lastName2: decodedToken.lastName2,
      email: decodedToken.Email,
      phoneNumber: decodedToken.phoneNumber,
      roles: Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role], // Si es un solo rol, lo convierte en array
    };
    return decodedUser;
  };

  // Cargar token desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = decodeToken(storedToken);
      setUser(decodedUser);
    }
  }, []);

  // Función para manejar el login
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await authLogin(email, password); // Realiza el login y obtiene el token
      if (loggedInUser) {
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
          setToken(tokenFromStorage);
          const decodedUser = decodeToken(tokenFromStorage);
          setUser(decodedUser); // Almacena el usuario decodificado
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error durante el login:', error);
      return false;
    }
  };

  // Función para manejar el logout
  const logout = () => {
    authLogout();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto de autenticación
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
