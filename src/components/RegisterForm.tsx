import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface RegisterFormData {
  name: string;
  lastName: string;
  lastName2: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture: FileList;
  address: string;
  institutionJoinDate: string;
  workJoinDate: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const password = watch("password");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      let base64Image = '';
      const profilePictureFile = data.profilePicture?.[0];
      if (profilePictureFile) {
        base64Image = await convertToBase64(profilePictureFile);
      }

      const { confirmPassword, profilePicture, ...rest } = data;
      const dataToSend = {
        ...rest,
        profilePicture: base64Image
      };

      const response = await fetch('https://ctplamansion.onrender.com/api/User/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Error en la solicitud');

      const result = await response.json();
      const userId = result.id_User;

      if (userId) {
        sessionStorage.setItem('userId', userId);
        setIsModalOpen(true);
      } else {
        console.error('No userId found in the response.');
      }
    } catch (error) {
      console.error('Error in registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/verify-email');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 text-gray-800 flex justify-center items-center h-screen">
      <div className="hidden lg:block w-1/2 h-screen">
        <img
          src="https://i.ibb.co/dKVCLB2/ctp-m.jpg"
          alt="Imagen de fondo"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-8 md:p-8 sm:p-6 p-4 w-full lg:w-1/2 h-full bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Regístrate</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm">Nombre</label>
              <input
                type="text"
                {...register("name", { required: "El nombre es requerido" })}
                id="name"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Juan"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm">Primer Apellido</label>
              <input
                type="text"
                {...register("lastName", { required: "El primer apellido es requerido" })}
                id="lastName"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Pérez"
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
            </div>

            <div>
              <label htmlFor="lastName2" className="block mb-1 text-sm">Segundo Apellido</label>
              <input
                type="text"
                {...register("lastName2", { required: "El segundo apellido es requerido" })}
                id="lastName2"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Gómez"
              />
              {errors.lastName2 && <span className="text-red-500 text-xs">{errors.lastName2.message}</span>}
            </div>
          </div>

          {/* Teléfonos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="phoneNumber" className="block mb-1 text-sm">Número de Teléfono</label>
              <input
                type="text"
                {...register("phoneNumber", { 
                  required: "El número de teléfono es requerido",
                  pattern: {
                    value: /^\d{4}-\d{4}$/,
                    message: "Formato inválido (ejemplo: 8888-8888)"
                  }
                })}
                id="phoneNumber"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="8888-8888"
              />
              {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>}
            </div>

            <div>
              <label htmlFor="emergencyPhoneNumber" className="block mb-1 text-sm">Teléfono de Emergencia</label>
              <input
                type="text"
                {...register("emergencyPhoneNumber", { 
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^\d{4}-\d{4}$/,
                    message: "Formato inválido (ejemplo: 8888-8888)"
                  }
                })}
                id="emergencyPhoneNumber"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="8888-8888"
              />
              {errors.emergencyPhoneNumber && <span className="text-red-500 text-xs">{errors.emergencyPhoneNumber.message}</span>}
            </div>
          </div>

          {/* Correo Electrónico */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Correo Electrónico</label>
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
              className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              placeholder="nombre@empresa.com"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="password" className="block mb-1 text-sm">Contraseña</label>
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
                    message: "Debe tener al menos 8 caracteres, una mayúscula y un número",
                  }
                })}
                id="password"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm">Confirmar Contraseña</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: value =>
                    value === password || "Las contraseñas no coinciden"
                })}
                id="confirmPassword"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="address" className="block mb-1 text-sm">Dirección</label>
            <input
              type="text"
              {...register("address", { required: "La dirección es requerida" })}
              id="address"
              className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              placeholder="Dirección completa"
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address.message}</span>}
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="institutionJoinDate" className="block mb-1 text-sm">Ingreso a Institución</label>
              <input
                type="date"
                {...register("institutionJoinDate", { required: "Esta fecha es requerida" })}
                id="institutionJoinDate"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              />
              {errors.institutionJoinDate && <span className="text-red-500 text-xs">{errors.institutionJoinDate.message}</span>}
            </div>

            <div>
              <label htmlFor="workJoinDate" className="block mb-1 text-sm">Ingreso al Trabajo</label>
              <input
                type="date"
                {...register("workJoinDate", { required: "Esta fecha es requerida" })}
                id="workJoinDate"
                className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
              />
              {errors.workJoinDate && <span className="text-red-500 text-xs">{errors.workJoinDate.message}</span>}
            </div>
          </div>

          {/* Foto de Perfil */}
          <div>
            <label htmlFor="profilePicture" className="block mb-1 text-sm">Foto de Perfil</label>
            <input
              type="file"
              accept="image/*"
              {...register("profilePicture", { 
                required: "La foto de perfil es requerida",
                validate: value => value?.length > 0 || "Debe seleccionar una imagen"
              })}
              id="profilePicture"
              className="w-full border rounded-md py-1 px-2 bg-gray-100 border-gray-300 text-sm text-gray-800 focus:border-blue-500 focus:outline-none"
            />
            {errors.profilePicture && <span className="text-red-500 text-xs">{errors.profilePicture.message}</span>}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isSubmitting ? 'Procesando...' : 'Registrarse'}
          </button>
        </form>

        {/* Modal de Registro Exitoso */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Registro Exitoso"
          className="absolute inset-0 flex items-center justify-center z-[9999]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        >
          <div className="p-6 rounded-lg shadow-lg bg-white text-gray-800">
            <h2 className="text-xl font-semibold text-blue-600">Registro Exitoso</h2>
            <p className="mt-2 text-sm">Tu registro ha sido exitoso. Por favor verifica tu correo para activar tu cuenta.</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm"
            >
              Aceptar
            </button>
          </div>
        </Modal>

        {/* Enlace para Iniciar Sesión */}
        <div className="mt-4 text-center">
          <button onClick={handleLoginRedirect} className="text-blue-500 hover:underline text-sm">
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;