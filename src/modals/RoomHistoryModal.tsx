import React, { useState } from 'react';
import { RequestStatus, RoomRequest } from '../types/RoomRequestType';
import RoomHistoryDetailsModal from './RoomHistoryDetailsModal';


interface RoomHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomRequests: RoomRequest[];
}

const RoomHistoryModal: React.FC<RoomHistoryModalProps> = ({ isOpen, onClose, roomRequests }) => {
  const [filter, setFilter] = useState<RequestStatus | 'All'>('All');
  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredRequests = roomRequests.filter(request => {
    const statusMatch = filter === 'All' 
      ? request.status === RequestStatus.Approved || request.status === RequestStatus.Rejected
      : request.status === filter;
    
    const nameMatch = `${request.managerName} ${request.managerLastName} ${request.managerLastName2}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    return statusMatch && nameMatch;
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Historial de Solicitudes de Sala</h2>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Buscar por gestor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
          />
        </div>

        <div className="flex justify-center mb-4">
          <select
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={filter}
            onChange={(e) => {
              const value = e.target.value;
              setFilter(value === 'All' ? 'All' : Number(value) as RequestStatus);
            }}
          >
            <option value={RequestStatus.Approved}>Aprobadas</option>
            <option value={RequestStatus.Rejected}>Rechazadas</option>
            <option value="All">Todas (Aprobadas + Rechazadas)</option>
          </select>
        </div>

        <div className="overflow-y-auto max-h-72">
          {filteredRequests.length === 0 ? (
            <p className="text-center text-gray-600">No hay solicitudes disponibles.</p>
          ) : (
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border text-gray-600 text-center">Gestor</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Fecha de Inicio</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Estado</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id_RoomRequest} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      {request.managerName} {request.managerLastName} {request.managerLastName2}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(request.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
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
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => setSelectedRequest(request)}
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &#x2715;
        </button>

        {selectedRequest && (
          <RoomHistoryDetailsModal
            isOpen={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
            request={selectedRequest}
          />
        )}
      </div>
    </div>
  );
};

export default RoomHistoryModal;