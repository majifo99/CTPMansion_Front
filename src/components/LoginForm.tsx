import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { jwtDecode } from 'jwt-decode'; 
import { useTheme } from './ThemeContext'; 


Modal.setAppElement('#root');

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Función para manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://localhost:7055/api/User/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json-patch+json' } }
      );

      if (response.status === 200) {
        const { token } = response.data; // Suponemos que el token JWT viene en la respuesta
        localStorage.setItem('token', token); // Guardar el token en el localStorage
        const decodedUser = jwtDecode(token); // Decodificar el token
        console.log("Usuario decodificado", decodedUser); // Puedes manejar la información del usuario aquí
        navigate('/dashboard'); // Redirigir al usuario a la página principal
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage('La información de usuario no corresponde a ningún usuario en nuestro sistema');
      } else {
        setErrorMessage('Ocurrió un error durante el inicio de sesión');
      }
      setIsModalOpen(true);
    }
  };

  // Cerrar el modal de error
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-gray-100 text-gray-800'} flex justify-center items-center h-screen`}>
      <div className="hidden lg:block w-1/2 h-screen">
        <img
          src="https://i.ibb.co/dKVCLB2/ctp-m.jpg"
          alt="Imagen de fondo"
          className={`object-cover w-full h-full ${isDarkMode ? 'opacity-60' : ''}`}
        />
      </div>

      <div className={`lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 h-full ${isDarkMode ? 'bg-[#13152A]' : 'bg-white'} shadow-lg rounded-lg`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Iniciar Sesión</h1>
          <div className="flex items-center">
            <span className="text-sm mr-2">{isDarkMode ? 'Modo Noche' : 'Modo Día'}</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
              placeholder="nombre@empresa.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlaces de registro y olvidé mi contraseña */}
        <div className="text-center mt-4">
          <button onClick={() => navigate('/register')} className="text-sm text-blue-500 hover:underline">
            ¿No tienes una cuenta? Regístrate
          </button>
        </div>
        <div className="text-center mt-4">
          <button onClick={() => navigate('/request-password-reset')} className="text-sm text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {/* Modal de error */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Error"
        className="absolute inset-0 flex items-center justify-center z-[9999]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
      >
        <div className={`p-6 rounded-lg shadow-lg z-[9999] ${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-white text-gray-800'}`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-blue-600'}`}>Error</h2>
          <p className="mt-2">{errorMessage}</p>
          <button
            onClick={closeModal}
            className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
