import React from 'react';
import LaboratoryForm from '../DashboardPages/LaboratoryForm'; // Importa el formulario
import { Laboratory } from '../types/LaboratoryRequestType';


interface EditLaboratoryModalProps {
  show: boolean;
  laboratory: Laboratory | null;
  onClose: () => void;
  onSave: (laboratory: Laboratory) => void;
}

const EditLaboratoryModal: React.FC<EditLaboratoryModalProps> = ({ show, laboratory, onClose, onSave }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md max-w-lg w-full shadow-lg">
        <h2 className="text-xl text-black font-semibold mb-4">{laboratory ? 'Editar Laboratorio' : 'Agregar Laboratorio'}</h2>
        <LaboratoryForm laboratory={laboratory} onSave={onSave} />
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

export default EditLaboratoryModal;