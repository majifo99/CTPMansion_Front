import React, { useEffect, useState } from 'react';
import { Order, RequestStatus } from '../types/OrderTypes';
import { useOrders } from '../hooks/useOrders';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  message: string;
  confirmButtonText: string;
  variant?: 'success' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, message, confirmButtonText, variant = 'danger', onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const buttonColor = variant === 'success' 
    ? 'bg-green-600 hover:bg-green-700' 
    : 'bg-red-600 hover:bg-red-700';

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmar acción</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={onCancel}
          >
            Volver
          </button>
          <button
            className={`px-4 py-2 ${buttonColor} text-white rounded-md transition-colors`}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
  onApprove,
  onReject,
}) => {
  const { handleGetOrderById } = useOrders();
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'approve' | 'reject' | null>(null);
  
  const hasFetchedRef = React.useRef(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (isOpen && order?.orderId && !hasFetchedRef.current) {
        setLoading(true);
        hasFetchedRef.current = true;
        
        try {
          const fullOrder = await handleGetOrderById(order.orderId);
          
          const processedOrder: Order = {
            orderId: fullOrder?.orderId || 0,
            status: fullOrder?.status || RequestStatus.Pending,
            orderDate: fullOrder?.orderDate || new Date().toISOString(),
            userId: fullOrder?.userId || 0,
            requesterArea: fullOrder?.requesterArea || '',
            receiver: fullOrder?.receiver || '',
            comments: fullOrder?.comments || '',
            orderDetails: fullOrder?.orderDetails || []
          };
          
          if (!processedOrder.orderDetails || processedOrder.orderDetails.length === 0) {
            if (order.orderDetails && order.orderDetails.length > 0) {
              processedOrder.orderDetails = [...order.orderDetails];
            }
          }
          
          setCurrentOrder(processedOrder);
        } catch (error) {
          console.error("Error loading order details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
    
    return () => {
      if (!isOpen) {
        hasFetchedRef.current = false;
      }
    };
  }, [isOpen, order?.orderId, handleGetOrderById]);

  const handleConfirmAction = () => {
    if (!pendingAction) return;
    
    const action = pendingAction === 'approve' ? onApprove : onReject;
    action(currentOrder.orderId);
    setIsConfirmationModalOpen(false);
    setPendingAction(null);
    onClose();
  };

  const handleCancelAction = () => {
    setIsConfirmationModalOpen(false);
    setPendingAction(null);
  };

  const getUnitOfMeasureName = (detail: any): string => {
    if (detail.unitOfMeasure && detail.unitOfMeasure.name) {
      return detail.unitOfMeasure.name;
    }
    
    if (typeof detail.unitOfMeasure === 'string') {
      return detail.unitOfMeasure;
    }
    
    if (detail.unitOfMeasureId) {
      return `ID: ${detail.unitOfMeasureId}`;
    }
    
    return 'N/A';
  };

  const getProductName = (detail: any): string => {
    if (detail.product && detail.product.name) {
      return detail.product.name;
    }
    
    if (detail.name) {
      return detail.name;
    }
    
    return 'Producto desconocido';
  };

  const isPending = currentOrder.status === RequestStatus.Pending;
  const hasOrderDetails = Boolean(
    currentOrder?.orderDetails && 
    Array.isArray(currentOrder.orderDetails) && 
    currentOrder.orderDetails.length > 0
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del Modal */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-700">Detalles de la Orden #{currentOrder.orderId}</h2>
            <button className="text-gray-500 hover:text-gray-700 text-xl" onClick={onClose}>
              &#x2715;
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Información General de la Orden */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                <div>
                  <p className="text-lg">
                    <strong className="text-gray-600">Receptor:</strong> {currentOrder.receiver}
                  </p>
                  <p className="text-lg mt-2">
                    <strong className="text-gray-600">Área Solicitante:</strong> {currentOrder.requesterArea || 'No especificada'}
                  </p>
                  <p className="text-lg mt-4">
                    <strong className="text-gray-600">Comentarios:</strong> {currentOrder.comments || 'Sin comentarios'}
                  </p>
                </div>

                {/* Columna Derecha */}
                <div className="sm:text-right">
                  <p className="text-lg">
                    <strong className="text-gray-600">Fecha de Orden:</strong> {new Date(currentOrder.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-lg mt-4">
                    <strong className="text-gray-600">Estado:</strong>{' '}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                        currentOrder.status === RequestStatus.Approved
                          ? 'bg-green-500'
                          : currentOrder.status === RequestStatus.Rejected
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    >
                      {currentOrder.status === RequestStatus.Approved 
                        ? 'Aprobada' 
                        : currentOrder.status === RequestStatus.Rejected 
                        ? 'Rechazada' 
                        : 'Pendiente'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Detalles de los Productos con Scroll */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Detalles de los Productos:</h3>
                
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
                      {hasOrderDetails ? (
                        currentOrder.orderDetails.map((detail, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border-b text-center">
                              {getProductName(detail)}
                            </td>
                            <td className="px-4 py-3 border-b text-center">
                              {detail.quantity}
                            </td>
                            <td className="px-4 py-3 border-b text-center">
                              {getUnitOfMeasureName(detail)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="hover:bg-gray-50">
                          <td colSpan={3} className="px-4 py-3 border-b text-center text-gray-500">
                            No se pudieron cargar los detalles de la orden.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Botones de acción - solo mostrar si la orden está pendiente */}
              {isPending && (
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => {
                      setPendingAction('approve');
                      setIsConfirmationModalOpen(true);
                    }}
                  >
                    Aprobar
                  </button>
                  <button
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={() => {
                      setPendingAction('reject');
                      setIsConfirmationModalOpen(true);
                    }}
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message={
          pendingAction === 'approve'
            ? '¿Estás seguro que deseas aprobar esta orden de productos?'
            : '¿Estás seguro que deseas rechazar esta orden de productos? Esta acción no se puede deshacer.'
        }
        confirmButtonText={pendingAction === 'approve' ? 'Confirmar aprobación' : 'Confirmar rechazo'}
        variant={pendingAction === 'approve' ? 'success' : 'danger'}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </>
  );
};

export default ProductDetailsModal;