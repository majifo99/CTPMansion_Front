import React from 'react';
import { FaUser, FaEnvelope, FaPencilAlt, FaLock } from 'react-icons/fa';

interface ViewProfileProps {
  user: any;
  onEdit: () => void;
  onChangePassword: () => void;
}

// Función para formatear fecha a formato legible
const formatDisplayDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const ViewProfile: React.FC<ViewProfileProps> = ({ user, onEdit, onChangePassword }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Cabecera con fondo de color - Actualizado para coincidir con EditProfile */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 h-32 flex items-center px-6">
        {/* Imagen de perfil (superpuesta sobre el fondo) */}
        <div className="relative">
          <img
            src={user?.profilePicture || "https://source.unsplash.com/MP0IUfwrn0A"}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-lg border-4 border-white object-cover"
          />
        </div>
        
        <div className="ml-6 text-white">
          <h1 className="text-xl font-semibold">Perfil de Usuario</h1>
          <p className="text-white text-opacity-80 text-sm">Información personal y profesional</p>
        </div>
      </div>
      
      <div className="p-6">
        {/* Información principal */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{user?.name} {user?.lastName}</h1>
            <p className="text-gray-600 break-words text-sm sm:text-base flex items-center">
              <FaEnvelope className="mr-2 text-blue-600" />
              {user?.email}
            </p>
          </div>
          
          {/* Botones de acción - Actualizado para usar el color azul estándar */}
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button 
              onClick={onEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
            >
              <FaPencilAlt className="mr-2" /> Editar Perfil
            </button>
            <button 
              onClick={onChangePassword}
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-4 rounded-md flex items-center"
            >
              <FaLock className="mr-2" /> Cambiar Contraseña
            </button>
          </div>
        </div>
        
        {/* Información en tarjetas - Actualizado con colores consistentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "📞 Segundo Apellido", value: user?.lastName2 },
            { label: "🏛️ Ingreso a la Institución", value: formatDisplayDate(user?.institutionJoinDate?.toString() || '') },
            { label: "📞 Teléfono", value: user?.phoneNumber },
            { label: "💼 Ingreso al MEP", value: formatDisplayDate(user?.workJoinDate?.toString() || '') },
            { label: "🚨 Contacto de Emergencia", value: user?.emergencyPhoneNumber },
            { label: "📍 Dirección", value: user?.address },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded-lg flex flex-col sm:flex-row items-start sm:items-center space-x-3">
              <span className="text-blue-600 text-xl">{item.label.split(" ")[0]}</span>
              <div>
                <p className="text-gray-700">
                  <strong>{item.label.split(" ").slice(1).join(" ")}:</strong> {item.value || 'No especificado'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;