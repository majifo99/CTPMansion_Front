import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useAuth } from '../../contexts/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';
import UserRequestModal from '../../modals/UserRequestModal';

interface UserProfileFormData {
  name: string;
  lastName: string;
  lastName2: string;
  email: string;
  phoneNumber: string;
}

const UserProfile: React.FC = () => {
  const { user: authUser } = useAuth(); // No necesitamos token explícito porque usamos cookies
  const userId = authUser?.id;

  const { user, loading, error, updateSuccess, handleUpdateUser } = useUserProfile(userId);

  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Control del modal

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileFormData>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        lastName: user.lastName,
        lastName2: user.lastName2,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      await handleUpdateUser(data);
      setEditMode(false);
    } catch (error) {
      console.error('Error actualizando el perfil:', error);
    }
  };

  const handleEditClick = () => setEditMode(true);

  const handleCancelClick = () => {
    reset();
    setEditMode(false);
  };

  if (loading) return <ClipLoader color="#3b82f6" size={100} />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md w-full max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Perfil de Usuario</h1>
      {updateSuccess && <div className="text-green-500 mb-4">Perfil actualizado exitosamente.</div>}

      {/* Botón para abrir el modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition duration-300 mb-6"
      >
        Ver Solicitudes
      </button>

      <UserRequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} userId={userId?.toString()} />

      {!editMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-lg">
              <strong className="block text-gray-600">Nombre:</strong> {user?.name}
            </p>
            <p className="text-lg">
              <strong className="block text-gray-600">Primer Apellido:</strong> {user?.lastName}
            </p>
            <p className="text-lg">
              <strong className="block text-gray-600">Segundo Apellido:</strong> {user?.lastName2}
            </p>
            <p className="text-lg">
              <strong className="block text-gray-600">Email:</strong> {user?.email}
            </p>
            <p className="text-lg">
              <strong className="block text-gray-600">Teléfono:</strong> {user?.phoneNumber}
            </p>
          </div>
          <div className="text-right mt-6">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nombre:</label>
              <input
                type="text"
                {...register('name', { required: 'Este campo es obligatorio' })}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primer Apellido:</label>
              <input
                type="text"
                {...register('lastName', { required: 'Este campo es obligatorio' })}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Segundo Apellido:</label>
              <input
                type="text"
                {...register('lastName2', { required: 'Este campo es obligatorio' })}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition ${
                  errors.lastName2 ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName2 && <span className="text-red-500">{errors.lastName2.message}</span>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Correo Electrónico:</label>
              <input
                type="email"
                {...register('email', { required: 'Este campo es obligatorio' })}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Teléfono:</label>
              <input
                type="tel"
                {...register('phoneNumber', { required: 'Este campo es obligatorio' })}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phoneNumber && (
                <span className="text-red-500">{errors.phoneNumber.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
