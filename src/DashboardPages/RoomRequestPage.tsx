import React, { useState, useEffect } from 'react';
import { useRooms } from '../hooks/useRoom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar CSS para las notificaciones
import { useRoomRequest } from '../hooks/useRoomRequest';
import { RoomRequest } from '../types/RoomRequestType'; // Importar tipo RoomRequest
import { Room } from '../types/Types'; // Importar tipo Room
import { jwtDecode } from 'jwt-decode';  // Necesario para decodificar el token

interface DecodedToken {
  nameid: string; // Este es el campo donde se almacena el userId en el token
}

// Función para obtener el userId del token
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');  // Asumiendo que el token está almacenado en el localStorage
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.nameid;
  }
  return null;
};

const RoomRequestCard: React.FC = () => {
  const { rooms, loading, error } = useRooms();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<RoomRequest, 'id_RoomRequest' | 'status'>>();
  const { isSubmitting, error: submitError, submitRoomRequest } = useRoomRequest();
  const [userId, setUserId] = useState<string | null>(null);  // Estado para almacenar el userId

  // Obtener el userId cuando el componente se monta
  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
  }, []);

  // Notificaciones de éxito o error
  const notifySuccess = () => toast.success('Solicitud de sala enviada exitosamente!');
  const notifyError = (message: string) => toast.error(message);

  // Envío del formulario
  const onSubmit = (data: Omit<RoomRequest, 'id_RoomRequest' | 'status'>) => {
    if (selectedRoom && userId) {
      // Agregar id_RoomRequest (siempre 0 para una nueva solicitud) y userId al payload
      submitRoomRequest({ ...data, roomId: selectedRoom.id_Room, id_RoomRequest: 0, userId }).then(() => {
        reset();  // Resetear el formulario tras envío exitoso
        notifySuccess();  // Mostrar notificación de éxito
        setSelectedRoom(null);  // Resetear la sala seleccionada
      }).catch(() => {
        notifyError('Error al enviar la solicitud.');  // Mostrar notificación de error
      });
    } else {
      notifyError('No se pudo obtener el usuario o la sala seleccionada.');
    }
  };

  // Función para renderizar campos de entrada con estilo consistente
  const renderInputField = (id: string, label: string, placeholder: string, validation: any, type = 'text') => (
    <div className="flex flex-col mb-4 px-2"> {/* Reducir el tamaño de cada campo y darle espacio lateral */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, validation)}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
      />
      {errors[id] && <p className="text-red-600 text-sm">{errors[id].message}</p>}
    </div>
  );

  // Componente Modal mejorado con diseño simétrico
  const Modal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl"> {/* Ampliar el ancho máximo */}
        <h3 className="text-lg font-semibold mb-4">Solicitud para {selectedRoom?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderInputField('managerName', 'Nombre del Encargado', 'Juan', { required: 'El nombre es obligatorio' })}
          {renderInputField('managerLastName', 'Primer Apellido', 'Pérez', { required: 'El primer apellido es obligatorio' })}
          {renderInputField('managerLastName2', 'Segundo Apellido', 'Rodríguez', { required: 'El segundo apellido es obligatorio' })}
          {renderInputField('course', 'Curso', 'Matemáticas', { required: 'El curso es obligatorio' })}
          {renderInputField('activityDescription', 'Descripción de la Actividad', 'Descripción', { required: 'La descripción es obligatoria' })}
          {renderInputField('needs', 'Necesidades', 'Equipos', { required: 'Las necesidades son obligatorias' })}
          {renderInputField('numberOfAttendees', 'Número de Asistentes', '5', { required: 'El número de asistentes es obligatorio', min: 1, valueAsNumber: true }, 'number')}
          {renderInputField('startDate', 'Fecha de Inicio', '', { required: 'La fecha de inicio es obligatoria' }, 'date')}
          {renderInputField('endDate', 'Fecha de Fin', '', { required: 'La fecha de fin es obligatoria' }, 'date')}
          {renderInputField('startTime', 'Hora de Inicio', '', { required: 'La hora de inicio es obligatoria' }, 'time')}
          {renderInputField('endTime', 'Hora de Fin', '', { required: 'La hora de fin es obligatoria' }, 'time')}
          
          <div className="w-full flex justify-end sm:col-span-2">
            <button
              type="submit"
              className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
        {submitError && <p className="text-red-600 mt-4">{submitError}</p>}
        <button onClick={onClose} className="mt-4 text-gray-600">Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className=" text-center text-2xl font-semibold mb-4">Solicitar Sala</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Cambia a un diseño de grid adaptable */}
        {loading && <p>Cargando salas...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {Array.isArray(rooms) && rooms.map(room => (
          <div
            key={room.id_Room}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col"
            onClick={() => setSelectedRoom(room)}
          >
            <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
            <p className="flex-grow">{room.description}</p>
            <p className="mt-2 text-sm">Capacidad: {room.capacity}</p>
            <p className="mt-2 text-sm">{room.isConferenceRoom ? 'Sala de Conferencias' : 'Sala Normal'}</p>
          </div>
        ))}
      </div>

      {selectedRoom && <Modal onClose={() => setSelectedRoom(null)} />}

      <ToastContainer /> {/* Contenedor para notificaciones */}
    </div>
  );
};

export default RoomRequestCard;
