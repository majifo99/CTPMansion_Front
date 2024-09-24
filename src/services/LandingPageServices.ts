import axios from 'axios';
import { AboutUsContent, Event, Location, Mission, OurService, Speciality, Value, Vision, Workshop } from '../types/Types';

const API_URL = 'https://localhost:7055/api'; // Cambia esta URL por la real

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleResponse = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// Servicios relacionados a los eventos
export const getEvents = (): Promise<Event[]> => {
  return handleResponse<Event[]>(`/Events`);
};

export const addEvent = async (newEvent: Event): Promise<Event> => {
  try {
    const response = await apiClient.post<Event>('/Events', newEvent);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const editEvent = async (eventId: number, updatedEvent: Event): Promise<Event> => {
  try {
    const response = await apiClient.put<Event>(`/Events/${eventId}`, updatedEvent);
    return response.data;
  } catch (error) {
    console.error('Error editing event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  try {
    await apiClient.delete(`/Events/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Servicios para otros recursos
export const fetchSpecialities = (): Promise<Speciality[]> => {
  return handleResponse<Speciality[]>(`/Especiality`);
};

export const getAboutUsContent = async (): Promise<AboutUsContent | null> => {
  const data = await handleResponse<AboutUsContent[]>(`/AboutUsContentManager`);
  return data.length > 0 ? data[0] : null;
};

export const fetchLocation = async (): Promise<Location> => {
  try {
    const response = await apiClient.get<Location[]>(`/Location`);
    return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw new Error('Error al cargar la información de la ubicación.');
  }
};

export const fetchOurServices = (): Promise<OurService[]> => {
  return handleResponse<OurService[]>(`/OurService`);
};

export const fetchMission = async (): Promise<Mission> => {
  try {
    const response = await apiClient.get<Mission[]>(`/Missions`);
    return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
  } catch (error) {
    console.error('Error fetching mission data:', error);
    throw new Error('Error al cargar la misión.');
  }
};

export const fetchVision = async (): Promise<Vision> => {
  try {
    const response = await apiClient.get<Vision[]>(`/Vision`);
    return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
  } catch (error) {
    console.error('Error fetching vision data:', error);
    throw new Error('Error al cargar la visión.');
  }
};

export const fetchValues = (): Promise<Value[]> => {
  return handleResponse<Value[]>(`/Value`);
};

export const fetchWorkshops = (): Promise<Workshop[]> => {
  return handleResponse<Workshop[]>(`/Workshop`);
};

// Servicios relacionados con los métodos de entrega y nombres de certificación

// Obtener los métodos de entrega
export const getDeliveryMethods = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await apiClient.get<{ id: number; name: string }[]>(`/Enums/deliveryMethods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery methods:', error);
    throw error;
  }
};


// Obtener los nombres de certificación
export const getCertificationNames = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await apiClient.get<{ id: number; name: string }[]>(`/CertificationName`);
    return response.data;
  } catch (error) {
    console.error('Error fetching certification names:', error);
    throw error;
  }
};

// Enviar la solicitud de certificado
export const submitCertificateRequest = async (requestData: {
  studentName: string;
  studentLastName1: string;
  studentLastName2: string;
  studentIdentification: string;
  guardianName: string;
  guardianLastName1: string;
  guardianLastName2: string;
  guardianIdentification: string;
  email: string;
  phoneNumber: string;
  deliveryMethod: number | string;  // Dependerá de lo que espera el backend
  certificationName: string;
}): Promise<void> => {
  try {
    console.log('Submitting certificate request:', requestData); // Verifica los datos antes de la solicitud
    await apiClient.post('/CertificationRequests', requestData);
  } catch (error) {
    console.error('Error submitting certificate request:', error);
    throw error;
  }
};



