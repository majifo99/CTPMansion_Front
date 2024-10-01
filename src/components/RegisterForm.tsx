import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useTheme } from "./ThemeContext";

Modal.setAppElement('#root');

interface RegisterFormData {
  name: string;
  LastName: string;
  LastName2: string;
  PhoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el botón
  const { isDarkMode, toggleDarkMode } = useTheme(); // Access theme state and toggle

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true); // Cambia el estado del botón a "Procesando..."
    try {
      const response = await fetch('https://localhost:7055/api/User/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      const userId = result.id_User;

      if (userId) {
        sessionStorage.setItem('userId', userId);
        setIsModalOpen(true); // Abre el modal
      } else {
        console.error('No userId found in the response.');
      }
    } catch (error) {
      console.error('Error in registration:', error);
    } finally {
      setIsSubmitting(false); // Termina el estado de "Procesando..."
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/verify-email'); // Redirige a la página de verificación
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirige a la página de inicio de sesión
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
          <h1 className="text-3xl font-semibold">Regístrate</h1>
          <div className="flex items-center">
            <span className="text-sm mr-2">{isDarkMode ? 'Modo Noche' : 'Modo Día'}</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2">Nombre</label>
              <input
                type="text"
                {...register("name", { required: "El nombre es requerido" })}
                id="name"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="Juan"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="LastName" className="block mb-2">Primer Apellido</label>
              <input
                type="text"
                {...register("LastName", { required: "El primer apellido es requerido" })}
                id="LastName"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="Pérez"
              />
              {errors.LastName && <span className="text-red-500 text-sm">{errors.LastName.message}</span>}
            </div>

            <div>
              <label htmlFor="LastName2" className="block mb-2">Segundo Apellido</label>
              <input
                type="text"
                {...register("LastName2", { required: "El segundo apellido es requerido" })}
                id="LastName2"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="Gómez"
              />
              {errors.LastName2 && <span className="text-red-500 text-sm">{errors.LastName2.message}</span>}
            </div>

            <div>
              <label htmlFor="PhoneNumber" className="block mb-2">Número de Teléfono</label>
              <input
                type="text"
                {...register("PhoneNumber", { required: "El número de teléfono es requerido" })}
                id="PhoneNumber"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="8888-8888"
              />
              {errors.PhoneNumber && <span className="text-red-500 text-sm">{errors.PhoneNumber.message}</span>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
              <input
                type="email"
                {...register("email", {
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Correo electrónico inválido",
                  },
                })}
                id="email"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="nombre@empresa.com"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">Contraseña</label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
                  }
                })}
                id="password"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="••••••••"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: value =>
                    value === password || "Las contraseñas no coinciden"
                })}
                id="confirmPassword"
                className={`w-full border rounded-md py-2 px-3 ${isDarkMode ? 'bg-[#13152A] text-gray-300 border-gray-600 focus:border-teal-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:border-blue-500'} focus:outline-none`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 ${isDarkMode ? 'bg-teal-500 text-white' : 'bg-blue-500 text-white'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'}`}
          >
            {isSubmitting ? 'Procesando...' : 'Registrarse'}
          </button>
        </form>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Registro Exitoso"
          className="absolute inset-0 flex items-center justify-center z-[9999]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        >
          <div className={`p-6 rounded-lg shadow-lg z-[9999] ${isDarkMode ? 'bg-[#13152A] text-gray-300' : 'bg-white text-gray-800'}`}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-teal-400' : 'text-blue-600'}`}>Registro Exitoso</h2>
            <p className="mt-2">Tu registro ha sido exitoso. Por favor verifica tu correo para activar tu cuenta.</p>
            <button
              onClick={closeModal}
              className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Aceptar
            </button>
          </div>
        </Modal>

        {/* Botón para regresar al login */}
        <div className="mt-6 text-center">
          <button onClick={handleLoginRedirect} className={`hover:underline ${isDarkMode ? 'text-teal-400' : 'text-blue-500'}`}>
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
