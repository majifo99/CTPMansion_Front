import React from 'react';
import { Laboratory } from '../types/Types';

interface EditLaboratoryModalProps {
  show: boolean;
  laboratory?: Laboratory | null;
  onClose: () => void;
  onSave: (laboratory: Laboratory) => void;
}

const EditLaboratoryModal: React.FC<EditLaboratoryModalProps> = ({ show, laboratory, onClose, onSave }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Editar Laboratorio</h2>
        {/* Aquí iría el formulario para editar los detalles del laboratorio */}
        <button onClick={() => onSave(laboratory!)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditLaboratoryModal;
