
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener este paquete instalado
import { login as authLogin, logout as authLogout } from '../Services/authService';

interface AuthContextType {
  token: string | null;
  user: any; // Puedes tipar mejor dependiendo de la estructura del token decodificado
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // El usuario decodificado del JWT

  // Cargar token desde localStorage al iniciar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = jwtDecode(storedToken);
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
        setUser(loggedInUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
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
