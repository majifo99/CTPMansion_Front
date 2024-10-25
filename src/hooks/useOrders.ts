// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import { getOrdersByStatus, approveOrder, rejectOrder } from '../Services/orderService';
import { Order, RequestStatus } from '../types/OrderTypes';

export const useOrders = (initialStatus: RequestStatus | 'All' = RequestStatus.Pending) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders based on the given status
  const fetchOrdersData = async (status: RequestStatus | 'All') => {
    setLoading(true);
    try {
      let data: Order[] = [];

      if (status === 'All') {
        // Fetch both Approved and Rejected orders
        const approvedOrders = await getOrdersByStatus(RequestStatus.Approved);
        const rejectedOrders = await getOrdersByStatus(RequestStatus.Rejected);
        data = [...approvedOrders, ...rejectedOrders]; // Combine both arrays
      } else {
        // Fetch orders for a specific status
        data = await getOrdersByStatus(status);
      }

      setOrders(data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener las órdenes:', err);
      setError('Error al obtener las órdenes');

    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrdersData(initialStatus);  // Fetch orders based on initial status (default: Pending)
  }, [initialStatus]);

  const handleApproveOrder = async (id: number) => {
    try {
      await approveOrder(id);
      fetchOrdersData(initialStatus);  // Refresh orders after approval
    } catch (err) {
      console.error('Error al aprobar la orden:', err);
      setError('Error al aprobar la orden');
    }
  };

  const handleRejectOrder = async (id: number) => {
    try {
      await rejectOrder(id);
      fetchOrdersData(initialStatus);  // Refresh orders after rejection
    } catch (err) {
      console.error('Error al rechazar la orden:', err);
      setError('Error al rechazar la orden');

    }
  };

  return {
    orders, // Para las órdenes completas
    orderStatuses, // Para los estados de las órdenes
    approvedOrders,
    loading,
    error,

    handleApproveOrder,
    handleRejectOrder,
    fetchOrdersData,  // Allow fetching orders for a specific status

  };
};
