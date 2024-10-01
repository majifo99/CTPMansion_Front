import React from 'react';
import RoomForm from '../DashboardPages/RoomForm'; // Importa el formulario de la sala
import { Room } from '../types/Types';

interface EditRoomModalProps {
  show: boolean;
  room: Room | null;
  onClose: () => void;
  onSave: (room: Room) => void;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({ show, room, onClose, onSave }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {room ? 'Editar Sala' : 'Agregar Sala'}
        </h2>
        <RoomForm room={room} onSave={onSave} />
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditRoomModal;
