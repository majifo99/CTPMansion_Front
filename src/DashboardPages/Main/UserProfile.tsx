import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useAuth } from "../../contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import ImageUploader from "../../components/ImageUploader";

interface UserProfileFormData {
  name: string;
  lastName: string;
  lastName2: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  emergencyPhoneNumber: string;
  address: string;
  institutionJoinDate: string;
  workJoinDate: string;
}

// Función para formatear fecha a 'YYYY-MM-DD'
const formatDate = (date: string | Date): string =>
  date ? new Date(date).toISOString().split("T")[0] : "";

const UserProfile: React.FC = () => {
  const { user: authUser } = useAuth();
  const userId = authUser?.id;
  const { user, loading, error, handleUpdateUser } = useUserProfile(userId);

  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<UserProfileFormData>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        lastName: user.lastName,
        lastName2: user.lastName2,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        emergencyPhoneNumber: user.emergencyPhoneNumber,
        address: user.address,
        institutionJoinDate: formatDate(user.institutionJoinDate),
        workJoinDate: formatDate(user.workJoinDate),
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserProfileFormData) => {
    await handleUpdateUser(data);
    setEditMode(false);
  };

  if (loading) return <ClipLoader color="#3b82f6" size={100} />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-xl">
      {/* Imagen de perfil */}
      <div className="flex justify-center">
        <img
          src={user?.profilePicture || "https://source.unsplash.com/MP0IUfwrn0A"}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-white"
        />
      </div>

      {/* Información del usuario */}
      <div className="mt-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">{user?.name} {user?.lastName}</h1>
        <p className="text-gray-600 break-words text-sm sm:text-base text-center px-2 ">{user?.email}</p>

        {/* Información en tarjetas */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "📞 Teléfono", value: user?.phoneNumber },
            { label: "🏛️ Ingreso a la Institución", value: formatDate(user?.institutionJoinDate) },
            { label: "🚨 Contacto de Emergencia", value: user?.emergencyPhoneNumber },
            { label: "💼 Ingreso al MEP", value: formatDate(user?.workJoinDate) },
            { label: "📍 Dirección", value: user?.address },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg flex flex-col sm:flex-row items-start sm:items-center space-x-3">
              <span className="text-blue-500 text-xl">{item.label.split(" ")[0]}</span>
              <p className="text-gray-700">
                <strong>{item.label.split(" ").slice(1).join(" ")}:</strong> {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de editar */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setEditMode(true)}
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
        >
          Editar Perfil
        </button>
      </div>

      {/* Formulario de edición */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Editar Perfil</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Nombre" },
                  { name: "lastName", label: "Apellido" },
                  { name: "lastName2", label: "Segundo Apellido" },
                  { name: "email", label: "Correo Electrónico" },
                  { name: "phoneNumber", label: "Teléfono" },
                  { name: "emergencyPhoneNumber", label: "Emergencia" },
                  { name: "address", label: "Dirección" },
                ].map(({ name, label }) => (
                  <div key={name}>
                    <label className="block font-semibold mb-1">{label}:</label>
                    <input
                      type="text"
                      {...register(name as keyof UserProfileFormData, { required: "Campo obligatorio" })}
                      className={`w-full p-2 border rounded-lg ${errors[name as keyof UserProfileFormData] ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors[name as keyof UserProfileFormData] && (
                      <span className="text-red-500 text-sm">{errors[name as keyof UserProfileFormData]?.message}</span>
                    )}
                  </div>
                ))}

                {/* Campos de fecha */}
                {["institutionJoinDate", "workJoinDate"].map(dateField => (
                  <div key={dateField}>
                    <label className="block font-semibold mb-1">{dateField === "institutionJoinDate" ? "Ingreso Institución" : "Ingreso Trabajo"}:</label>
                    <input type="date" {...register(dateField as keyof UserProfileFormData)} className="w-full p-2 border rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Imagen */}
              <ImageUploader onImageUpload={(url) => setValue("profilePicture", url)} />

              {/* Botones */}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Guardar Cambios</button>
                <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
