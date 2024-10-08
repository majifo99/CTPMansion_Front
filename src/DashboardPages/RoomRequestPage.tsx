import React, { useState, useEffect } from 'react';
import { useRoomsAndRequests } from '../hooks/useRooms';
import { useRoomRequest } from '../hooks/useRoomRequest';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RoomRequest, RequestStatus } from '../types/RoomRequestType';
import { Room } from '../types/Types';
import {jwtDecode} from 'jwt-decode';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface DecodedToken {
  nameid: string;
}

// Función para extraer userId desde el token JWT
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.nameid;
  }
  return null;
};

const RoomRequestCard: React.FC = () => {
  const { rooms, roomRequests, loading, error, fetchRoomRequestsData } = useRoomsAndRequests();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<RoomRequest, 'id_RoomRequest' | 'status' | 'roomId'>>();
  const { isSubmitting, submitRoomRequest, error: submitError } = useRoomRequest();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedRoomForRequest, setSelectedRoomForRequest] = useState<Room | null>(null);
  const [selectedRoomForCalendar, setSelectedRoomForCalendar] = useState<Room | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDateDetails, setSelectedDateDetails] = useState<RoomRequest[] | null>(null);

  // Obtener el userId al cargar el componente
  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
  }, []);

  // Notificaciones de éxito y error
  const notifySuccess = () => toast.success('Solicitud de sala enviada exitosamente!');
  const notifyError = (message: string) => toast.error(message);

  const onSubmit = (data: Omit<RoomRequest, 'id_RoomRequest' | 'status' | 'roomId'>) => {
    if (selectedRoomForRequest && userId) {
      const requestPayload = { ...data, roomId: selectedRoomForRequest.id_Room, userId };
      submitRoomRequest(requestPayload)
        .then(() => {
          reset();
          notifySuccess();
          setSelectedRoomForRequest(null);
          fetchRoomRequestsData(); // Recargar las solicitudes de sala
        })
        .catch(() => {
          notifyError('Error al enviar la solicitud.');
        });
    } else {
      notifyError('No se pudo obtener el usuario o la sala seleccionada.');
    }
  };

  // Función para renderizar los campos de entrada
  const renderInputField = (id: string, label: string, placeholder: string, validation: any, type = 'text') => (
    <div className="flex flex-col mb-4 px-2">
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

  // Modal de solicitud de sala
  const Modal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">Solicitud para {selectedRoomForRequest?.name}</h3>
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

  // Crear un conjunto de fechas de solicitudes aprobadas para el calendario
  const approvedRequests = roomRequests.filter(
    (request) => request.roomId === selectedRoomForCalendar?.id_Room && request.status === RequestStatus.Approved
  );

  const approvedDates = approvedRequests.map((request) => new Date(request.startDate)); // Solo marcamos el día de inicio

  // Función para destacar y manejar clic en los días con reservas
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return approvedDates.some((approvedDate) => approvedDate.toDateString() === date.toDateString())
        ? 'highlight-day'
        : null;
    }
  };

  const handleDateClick = (date: Date) => {
    const details = approvedRequests.filter(
      (request) => new Date(request.startDate).toDateString() === date.toDateString()
    );
    setSelectedDateDetails(details.length > 0 ? details : null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-4">Solicitar Sala</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Cargando salas...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {Array.isArray(rooms) && rooms.map(room => (
          <div
            key={room.id_Room}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col"
          >
            <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
            <p className="flex-grow">{room.description}</p>
            <p className="mt-2 text-sm">Capacidad: {room.capacity}</p>
            <p className="mt-2 text-sm">{room.isConferenceRoom ? 'Sala de Conferencias' : 'Sala Normal'}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setSelectedRoomForCalendar(room);
                setIsCalendarOpen(true);
              }}
            >
              Ver Disponibilidad
            </button>
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setSelectedRoomForRequest(room)}
            >
              Solicitar Sala
            </button>
          </div>
        ))}
      </div>

      {/* Modal de calendario */}
      {isCalendarOpen && selectedRoomForCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Disponibilidad de la Sala</h2>
            <Calendar
              tileClassName={tileClassName}
              onClickDay={handleDateClick}
            />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => setIsCalendarOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de detalles del día */}
      {selectedDateDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Detalles de Reservas</h2>
            {selectedDateDetails.map((detail, index) => (
              <div key={index} className="mb-2">
                <p><strong>Reservado por:</strong> {detail.managerName} {detail.managerLastName}</p>
                <p><strong>Hora:</strong> {detail.startTime} - {detail.endTime}</p>
                <p><strong>Curso:</strong> {detail.course}</p>
                <p><strong>Descripción:</strong> {detail.activityDescription}</p>
              </div>
            ))}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => setSelectedDateDetails(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de solicitud de sala */}
      {selectedRoomForRequest && <Modal onClose={() => setSelectedRoomForRequest(null)} />}
      
      <ToastContainer />

      {/* Estilos adicionales */}
      <style>
        {`
          .highlight-day {
            background-color: #4CAF50;
            color: white;
            border-radius: 50%;
            transition: transform 0.2s;
          }
          .highlight-day:hover {
            transform: scale(1.1);
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default RoomRequestCard;
