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

  // Formateamos la fecha si estamos editando un evento.
  const eventWithFormattedDate = event ? { ...event, date: formatDateForInput(event.date) } : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-3/4 max-w-lg p-6 relative shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-6">
          {event ? 'Editar Evento' : 'Agregar Evento'}
        </h2>
        
        {/* Formulario de evento con los datos correspondientes */}
        <EventForm event={eventWithFormattedDate} onSave={onSave} onCancel={onClose} />
      </div>
    </div>
  );
};

export default EditEventModal;
