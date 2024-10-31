import React, { useState, useEffect } from 'react';
import { useRoomsAndRequests } from '../hooks/useRooms';
import { useRoomRequest } from '../hooks/useRoomRequest';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RoomRequest, RequestStatus } from '../types/RoomRequestType';
import { Room } from '../types/Types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {jwtDecode} from 'jwt-decode';

const localizer = momentLocalizer(moment);

interface DecodedToken {
  nameid: string;
}

// Define el tipo específico para el formulario
type RoomRequestForm = {
  managerName: string;
  managerLastName: string;
  managerLastName2: string;
  course: string;
  activityDescription: string;
  numberOfAttendees: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  needs: string;
};

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
  const { register, handleSubmit, reset } = useForm<RoomRequestForm>();
  const { isSubmitting, submitRoomRequest } = useRoomRequest();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedRoomForRequest, setSelectedRoomForRequest] = useState<Room | null>(null);
  const [selectedRoomForCalendar, setSelectedRoomForCalendar] = useState<Room | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    setUserId(getUserIdFromToken());
  }, []);

  const notifySuccess = () => toast.success('Solicitud de sala enviada exitosamente!');
  const notifyError = (message: string) => toast.error(message);

  const onSubmit = async (data: RoomRequestForm) => {
    if (selectedRoomForRequest && userId) {
      const startDateTime = moment(`${data.startDate} ${data.startTime}`, "YYYY-MM-DD HH:mm");
      const endDateTime = moment(`${data.endDate} ${data.endTime}`, "YYYY-MM-DD HH:mm");

      // Validaciones
      if (startDateTime.day() === 6 || startDateTime.day() === 0) {
        notifyError("No se permiten reservas los fines de semana (sábado y domingo).");
        return;
      }
      if (startDateTime.isBefore(moment())) {
        notifyError("La fecha de inicio no puede ser anterior a la fecha actual.");
        return;
      }
      if (startDateTime.isSameOrAfter(endDateTime)) {
        notifyError("La hora de inicio debe ser anterior a la hora de fin.");
        return;
      }

      const duration = moment.duration(endDateTime.diff(startDateTime));
      if (duration.asMinutes() < 30) {
        notifyError("La duración mínima de la solicitud es de 30 minutos.");
        return;
      }
      if (duration.asHours() > 8) {
        notifyError("La duración máxima de la solicitud es de 8 horas.");
        return;
      }

      // Construcción del payload de la solicitud
      const requestPayload: Omit<RoomRequest, 'id_RoomRequest'> = {
        ...data,
        roomId: selectedRoomForRequest.id_Room,
        userId,
        status: RequestStatus.Pending
      };
      
      try {
        await submitRoomRequest(requestPayload);
        reset();
        notifySuccess();
        setSelectedRoomForRequest(null);
        fetchRoomRequestsData();
      } catch (error) {
        notifyError('Error al enviar la solicitud.');
      }
    } else {
      notifyError('No se pudo obtener el usuario o la sala seleccionada.');
    }
  };

  const renderInputField = (id: keyof RoomRequestForm, label: string, placeholder: string, validation?: object, type: string = 'text') => (
    <div className="flex flex-col mb-2 px-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, validation)}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
      />
    </div>
  );

  const renderDropdownField = (id: keyof RoomRequestForm, label: string, options: number[]) => (
    <div className="flex flex-col mb-2 px-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
      <select
        id={id}
        {...register(id, { required: 'Este campo es obligatorio' })}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-3xl font-bold">&times;</button>
        <h3 className="text-lg font-semibold mb-4 text-center">Solicitud para {selectedRoomForRequest?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderInputField('managerName', 'Nombre del Encargado', 'Juan', { required: 'El nombre es obligatorio' })}
          {renderInputField('managerLastName', 'Primer Apellido', 'Pérez', { required: 'El primer apellido es obligatorio' })}
          {renderInputField('managerLastName2', 'Segundo Apellido', 'Rodríguez', { required: 'El segundo apellido es obligatorio' })}
          {renderInputField('course', 'Curso', 'Literatura', { required: 'El curso es obligatorio' })}

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderInputField('activityDescription', 'Descripción de la Actividad', 'Clase de música', { required: 'La descripción es obligatoria' })}
            {selectedRoomForRequest && renderDropdownField(
              'numberOfAttendees',
              'Número de Asistentes',
              Array.from({ length: selectedRoomForRequest.capacity }, (_, i) => i + 1)
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:col-span-2">
            {renderInputField('startDate', 'Fecha de Inicio', '', { required: 'La fecha de inicio es obligatoria' }, 'date')}
            {renderInputField('startTime', 'Hora de Inicio', '', { required: 'La hora de inicio es obligatoria' }, 'time')}
          </div>
          <div className="grid grid-cols-2 gap-4 sm:col-span-2">
            {renderInputField('endDate', 'Fecha de Fin', '', { required: 'La fecha de fin es obligatoria' }, 'date')}
            {renderInputField('endTime', 'Hora de Fin', '', { required: 'La hora de fin es obligatoria' }, 'time')}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="needs" className="block text-sm text-center font-medium text-gray-900">Necesidades</label>
            <textarea
              id="needs"
              {...register('needs', { required: 'Las necesidades son obligatorias' })}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
              placeholder="Equipo de sonido, proyector, etc."
              rows={4}
            />
          </div>

          <div className="w-full flex justify-end sm:col-span-2">
            <button
              type="submit"
              className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const approvedRequests = roomRequests.filter(
    (request) => request.roomId === selectedRoomForCalendar?.id_Room && request.status === RequestStatus.Approved
  );

  const events = approvedRequests.map((request) => ({
    title: `Reservado: ${request.managerName}`,
    start: moment(`${request.startDate} ${request.startTime}`, "YYYY-MM-DD HH:mm").toDate(),
    end: moment(`${request.endDate} ${request.endTime}`, "YYYY-MM-DD HH:mm").toDate(),
  }));

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-4">Solicitar Sala</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Cargando salas...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {rooms.map((room) => (
          <div
            key={room.id_Room}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col"
          >
            <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
            <p className="flex-grow">{room.description}</p>
            <p className="mt-2 text-sm">Capacidad: {room.capacity}</p>
            <button
              className="mt-2 bg-blue-100 text-blue-700 px-4 py-2 rounded border hover:bg-blue-200 hover:text-blue-800"
              onClick={() => {
                setSelectedRoomForCalendar(room);
                setIsCalendarOpen(true);
              }}
            >
              Ver Disponibilidad
            </button>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              onClick={() => setSelectedRoomForRequest(room)}
            >
              Solicitar Sala
            </button>
          </div>
        ))}
      </div>

      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Disponibilidad de la Sala</h2>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              className="border-2 border-gray-300 rounded-lg shadow-lg"
            />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
              onClick={() => setIsCalendarOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {selectedRoomForRequest && <Modal onClose={() => setSelectedRoomForRequest(null)} />}
      <ToastContainer />
    </div>
  );
};

export default RoomRequestCard;
