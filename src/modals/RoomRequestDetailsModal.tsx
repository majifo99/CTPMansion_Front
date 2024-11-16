// src/modals/RoomRequestDetailsModal.tsx
import React from 'react';
import { RoomRequest, RequestStatus } from '../types/RoomRequestType';
import { motion } from 'framer-motion';

interface RoomRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: RoomRequest;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const RoomRequestDetailsModal: React.FC<RoomRequestDetailsModalProps> = ({
  isOpen,
  onClose,
  request,
  onApprove,
  onReject,
}) => {
  if (!isOpen) return null;

  const handleApprove = async () => {
    await onApprove(request.id_RoomRequest);
    onClose();
  };

  const handleReject = async () => {
    await onReject(request.id_RoomRequest);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Detalles de la Solicitud</h2>
          <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div>
            <p className="text-lg"><strong>Nombre del Encargado:</strong> {request.managerName} {request.managerLastName}</p>
            <p className="text-lg"><strong>Curso:</strong> {request.course}</p>
            <p className="text-lg"><strong>Descripción:</strong> {request.activityDescription}</p>
            <p className="text-lg"><strong>Necesidades:</strong> {request.needs}</p>
            <p className="text-lg"><strong>Número de Asistentes:</strong> {request.numberOfAttendees}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-lg"><strong>Fecha:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
            <p className="text-lg"><strong>Hora:</strong> {request.startTime} - {request.endTime}</p>
            <p className="text-lg"><strong>Estado:</strong> 
              <span className={`ml-2 inline-block px-3 py-1 rounded-full text-white ${request.status === RequestStatus.Approved ? 'bg-green-500' : request.status === RequestStatus.Rejected ? 'bg-red-500' : 'bg-yellow-500'}`}>
                {request.status === RequestStatus.Approved ? 'Aprobada' : request.status === RequestStatus.Rejected ? 'Rechazada' : 'Pendiente'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleApprove}>Aprobar</button>
          <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={handleReject}>Rechazar</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoomRequestDetailsModal;
