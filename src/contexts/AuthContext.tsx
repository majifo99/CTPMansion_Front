import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; // Asegúrate de que jwtDecode esté importado correctamente
import { login as authLogin, logout as authLogout } from '../Services/authService';

interface UserType {
  name: string;
  email: string;
  roles: string[];  // Los roles del usuario decodificados
}

interface AuthContextType {
  token: string | null;
  user: UserType | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  // Cargar token desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken: any = jwtDecode(storedToken);
      const decodedUser: UserType = {
        name: decodedToken.Name,
        email: decodedToken.Email,
        roles: decodedToken.role,  // Extraer los roles desde el campo "role"
      };
      setUser(decodedUser);
    }
  }, []);

  // Función para manejar el login
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await authLogin(email, password); // Realiza el login y obtiene el usuario decodificado
      if (loggedInUser) {
        const tokenFromStorage = localStorage.getItem('token');
        setToken(tokenFromStorage);
        setUser(loggedInUser); // Almacena el usuario con roles
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
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
