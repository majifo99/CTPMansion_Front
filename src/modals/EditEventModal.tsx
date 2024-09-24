import React from 'react';
import EventForm from '../DashboardPages/EventForm'; // Importa el formulario
import { Event } from '../types/Types';

interface EditEventModalProps {
  show: boolean;
  event: Event | null;
  onClose: () => void;
  onSave: (event: Event) => void;
}

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Convierte a 'YYYY-MM-DDTHH:mm'
};

const EditEventModal: React.FC<EditEventModalProps> = ({ show, event, onClose, onSave }) => {
  if (!show) return null;

  // Si estamos editando un evento, formateamos la fecha correctamente.
  const eventWithFormattedDate = event ? { ...event, date: formatDateForInput(event.date) } : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md max-w-lg w-full shadow-lg"> {/* Cambié w-96 por max-w-lg y w-full */}
        <h2 className="text-xl text-black font-semibold mb-4">{event ? 'Editar Evento' : 'Agregar Evento'}</h2>
        {/* Pasamos el evento con la fecha formateada al formulario */}
        <EventForm event={eventWithFormattedDate} onSave={onSave} />
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditEventModal;
