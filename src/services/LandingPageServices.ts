import axios from 'axios';
import {
  Event,
  AboutUsContent,
  Location,
  OurService,
  Mission,
  Vision,
  Value,
  Workshop,
  Speciality,
  Room,
  CertificationRequest,

} from '../types/Types'; // Ajusta esta ruta según tu estructura de proyecto

// URL base de la API
const API_URL = 'https://ctplamansion.onrender.com/api';

// Crear una instancia de axios con la URL base y encabezados predeterminados
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT a cada solicitud
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

// === Funciones de autenticación ===
export const login = async (email: string, password: string): Promise<void> => {
  const response = await apiClient.post('/User/login', { email, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

// === Servicios relacionados a eventos ===
export const getEvents = async (): Promise<Event[]> => handleResponse('/Events');

export const addEvent = async (newEvent: Event): Promise<Event> => {
  const response = await apiClient.post('/Events', newEvent);
  return response.data;
};

export const editEvent = async (eventId: number, updatedEvent: Event): Promise<Event> => {
  const response = await apiClient.put(`/Events/${eventId}`, updatedEvent);
  return response.data;
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  await apiClient.delete(`/Events/${eventId}`);
};

// === Servicios relacionados a especialidades ===
export const fetchSpecialities = async (): Promise<Speciality[]> => handleResponse('/Especiality');

export const addSpeciality = async (speciality: Speciality): Promise<Speciality> => {
  const response = await apiClient.post('/Especiality', speciality);
  return response.data;
};

export const editSpeciality = async (id: number, speciality: Speciality): Promise<Speciality> => {
  const response = await apiClient.put(`/Especiality/${id}`, speciality);
  return response.data;
};

export const deleteSpeciality = async (id: number): Promise<void> => {
  await apiClient.delete(`/Especiality/${id}`);
};

export const getAboutUsContent = async (): Promise<AboutUsContent | null> => {
  const data = await handleResponse<AboutUsContent[]>('/AboutUsContentManager');
  return data.length > 0 ? data[0] : null;
};

// === Servicios relacionados a la ubicación ===
export const fetchLocation = async (): Promise<Location> => {
  const response = await apiClient.get('/Location');
  return response.data[0];
};

// === Servicios relacionados con nuestros servicios ===
export const fetchOurServices = async (): Promise<OurService[]> => handleResponse('/OurService');

// === Servicios relacionados con la misión ===
export const fetchMission = async (): Promise<Mission> => {
  const response = await apiClient.get('/Missions');
  return response.data[0];
};

// === Servicios relacionados con la visión ===
export const fetchVision = async (): Promise<Vision> => {
  const response = await apiClient.get('/Vision');
  return response.data[0];
};

// === Servicios relacionados con valores ===
export const fetchValues = async (): Promise<Value[]> => handleResponse('/Value');

// === Servicios relacionados a talleres (Workshops) ===
export const getAllWorkshops = async (): Promise<Workshop[]> => {
  const response = await apiClient.get('/Workshop');
  return response.data;
};

export const getWorkshopById = async (id: number): Promise<Workshop> => {
  const response = await apiClient.get(`/Workshop/${id}`);
  return response.data;
};

export const createWorkshop = async (workshopData: Workshop): Promise<Workshop> => {
  const response = await apiClient.post('/Workshop', workshopData);
  return response.data;
};

export const updateWorkshop = async (id: number, workshopData: Workshop): Promise<Workshop> => {
  const response = await apiClient.put(`/Workshop/${id}`, workshopData);
  return response.data;
};

export const deleteWorkshop = async (id: number): Promise<void> => {
  await apiClient.delete(`/Workshop/${id}`);
};

// === Servicios relacionados con los métodos de entrega y nombres de certificación ===
export const submitCertificateRequest = async (formData: CertificationRequest): Promise<CertificationRequest> => {
  const response = await apiClient.post('/CertificationRequests', formData);
  return response.data;
};

export const getDeliveryMethods = async (): Promise<{ id: number; name: string }[]> => {
  const response = await apiClient.get('/Enums/deliveryMethods');
  return response.data;
};

export const getCertificationNames = async (): Promise<{ id: number; name: string }[]> => {
  const response = await apiClient.get('/CertificationName');
  return response.data;
};

// === Servicios relacionados con solicitudes de certificación ===
export const getRequests = async (): Promise<CertificationRequest[]> => {
  const response = await apiClient.get('/CertificationRequests');
  return response.data;
};

export const rejectRequest = async (id: number): Promise<void> => {
  await apiClient.post(`/CertificationRequests/${id}/reject`);
};

export const approveRequest = async (id: number): Promise<void> => {
  await apiClient.post(`/CertificationRequests/${id}/approve`);
};

export const setDeliveryDeadline = async (id: number, deliveryDays: number): Promise<void> => {
  await apiClient.post(`/CertificationRequests/${id}/set-delivery-deadline`, null, {
    params: { deliveryDays },
  });
};

// === Servicios relacionados con solicitudes de sala (Room Requests) ===
export const createRoomRequest = async (roomRequest: Room): Promise<void> => {
  await apiClient.post('/RoomRequest', roomRequest);
};

// Función genérica para manejar respuestas
const handleResponse = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get(url);
  return response.data;
};
