import { useState, useEffect, useCallback } from 'react';
import orderService from '../Services/orderService';
import { Order } from '../types/Order';

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (order: Omit<Order, 'id'>) => Promise<void>;
  approveOrder: (id: number) => Promise<void>;
  rejectOrder: (id: number) => Promise<void>;
  sendOrderToDirector: (id: number) => Promise<void>;
  returnOrderToRequester: (id: number) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  fetchOrdersByUserId: (userId: number) => Promise<void>;
  fetchOrdersByUdpId: (udpId: number) => Promise<void>;
  fetchOrdersForDirector: () => Promise<void>;
}

export const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener órdenes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch orders by userId
  const fetchOrdersByUserId = async (userId: number) => {
    setLoading(true);
    try {
      const data = await orderService.getOrdersByUserId(userId);
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener órdenes por usuario');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders by udpId
  const fetchOrdersByUdpId = async (udpId: number) => {
    setLoading(true);
    try {
      const data = await orderService.getOrdersByUdpId(udpId);
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener órdenes por UDP');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders for director
  const fetchOrdersForDirector = async () => {
    setLoading(true);
    try {
      const data = await orderService.getOrdersForDirector();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener órdenes para director');
    } finally {
      setLoading(false);
    }
  };

  // Create a new order
  const createOrder = async (order: Omit<Order, 'id'>) => {
    try {
      const newOrder = await orderService.createOrder(order);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    } catch (err: any) {
      setError(err.message || 'Error al crear la orden');
    }
  };

  // Approve an order
  const approveOrder = async (id: number) => {
    try {
      await orderService.approveOrder(id);
      setOrders((prevOrders) => prevOrders.map(order => (order.id === id ? { ...order, status: 1 } : order)));
    } catch (err: any) {
      setError(err.message || 'Error al aprobar la orden');
    }
  };

  // Reject an order
  const rejectOrder = async (id: number) => {
    try {
      await orderService.rejectOrder(id);
      setOrders((prevOrders) => prevOrders.map(order => (order.id === id ? { ...order, status: -1 } : order)));
    } catch (err: any) {
      setError(err.message || 'Error al rechazar la orden');
    }
  };

  // Send order to director
  const sendOrderToDirector = async (id: number) => {
    try {
      await orderService.sendOrderToDirector(id);
      setOrders((prevOrders) => prevOrders.map(order => (order.id === id ? { ...order, isSentToDirector: true } : order)));
    } catch (err: any) {
      setError(err.message || 'Error al enviar la orden al director');
    }
  };

  // Return order to requester
  const returnOrderToRequester = async (id: number) => {
    try {
      await orderService.returnOrderToRequester(id);
      setOrders((prevOrders) => prevOrders.map(order => (order.id === id ? { ...order, isSentToDirector: false } : order)));
    } catch (err: any) {
      setError(err.message || 'Error al devolver la orden al solicitante');
    }
  };

  // Delete an order
  const deleteOrder = async (id: number) => {
    try {
      await orderService.deleteOrder(id);
      setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la orden');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    approveOrder,
    rejectOrder,
    sendOrderToDirector,
    returnOrderToRequester,
    deleteOrder,
    fetchOrdersByUserId,
    fetchOrdersByUdpId,
    fetchOrdersForDirector,
  };
};
