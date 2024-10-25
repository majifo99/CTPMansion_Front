// src/hooks/useOrders.ts
import { useState} from 'react';
import {
  createOrder as createOrderService,
  getApprovedOrders,
  getOrdersByStatus,
  approveOrder,
  rejectOrder,
  getOrdersByUDP, // Usar esta función o eliminar si no es necesaria
  getOrdersByUser, // Usar esta función o eliminar si no es necesaria
  getOrdersByProductName, // Usar esta función o eliminar si no es necesaria
} from '../Services/orderService';
import { Order, ApprovedOrder, OrderStatus } from '../types/Order';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Para almacenar órdenes completas
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([]); // Para almacenar estados de las órdenes
  const [approvedOrders, setApprovedOrders] = useState<ApprovedOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  // Obtener órdenes aprobadas
  const fetchApprovedOrders = async () => {
    setLoading(true);
    try {
      const data = await getApprovedOrders();
      setApprovedOrders(data);
      setError(null);
    } catch (err) {
      setError('Error al obtener órdenes aprobadas');
    } finally {
      setLoading(false);
    }
  };

  // Obtener órdenes por estado
  const fetchOrdersByStatus = async (status: number) => {
    setLoading(true);
    try {
      const data = await getOrdersByStatus(status); // data es de tipo OrderStatus[]
      setOrderStatuses(data); // Guardamos en orderStatuses
      setError(null);
    } catch (err) {
      setError('Error al obtener órdenes por estado');
    } finally {
      setLoading(false);
    }
  };

  // Aprobar una orden
  const handleApproveOrder = async (id: number) => {
    try {
      await approveOrder(id);
      fetchOrdersByStatus(0); // Refrescar órdenes tras aprobar
    } catch (err) {
      setError('Error al aprobar la orden');
    }
  };

  // Rechazar una orden
  const handleRejectOrder = async (id: number) => {
    try {
      await rejectOrder(id);
      fetchOrdersByStatus(0); // Refrescar órdenes tras rechazar
    } catch (err) {
      setError('Error al rechazar la orden');
    }
  };

  // Puedes usar estas funciones si son necesarias:
  
  const fetchOrdersByUDP = async (udpId: number) => {
    setLoading(true);
    try {
      const data = await getOrdersByUDP(udpId);
      setOrders(data); // Guardamos las órdenes
      setError(null);
    } catch (err) {
      setError('Error al obtener órdenes por UDP');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersByUser = async (userId: number) => {
    setLoading(true);
    try {
      const data = await getOrdersByUser(userId);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Error al obtener órdenes por usuario');
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
    orders, // Para las órdenes completas
    orderStatuses, // Para los estados de las órdenes
    approvedOrders,
    loading,
    error,
    createOrder,
    fetchApprovedOrders,
    fetchOrdersByStatus,
    handleApproveOrder,
    handleRejectOrder,
    fetchOrdersByUDP, // Usar si es necesario
    fetchOrdersByUser, // Usar si es necesario
    fetchOrdersByProductName, // Usar si es necesario
  };
};
