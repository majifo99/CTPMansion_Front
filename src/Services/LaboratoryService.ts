import axios from "axios";
import { Laboratory } from "../types/Types";
import { LabRequest } from "../types/LaboratoryRequestType";

const API_URL = 'https://localhost:7055/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleResponse = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const getLaboratories = (): Promise<Laboratory[]> => handleResponse<Laboratory[]>(`/Laboratory`);

export const getLaboratoryById = (id: number): Promise<Laboratory> => handleResponse<Laboratory>(`/Laboratory/${id}`);

export const createLabRequest = async (labRequest: LabRequest): Promise<void> => {
  try {
    await apiClient.post(`/LaboratoryRequest`, labRequest);
  } catch (error) {
    console.error('Error creating lab request:', error.response?.data || error.message);
    throw error;
  }
};

export const addLaboratory = async (newLaboratory: Laboratory): Promise<Laboratory> => {
  try {
    const response = await apiClient.post<Laboratory>('/Laboratory', newLaboratory);
    return response.data;
  } catch (error) {
    console.error('Error adding laboratory:', error);
    throw error;
  }
};

export const updateLaboratory = async (id: number, updatedLaboratory: Laboratory): Promise<Laboratory> => {
  try {
    const response = await apiClient.put<Laboratory>(`/Laboratory/${id}`, updatedLaboratory);
    return response.data;
  } catch (error) {
    console.error('Error updating laboratory:', error);
    throw error;
  }
};

export const deleteLaboratory = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/Laboratory/${id}`);
  } catch (error) {
    console.error('Error deleting laboratory:', error);
    throw error;
  }
};
