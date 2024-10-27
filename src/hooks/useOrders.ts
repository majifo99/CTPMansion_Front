// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import { getOrdersByStatus, approveOrder, rejectOrder, getOrdersByProductName } from '../Services/orderService';
import { Order, RequestStatus } from '../types/OrderTypes';
import { createOrder as createOrderService } from '../Services/orderService';

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
  // Crear una nueva orden
  const createOrder = async (order: Order) => {
    setLoading(true);
    try {
      const newOrder = await createOrderService(order);
      setOrders([...orders, newOrder]);
      setError(null);
    } catch (err) {
      setError('Error al crear la orden');
    } finally {
      setLoading(false);
}
};
const fetchOrdersByProductName = async (name: string) => {
  setLoading(true);
  try {
    const data = await getOrdersByProductName(name);
    setOrders(data);
    setError(null);
  } catch (err) {
    setError('Error al obtener órdenes por producto');
  } finally {
    setLoading(false);
}
};

  return {
    orders, // Las órdenes obtenidas
    loading, // Indicador de carga
    error, // Posible error
    handleApproveOrder, // Función para aprobar
    handleRejectOrder, // Función para rechazar
    fetchOrdersData,  // Permite obtener las órdenes para un estado específico
    createOrder,  // Permite crear una nueva orden
fetchOrdersByProductName,  // Permite obtener las órdenes por nombre de producto

  };
};
