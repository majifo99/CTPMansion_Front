import axios from 'axios';
import {
  AboutUsContent,  Event,  Location,  Mission,  OurService,  Speciality,  Value,  Vision,  Workshop,} from '../types/Types';

const API_URL = 'https://localhost:7055/api'; // Cambia la URL según tu API

// Crear una instancia de axios con la URL base y encabezados predeterminados
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Manejo de respuestas
const handleResponse = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// === Servicios relacionados a eventos ===
export const getEvents = (): Promise<Event[]> => {
  return handleResponse<Event[]>('/Events');
};

export const addEvent = async (newEvent: Omit<Event, 'id'>): Promise<Event> => {
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

// === Servicios relacionados a especialidades ===
export const fetchSpecialities = (): Promise<Speciality[]> => {
  return handleResponse<Speciality[]>('/Especiality');
};

export const addSpeciality = async (speciality: Omit<Speciality, 'id'>): Promise<Speciality> => {
  try {
    const response = await apiClient.post<Speciality>('/Especiality', speciality);
    return response.data;
  } catch (error) {
    console.error('Error adding speciality:', error);
    throw error;
  }
};

export const editSpeciality = async (id: number, speciality: Omit<Speciality, 'id'>): Promise<Speciality> => {
  try {
    const response = await apiClient.put<Speciality>(`/Especiality/${id}`, speciality);
    return response.data;
  } catch (error) {
    console.error('Error editing speciality:', error);
    throw error;
  }
};

export const deleteSpeciality = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/Especiality/${id}`);
  } catch (error) {
    console.error('Error deleting speciality:', error);
    throw error;
  }
};

// === Servicios relacionados con el contenido "Sobre Nosotros" ===
export const getAboutUsContent = async (): Promise<AboutUsContent | null> => {
  const data = await handleResponse<AboutUsContent[]>('/AboutUsContentManager');
  return data.length > 0 ? data[0] : null;
};

// === Servicios relacionados a la ubicación ===
export const fetchLocation = async (): Promise<Location> => {
  try {
    const response = await apiClient.get<Location[]>('/Location');
    return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw new Error('Error al cargar la información de la ubicación.');
  }
};

// === Servicios relacionados con nuestros servicios ===
export const fetchOurServices = (): Promise<OurService[]> => {
  return handleResponse<OurService[]>('/OurService');
};

// === Servicios relacionados con la misión ===
export const fetchMission = async (): Promise<Mission> => {
  try {
    const response = await apiClient.get<Mission[]>('/Missions');
    return response.data[0];
  } catch (error) {
    console.error('Error fetching mission data:', error);
    throw new Error('Error al cargar la misión.');
  }
};

// === Servicios relacionados con la visión ===
export const fetchVision = async (): Promise<Vision> => {
  try {
    const response = await apiClient.get<Vision[]>('/Vision');
    return response.data[0];
  } catch (error) {
    console.error('Error fetching vision data:', error);
    throw new Error('Error al cargar la visión.');
  }
};

// === Servicios relacionados con valores ===
export const fetchValues = (): Promise<Value[]> => {
  return handleResponse<Value[]>('/Value');
};

// === Servicios relacionados a talleres (Workshops) ===
export const getAllWorkshops = async (): Promise<Workshop[]> => {
  try {
    const response = await apiClient.get<Workshop[]>('/Workshop'); // Asegúrate que el endpoint sea correcto
    return response.data;
  } catch (error) {
    console.error('Error al obtener los talleres:', error);
    throw error;
  }
};

export const getWorkshopById = async (id: number): Promise<Workshop> => {
  try {
    const response = await apiClient.get<Workshop>(`/Workshop/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el taller:', error);
    throw error;
  }
};

export const createWorkshop = async (workshopData: Omit<Workshop, 'id'>): Promise<Workshop> => {
  try {
    const response = await apiClient.post<Workshop>('/Workshop', workshopData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el taller:', error);
    throw error;
  }
};

export const updateWorkshop = async (id: number, workshopData: Omit<Workshop, 'id'>): Promise<Workshop> => {
  try {
    const response = await apiClient.put<Workshop>(`/Workshop/${id}`, workshopData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el taller:', error);
    throw error;
  }
};

export const deleteWorkshop = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/Workshop/${id}`);
  } catch (error) {
    console.error('Error al eliminar el taller:', error);
    throw error;
  }
};

// === Servicios relacionados con los métodos de entrega y nombres de certificación ===
export const getDeliveryMethods = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await apiClient.get<{ id: number; name: string }[]>('/Enums/deliveryMethods');
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery methods:', error);
    throw error;
  }
};

export const getCertificationNames = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await apiClient.get<{ id: number; name: string }[]>('/CertificationName');
    return response.data;
  } catch (error) {
    console.error('Error fetching certification names:', error);
    throw error;
  }
};

// === Servicios relacionados con solicitudes de certificación ===
export const getRequests = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get('/CertificationRequests');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las solicitudes');
  }
};

export const rejectRequest = async (id: number): Promise<void> => {
  try {
    await apiClient.post(`/CertificationRequests/${id}/reject`);
  } catch (error) {
    throw new Error('Error al rechazar la solicitud');
  }
};

export const approveRequest = async (id: number): Promise<void> => {
  try {
    await apiClient.post(`/CertificationRequests/${id}/approve`);
  } catch (error) {
    throw new Error('Error al aprobar la solicitud');
  }
};

export const setDeliveryDeadline = async (id: number, deliveryDays: number): Promise<void> => {
  try {
    await apiClient.post(`/CertificationRequests/${id}/set-delivery-deadline`, null, {
      params: { deliveryDays },
    });
  } catch (error) {
    throw new Error('Error al establecer la fecha límite de entrega');
  }
};

// Enviar solicitud de certificado
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
  deliveryMethod: number | string;
  certificationName: string;
}): Promise<void> => {
  try {
    console.log('Submitting certificate request:', requestData);
    await apiClient.post('/CertificationRequests', requestData);
  } catch (error) {
    console.error('Error submitting certificate request:', error);
    throw error;
  }
};
