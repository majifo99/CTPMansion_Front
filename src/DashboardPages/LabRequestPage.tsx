import React, { useState, useEffect } from 'react';
import { useLabsAndRequests } from '../hooks/useLabs';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLabRequest } from '../hooks/useLabRequest';
import { Laboratory } from '../types/Types';
import { jwtDecode } from 'jwt-decode';
import { LabRequest } from '../types/LaboratoryRequestType';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface DecodedToken {
  nameid: string;
}

const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.nameid;
  }
  return null;
};

const formatDateTime = (date: Date): string => date.toISOString().split('.')[0];
const formatTime = (time: string): string => (time.includes(":") ? time : `${time}:00`);

const LabRequestPage: React.FC = () => {
  const { labs, labRequests, loading, error, fetchLabRequestsData } = useLabsAndRequests();
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
  const [activeModal, setActiveModal] = useState<"form" | "calendar" | null>(null); // Define qué componente está activo
  const { register, handleSubmit, reset } = useForm<Omit<LabRequest, 'id_LabRequest' | 'status'>>();
  const { isSubmitting, submitLabRequest } = useLabRequest();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
  }, []);

  const notifySuccess = () => toast.success('Solicitud de laboratorio enviada exitosamente!');
  const notifyError = (message: string) => toast.error(message);

  const onSubmit = async (data: Omit<LabRequest, 'id_LabRequest' | 'status'>) => {
    if (selectedLab && userId) {
      const startDateTime = moment(`${data.startDate} ${data.startTime}`, "YYYY-MM-DD HH:mm");
      const endDateTime = moment(`${data.endDate} ${data.endTime}`, "YYYY-MM-DD HH:mm");

      // Validaciones para fechas y horarios
      if (startDateTime.day() === 6 || startDateTime.day() === 0) {
        notifyError("No se permiten reservas los fines de semana (sábado y domingo).");
        return;
      }

      if (startDateTime.isBefore(moment())) {
        notifyError("La fecha de inicio no puede ser anterior a la fecha actual.");
        return;
      }
      if (startDateTime.hour() < 6 || startDateTime.hour() >= 16 || (startDateTime.hour() === 16 && startDateTime.minute() > 20)) {
        notifyError("La hora de inicio debe estar dentro del horario de laboratorio (6:00 am - 4:20 pm).");
        return;
      }
      if (endDateTime.hour() < 6 || endDateTime.hour() >= 16 || (endDateTime.hour() === 16 && endDateTime.minute() > 20)) {
        notifyError("La hora de fin debe estar dentro del horario de laboratorio (6:00 am - 4:20 pm).");
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

      const labRequest = {
        ...data,
        id_LabRequest: 0,
        userId: parseInt(userId, 10),
        laboratoryId: selectedLab.id_Laboratory,
        status: 0,
        startDate: formatDateTime(new Date(data.startDate)),
        endDate: formatDateTime(new Date(data.endDate)),
        startTime: formatTime(data.startTime),
        endTime: formatTime(data.endTime)
      };

      try {
        await submitLabRequest(labRequest);
        reset();
        notifySuccess();
        setSelectedLab(null);
        setActiveModal(null); // Cierra el formulario después de enviar
        fetchLabRequestsData();
      } catch {
        notifyError('Error al enviar la solicitud.');
      }
    } else {
      notifyError('No se pudo obtener el usuario o el laboratorio seleccionado.');
    }
  };

  const renderInputField = (id: string, label: string, placeholder: string, validation: any, type = 'text') => (
    <div className="flex flex-col mb-4 w-1/2 px-2">
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

  const renderDropdownField = (id: string, label: string, options: number[]) => (
    <div className="flex flex-col mb-4 w-1/2 px-2">
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
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-3xl font-bold">&times;</button>
        <h3 className="text-lg font-semibold mb-4">Solicitud para {selectedLab?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap space-y-4 mt-4">
          {renderInputField('managerName', 'Nombre del Encargado', 'Juan', { required: 'El nombre es obligatorio' })}
          {renderInputField('managerLastName', 'Primer Apellido', 'Pérez', { required: 'El primer apellido es obligatorio' })}
          {renderInputField('managerLastName2', 'Segundo Apellido', 'Rodríguez', { required: 'El segundo apellido es obligatorio' })}
          {renderInputField('course', 'Curso', 'Matemáticas', { required: 'El curso es obligatorio' })}
          {renderInputField('activityDescription', 'Descripción de la Actividad', 'Descripción', { required: 'La descripción es obligatoria' })}
          {renderInputField('needs', 'Necesidades', 'Equipos', { required: 'Las necesidades son obligatorias' })}

          {selectedLab && renderDropdownField(
            'numberOfAttendees',
            'Número de Asistentes',
            Array.from({ length: selectedLab.capacity }, (_, i) => i + 1)
          )}
          
          {renderInputField('startDate', 'Fecha de Inicio', '', { required: 'La fecha de inicio es obligatoria' }, 'date')}
          {renderInputField('endDate', 'Fecha de Fin', '', { required: 'La fecha de fin es obligatoria' }, 'date')}
          {renderInputField('startTime', 'Hora de Inicio', '', { required: 'La hora de inicio es obligatoria' }, 'time')}
          {renderInputField('endTime', 'Hora de Fin', '', { required: 'La hora de fin es obligatoria' }, 'time')}
          
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

  const approvedRequests = labRequests.filter(
    (request) => request.laboratoryId === selectedLab?.id_Laboratory && request.status === 1
  );

  const events = approvedRequests.map((request) => {
    const start = moment(`${request.startDate} ${request.startTime}`, "YYYY-MM-DD HH:mm").toDate();
    const end = moment(`${request.endDate} ${request.endTime}`, "YYYY-MM-DD HH:mm").toDate();

    return {
      title: `Reservado: ${request.managerName}`,
      start,
      end,
    };
  });

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-4">Solicitar Laboratorio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && <p>Cargando laboratorios...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {Array.isArray(labs) && labs.map(lab => (
          <div
            key={lab.id_Laboratory}
            className="p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 flex flex-col"
          >
            <h3 className="font-semibold text-lg mb-2">{lab.name}</h3>
            <p className="flex-grow">{lab.description}</p>
            <p className="mt-2 text-sm">Capacidad: {lab.capacity}</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
              onClick={() => {
                setSelectedLab(lab);
                setActiveModal("calendar");
              }}
            >
              Ver Disponibilidad
            </button>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              onClick={() => {
                setSelectedLab(lab);
                setActiveModal("form");
              }}
            >
              Reservar Laboratorio
            </button>
          </div>
        ))}
      </div>

      {activeModal === "calendar" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Disponibilidad del Laboratorio</h2>
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

      {activeModal === "form" && <Modal onClose={() => setActiveModal(null)} />}

      <ToastContainer />
    </div>
  );
};

export default LabRequestPage;