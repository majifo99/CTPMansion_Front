// src/modals/EditUDPModal.tsx
import React, { useState, useEffect } from 'react';
import { UDP } from '../types/Types';

interface EditUDPModalProps {
  show: boolean;
  udp: UDP | null;
  onClose: () => void;
  onSave: (udp: UDP) => void;
}

const EditUDPModal: React.FC<EditUDPModalProps> = ({ show, udp, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState(0);

  // Rellena los campos al editar o los limpia al crear una nueva UDP
  useEffect(() => {
    if (udp) {
      setTitle(udp.title);
      setDescription(udp.description);
      setArea(udp.area);
      setBalance(udp.balance);
      setUserId(udp.userId);
    } else {
      setTitle('');
      setDescription('');
      setArea('');
      setBalance(0);
      setUserId(0);
    }
  }, [udp]);

  const handleSubmit = () => {
    const udpData: UDP = {
      id_UDP: udp ? udp.id_UDP : 0, // Al editar, usar el id actual; al crear, se ignora este valor
      title,
      description,
      area,
      balance,
      userId,
    };
    onSave(udpData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl mb-4">{udp ? 'Editar UDP' : 'Agregar UDP'}</h2>
        <input
          className="border p-2 w-full mb-4"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          placeholder="Área"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full mb-4"
          placeholder="Balance"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
        />
        <input
          type="number"
          className="border p-2 w-full mb-4"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditUDPModal;
