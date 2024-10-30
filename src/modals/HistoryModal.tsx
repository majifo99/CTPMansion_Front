// src/modals/HistoryModal.tsx
import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import HistoryDetailsModal from './HistoryDetailsModal';
import { RequestStatus } from '../types/OrderTypes';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<RequestStatus | 'All'>(RequestStatus.Approved);
  const { orders, loading, error } = useOrders(filter);
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para el modal de detalles
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  if (!isOpen) return null;

  // Función para abrir el modal de detalles
  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  // Filtrar las órdenes según el término de búsqueda
  const filteredOrders = orders.filter((order) =>
    order.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Historial de Órdenes</h2>

        {/* Barra de búsqueda para filtrar por receptor */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre del receptor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-1/2"
          />
        </div>

        {/* Dropdown de filtro */}
        <div className="flex justify-center mb-4">
          <select
            className="border border-gray-300 px-4 py-2 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value as RequestStatus | 'All')}
          >
            <option value={RequestStatus.Approved}>Aprobadas</option>
            <option value={RequestStatus.Rejected}>Rechazadas</option>
            <option value="All">Todas</option>
          </select>
        </div>

        {/* Mensajes de error o de carga */}
        {loading && <p>Cargando órdenes...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Lista de órdenes con Scroll */}
        <div className="overflow-y-auto max-h-72"> {/* Añadimos un max-height y overflow-y */}
          {filteredOrders.length === 0 ? (
            <p>No hay órdenes disponibles.</p>
          ) : (
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border text-gray-600 text-center">Receptor</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Fecha</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Estado</th>
                  <th className="px-4 py-2 border text-gray-600 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">{order.receiver}</td>
                    <td className="px-4 py-2 border text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          order.status === 1
                            ? 'bg-green-500'
                            : order.status === 2
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                      >
                        {order.status === 1 ? 'Aprobada' : order.status === 2 ? 'Rechazada' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleViewDetails(order)}
                      >
                        Ver más información
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal de detalles */}
        {selectedOrder && (
          <HistoryDetailsModal
            isOpen={!!selectedOrder}
            onClose={() => setSelectedOrder(null)}
            order={selectedOrder}
          />
        )}

        {/* Botón para cerrar */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default HistoryModal;
