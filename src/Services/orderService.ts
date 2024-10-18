// src/Services/orderService.ts
import axios from 'axios';
import { Order } from '../types/Order';

const API_URL = 'https://localhost:7055/api/Order';

const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getOrderById = async (id: number): Promise<Order> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

const getOrdersByUdpId = async (udpId: number): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/udp/${udpId}`);
  return response.data;
};

const getOrdersForDirector = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/director`);
  return response.data;
};

const createOrder = async (order: Omit<Order, 'id'>): Promise<Order> => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

const approveOrder = async (id: number): Promise<void> => {
  await axios.patch(`${API_URL}/${id}/approve`);
};

const rejectOrder = async (id: number): Promise<void> => {
  await axios.patch(`${API_URL}/${id}/reject`);
};

const sendOrderToDirector = async (id: number): Promise<void> => {
  await axios.patch(`${API_URL}/${id}/send-to-director`);
};

const returnOrderToRequester = async (id: number): Promise<void> => {
  await axios.patch(`${API_URL}/${id}/return-to-requester`);
};

const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

const orderService = {
  getOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersByUdpId,
  getOrdersForDirector,
  createOrder,
  approveOrder,
  rejectOrder,
  sendOrderToDirector,
  returnOrderToRequester,
  deleteOrder,
};

export default orderService;
