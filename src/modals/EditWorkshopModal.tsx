import React from 'react';
import { Workshop, Speciality } from '../types/Types';
import WorkshopForm from '../DashboardPages/WorkshopForm';

interface EditWorkshopModalProps {
  show: boolean;
  workshop: Workshop | null;
  specialities: Speciality[];
  onClose: () => void;
  onSave: (workshop: Omit<Workshop, 'id'>) => void;
}

const EditWorkshopModal: React.FC<EditWorkshopModalProps> = ({ show, workshop, specialities, onClose, onSave }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{workshop ? 'Editar Taller' : 'Crear Nuevo Taller'}</h2>
        <WorkshopForm workshop={workshop} specialities={specialities} onSave={onSave} />
        <button
          onClick={onClose}
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EditWorkshopModal;
