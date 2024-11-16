// src/modals/ProductDetailsModal.tsx
import React from 'react';
import { Order } from '../types/OrderTypes';
import { motion, AnimatePresence } from 'framer-motion'; // Importar motion y AnimatePresence

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
  onApprove,
  onReject,
}) => {
  // Función para aprobar y cerrar el modal
  const handleApprove = async () => {
    await onApprove(order.orderId);
    onClose();
  };

  // Función para rechazar y cerrar el modal
  const handleReject = async () => {
    await onReject(order.orderId);
    onClose();
  };

  return (
    <AnimatePresence> {/* Contenedor para animación de entrada/salida */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={onClose}
          initial={{ opacity: 0 }}            // Estado inicial (opacidad 0)
          animate={{ opacity: 1 }}            // Estado visible (opacidad 1)
          exit={{ opacity: 0 }}               // Estado de salida (opacidad 0)
          transition={{ duration: 0.3 }}      // Duración de la transición para fondo
        >
          {/* Contenedor con animación del contenido del modal */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()} // Evitar que el modal se cierre al hacer clic dentro
            initial={{ opacity: 0, y: 50 }}     // Estado inicial del modal (opaco y desplazado)
            animate={{ opacity: 1, y: 0 }}      // Estado visible del modal (totalmente opaco y en posición)
            exit={{ opacity: 0, y: 50 }}        // Estado de salida del modal (opaco y desplazado)
            transition={{ duration: 0.3 }}      // Duración de la transición para el contenido
          >
            {/* Header del Modal */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-700">Detalles de la Orden</h2>
              <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
                &#x2715;
              </button>
            </div>

            {/* Información General de la Orden */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              <div>
                <p className="text-lg">
                  <strong className="text-gray-600">Receptor:</strong> {order.receiver}
                </p>
                <p className="text-lg mt-2">
                  <strong className="text-gray-600">Área Solicitante:</strong> {order.requesterArea || 'No especificada'}
                </p>
                <p className="text-lg mt-4">
                  <strong className="text-gray-600">Comentarios:</strong> {order.comments || 'Sin comentarios'}
                </p>
              </div>

              {/* Columna Derecha */}
              <div className="sm:text-right">
                <p className="text-lg">
                  <strong className="text-gray-600">Fecha de Orden:</strong> {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-lg mt-4">
                  <strong className="text-gray-600">Estado:</strong>{' '}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                      order.status === 1
                        ? 'bg-green-500'
                        : order.status === 2
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {order.status === 1 ? 'Aprobada' : order.status === 2 ? 'Rechazada' : 'Pendiente'}
                  </span>
                </p>
              </div>
            </div>

            {/* Detalles de los Productos con Scroll */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Detalles de los Productos:</h3>
              {order.orderDetails && order.orderDetails.length > 0 ? (
                <div className="overflow-y-auto max-h-48">
                  <table className="table-auto w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-3 text-gray-600 font-medium text-center">Producto</th>
                        <th className="px-4 py-3 text-gray-600 font-medium text-center">Cantidad</th>
                        <th className="px-4 py-3 text-gray-600 font-medium text-center">Unidad de Medida</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderDetails.map((detail, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border-b text-center">{detail.product?.name || 'Producto desconocido'}</td>
                          <td className="px-4 py-3 border-b text-center">{detail.quantity}</td>
                          <td className="px-4 py-3 border-b text-center">{detail.unitOfMeasure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-600">No hay detalles para esta orden.</p>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handleApprove}
              >
                Aprobar
              </button>
              <button
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={handleReject}
              >
                Rechazar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
