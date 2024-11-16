// src/modals/RoomRequestHistoryModal.tsx
import React, { useState, useEffect } from 'react';
import { RoomRequest } from '../types/RoomRequestType';
import { motion } from 'framer-motion';
import RoomRequestHistoryDetailsModal from './RoomRequestHistoryDetailsModal';

interface RoomRequestHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomRequests: RoomRequest[];
}

const RoomRequestHistoryModal: React.FC<RoomRequestHistoryModalProps> = ({ isOpen, onClose, roomRequests }) => {
  const [filter, setFilter] = useState<'All' | number>('All'); // Cambiamos RequestStatus a number
  const [searchTerm, setSearchTerm] = useState(''); // Filtro por encargado
  const [courseSearchTerm, setCourseSearchTerm] = useState(''); // Filtro por curso
  const [filteredRequests, setFilteredRequests] = useState<RoomRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const applyFilters = () => {
      console.log('Filtro seleccionado:', filter); // Para depuración
      console.log('Solicitudes originales:', roomRequests); // Para depuración

      // Filtro inicial basado en el estado con valores numéricos
      let requests = roomRequests.filter((request) => {
        if (filter === 'All') {
          // Mostrar aprobadas (1) y rechazadas (2) solamente
          return request.status === 1 || request.status === 2;
        }
        // Filtrar solo por el estado exacto seleccionado (aprobado = 1, rechazado = 2)
        return request.status === filter;
      });

      // Filtro por término de búsqueda (encargado)
      if (searchTerm.trim()) {
        requests = requests.filter((request) =>
          request.managerName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filtro por curso
      if (courseSearchTerm.trim()) {
        requests = requests.filter((request) =>
          request.course.toLowerCase().includes(courseSearchTerm.toLowerCase())
        );
      }

      console.log('Solicitudes después de aplicar el filtro:', requests); // Para verificar el resultado final después del filtrado
      setFilteredRequests(requests); // Actualizar las solicitudes filtradas
    };

    applyFilters();
  }, [filter, searchTerm, courseSearchTerm, roomRequests, isOpen]);

  const openDetailsModal = (request: RoomRequest) => {
    setSelectedRequest(request);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedRequest(null);
    setIsDetailsModalOpen(false);
  };

  if (!isOpen) return null;

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
          <h2 className="text-2xl font-semibold">Historial de Solicitudes</h2>
          <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        {/* Filtros y barra de búsqueda */}
        <div className="flex flex-col space-y-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por encargado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Buscar por curso..."
            value={courseSearchTerm}
            onChange={(e) => setCourseSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          <select
            className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value === 'All' ? 'All' : parseInt(e.target.value))}
          >
            <option value="All">Todas</option>
            <option value={1}>Aprobadas</option> {/* 1 es aprobado */}
            <option value={2}>Rechazadas</option> {/* 2 es rechazado */}
          </select>
        </div>

        {/* Lista de solicitudes */}
        <div className="overflow-y-auto max-h-72">
          {filteredRequests.length === 0 ? (
            <p className="text-center text-gray-600">No hay solicitudes para mostrar.</p>
          ) : (
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border text-gray-600 text-center">Encargado</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Curso</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Estado</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id_RoomRequest} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">{request.managerName}</td>
                    <td className="px-4 py-2 border text-center">{request.course}</td>
                    <td className="px-4 py-2 border text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          request.status === 1 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {request.status === 1 ? 'Aprobada' : 'Rechazada'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => openDetailsModal(request)}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal de detalles */}
        {selectedRequest && (
          <RoomRequestHistoryDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={closeDetailsModal}
            request={selectedRequest}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default RoomRequestHistoryModal;
