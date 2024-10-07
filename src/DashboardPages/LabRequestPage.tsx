import React, { useState, useEffect } from 'react';
import { useLabs } from '../hooks/useLabs';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLabRequest } from '../hooks/useLabRequest';
import { Laboratory } from '../types/Types';
import { jwtDecode } from 'jwt-decode';
import { LabRequest } from '../types/LaboratoryRequestType';

// Interfaz para el token decodificado
interface DecodedToken {
  nameid: string;
}

// Función para obtener el userId del token
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.nameid;
  }
  return null;
};

// Función auxiliar para formatear fecha y hora
const formatDateTime = (date: Date): string => date.toISOString().split('.')[0];
const formatTime = (time: string): string => (time.includes(":") ? time : `${time}:00`);

const LabRequestPage: React.FC = () => {
  const { labs, loading, error } = useLabs();
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<LabRequest, 'id_LabRequest' | 'status'>>();
  const { isSubmitting, error: submitError, submitLabRequest } = useLabRequest();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
  }, []);

  const notifySuccess = () => toast.success('Solicitud de laboratorio enviada exitosamente!');
  const notifyError = (message: string) => toast.error(message);

  const onSubmit = (data: Omit<LabRequest, 'id_LabRequest' | 'status'>) => {
    if (selectedLab && userId) {
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

      submitLabRequest(labRequest)
        .then(() => {
          reset();
          notifySuccess();
          setSelectedLab(null);
        })
        .catch(() => {
          notifyError('Error al enviar la solicitud.');
        });
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
      {errors[id] && <p className="text-red-600 text-sm">{errors[id].message}</p>}
    </div>
  );

  const Modal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Solicitud para {selectedLab?.name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap space-y-4 mt-4">
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
        {submitError && <p className="text-red-600 mt-4">{submitError}</p>}
        <button onClick={onClose} className="mt-4 text-gray-600">Cerrar</button>
      </div>
    </div>
  );

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
            onClick={() => setSelectedLab(lab)}
          >
            <h3 className="font-semibold text-lg mb-2">{lab.name}</h3>
            <p className="flex-grow">{lab.description}</p>
            <p className="mt-2 text-sm">Capacidad: {lab.capacity}</p>
          </div>
        ))}
      </div>

      {selectedLab && <Modal onClose={() => setSelectedLab(null)} />}

      <ToastContainer />
    </div>
  );
};

export default LabRequestPage;
