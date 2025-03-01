import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Importa el contexto de autenticación
import { useRoomsAndRequests } from '../../hooks/useRooms';
import { useRoomRequest } from '../../hooks/useRoomRequest';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

type RoomRequestFormField = {
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

const RoomRequestPage: React.FC = () => {
  const { rooms, roomRequests, loading, error, fetchRoomRequestsData } = useRoomsAndRequests();
  const { user } = useAuth(); // Obtiene el usuario actual desde el contexto de autenticación
  const [selectedRoom, setSelectedRoom] = useState<{ id_Room: number; name: string; capacity: number; url_Image: string; description: string } | null>(null);
  const [activeModal, setActiveModal] = useState<"form" | "calendar" | null>(null);
  const { register, handleSubmit, reset } = useForm<RoomRequestFormField>();
  const { isSubmitting, submitRoomRequest } = useRoomRequest();

  const notifySuccess = () => toast.success('Solicitud de sala enviada exitosamente!');
  const notifyError = (message: string) => toast.error(message);

  const onSubmit = async (data: RoomRequestFormField) => {
    if (!selectedRoom) {
      notifyError('No se pudo obtener la sala seleccionada.');
      return;
    }

    if (!user) {
      notifyError('Usuario no autenticado');
      return;
    }

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

    const roomRequest = {
      ...data,
      roomId: selectedRoom.id_Room,
      userId: user.id.toString(),
      status: 0, // Estado pendiente
    };

    try {
      await submitRoomRequest(roomRequest);
      reset();
      notifySuccess();
      setSelectedRoom(null);
      setActiveModal(null); // Cierra el formulario después de enviar
      fetchRoomRequestsData();
    } catch {
      notifyError('Error al enviar la solicitud.');
    }
  };

  const renderInputField = (
    id: keyof RoomRequestFormField,
    label: string,
    placeholder: string,
    type = 'text'
  ) => (
    <div className="flex flex-col mb-4 w-full md:w-1/2 px-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, { required: `${label} es obligatorio` })}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
      />
    </div>
  );

  const renderDropdownField = (
    id: keyof RoomRequestFormField,
    label: string,
    options: number[]
  ) => (
    <div className="flex flex-col mb-4 w-full md:w-1/2 px-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">{label}</label>
      <select
        id={id}
        {...register(id, { required: 'Este campo es obligatorio' })}
        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  const Modal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-2xl font-bold">&times;</button>
        <h3 className="text-lg font-semibold mb-4 text-center">Solicitud para {selectedRoom?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap mt-4">
          <div className="w-full flex flex-wrap">
            {renderInputField('managerName', 'Nombre del Encargado', 'Juan')}
            {renderInputField('managerLastName', 'Primer Apellido', 'Pérez')}
          </div>
          <div className="w-full flex flex-wrap">
            {renderInputField('managerLastName2', 'Segundo Apellido', 'Rodríguez')}
            {renderInputField('course', 'Curso', 'Matemáticas')}
          </div>
          <div className="w-full flex flex-wrap">
            {renderInputField('activityDescription', 'Descripción de la Actividad', 'Clase de laboratorio')}
            {renderDropdownField(
              'numberOfAttendees',
              'Número de Asistentes',
              Array.from({ length: selectedRoom?.capacity || 10 }, (_, i) => i + 1)
            )}
          </div>
          <div className="w-full flex flex-wrap">
            {renderInputField('startDate', 'Fecha de Inicio', '', 'date')}
            {renderInputField('startTime', 'Hora de Inicio', '', 'time')}
          </div>
          <div className="w-full flex flex-wrap">
            {renderInputField('endDate', 'Fecha de Fin', '', 'date')}
            {renderInputField('endTime', 'Hora de Fin', '', 'time')}
          </div>
          <div className="w-full px-2 mb-4">
            <label htmlFor="needs" className="block text-sm font-medium text-gray-900">Necesidades</label>
            <textarea
              id="needs"
              placeholder="Equipo de sonido, proyector, etc."
              {...register('needs')}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2 h-24"
            ></textarea>
          </div>
          <div className="w-full px-2 flex justify-end">
            <button
              type="submit"
              className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const events = roomRequests.filter(request => request.roomId === selectedRoom?.id_Room && request.status === 1).map(request => ({
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
        {Array.isArray(rooms) &&
          rooms
            .filter(room => room.isActive) // Filtra solo las salas activas
            .map((room) => (
              <div
                key={room.id_Room}
                className="p-4 border border-gray-300 rounded-lg shadow-md flex flex-col bg-white hover:shadow-lg transition-shadow duration-200"
              >
                {/* Imagen de la sala */}
                <img
                  src={room.url_Image}
                  alt={room.name}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
                <p className="flex-grow text-sm text-gray-700 mb-2">{room.description}</p>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Capacidad de asistentes:</strong> {room.capacity}
                </p>
                <div className="mt-4 flex flex-col space-y-2">
                  <button
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                    onClick={() => {
                      setSelectedRoom(room);
                      setActiveModal("calendar");
                    }}
                  >
                    Ver Disponibilidad
                  </button>
                  <button
                    className="w-full text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
                    onClick={() => {
                      setSelectedRoom(room);
                      setActiveModal("form");
                    }}
                  >
                    Reservar Sala
                  </button>
                </div>
              </div>
            ))}
      </div>

      {activeModal === "calendar" && selectedRoom && (
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
              onClick={() => setActiveModal(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {activeModal === "form" && selectedRoom && <Modal onClose={() => setActiveModal(null)} />}

      <ToastContainer />
    </div>
  );
};

export default RoomRequestPage;