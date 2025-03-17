// src/modals/LabHistoryDetailsModal.tsx
import React from 'react';
import { LabRequest, RequestStatus } from '../types/LaboratoryRequestType';

interface LabHistoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: LabRequest;
}

const LabHistoryDetailsModal: React.FC<LabHistoryDetailsModalProps> = ({ isOpen, onClose, request }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Detalles de la Solicitud</h2>
          <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div>
            <p className="text-lg">
              <strong className="text-gray-600">Gestor:</strong> {request.managerName} {request.managerLastName} {request.managerLastName2}
            </p>
            <p className="text-lg mt-2">
              <strong className="text-gray-600">Curso:</strong> {request.course}
            </p>
            <p className="text-lg mt-4">
              <strong className="text-gray-600">Descripción de la actividad:</strong> {request.activityDescription}
            </p>
            <p className="text-lg mt-4">
              <strong className="text-gray-600">Necesidades:</strong> {request.needs}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-lg">
              <strong className="text-gray-600">Fecha de inicio:</strong> {new Date(request.startDate).toLocaleDateString()}
            </p>
            <p className="text-lg mt-4">
              <strong className="text-gray-600">Fecha de fin:</strong> {new Date(request.endDate).toLocaleDateString()}
            </p>
            <p className="text-lg mt-4">
              <strong className="text-gray-600">Hora de inicio:</strong> {request.startTime}
            </p>
            <p className="text-lg mt-4">
              <strong className="text-gray-600">Hora de fin:</strong> {request.endTime}
            </p>
            <p className="text-lg mt-4">
              <strong className="text-gray-600">Estado:</strong>{' '}
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                  request.status === RequestStatus.Approved
                    ? 'bg-green-500'
                    : request.status === RequestStatus.Rejected
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }`}
              >
                {request.status === RequestStatus.Approved
                  ? 'Aprobada'
                  : request.status === RequestStatus.Rejected
                  ? 'Rechazada'
                  : 'Pendiente'}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Información Adicional:</h3>
          <div className="overflow-y-auto max-h-48">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-gray-600 font-medium text-center">Laboratorio</th>
                  <th className="px-4 py-3 text-gray-600 font-medium text-center">Asistentes</th>
                  <th className="px-4 py-3 text-gray-600 font-medium text-center">Capacidad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b text-center">{request.labName || 'Desconocido'}</td>
                  <td className="px-4 py-3 border-b text-center">{request.numberOfAttendees}</td>
                  <td className="px-4 py-3 border-b text-center">{request.labCapacity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabHistoryDetailsModal;