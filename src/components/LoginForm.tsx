// components/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useTheme } from './ThemeContext';
import { useAuthContext } from '../hooks/useAuthContext';

Modal.setAppElement('#root');

const LoginForm: React.FC = () => {
  const { login } = useAuthContext(); // Usamos el contexto de autenticación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  // Manejar el submit del formulario
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await login(email, password);
    if (!loginSuccess) {
      setErrorMessage('Credenciales inválidas. Por favor, intenta de nuevo.');
      setIsModalOpen(true);
    } else {
      navigate('/dashboard'); // Redirigir al usuario en caso de éxito
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
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
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

          <div className="relative">
            <label htmlFor="password" className="block mb-2">Contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute top-3/4 right-3 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                {showPassword ? (
                  <path d="M10 2C5.445 2 1.734 4.943.172 9.278c-.115.323-.115.678 0 1.001C1.734 15.057 5.445 18 10 18s8.266-2.943 9.828-7.278a1.007 1.007 0 000-1.001C18.266 4.943 14.555 2 10 2zm0 12c-2.411 0-4.373-1.94-4.373-4.333S7.589 5.333 10 5.333c2.411 0 4.373 1.94 4.373 4.334S12.411 14 10 14zm0-7.333a3.02 3.02 0 00-3 3.333 3.02 3.02 0 003 3.333 3.02 3.02 0 003-3.333 3.02 3.02 0 00-3-3.333z" />
                ) : (
                  <path d="M.172 9.278a.905.905 0 010-1.001C1.734 4.943 5.445 2 10 2s8.266 2.943 9.828 7.278a.905.905 0 010 1.001C18.266 15.057 14.555 18 10 18s-8.266-2.943-9.828-7.278zM10 15c2.411 0 4.373-1.94 4.373-4.333S12.411 6.333 10 6.333 5.627 8.274 5.627 10.667 7.589 15 10 15zm0-9c-2.411 0-4.373 1.94-4.373 4.333S7.589 14.667 10 14.667 14.373 12.726 14.373 10.333 12.411 6 10 6z" />
                )}
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Iniciar Sesión
          </button>
        </form>

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
