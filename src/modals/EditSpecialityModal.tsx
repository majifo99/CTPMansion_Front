import React from 'react';
import SpecialityForm from '../DashboardPages/SpecialityForm'; // Importa el formulario
import { Speciality } from '../types/Types';

interface EditSpecialityModalProps {
  show: boolean;
  speciality: Speciality | null;
  onClose: () => void;
  onSave: (speciality: Speciality) => void;
}

const EditSpecialityModal: React.FC<EditSpecialityModalProps> = ({ show, speciality, onClose, onSave }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {speciality ? 'Editar Especialidad' : 'Agregar Especialidad'}
        </h2>
        {/* Formulario de Especialidad */}
        <SpecialityForm speciality={speciality} onSave={onSave} />
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

export default EditSpecialityModal;
