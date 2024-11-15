import axios from 'axios';
import Cookies from 'js-cookie'; // Importamos js-cookie

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
    const token = Cookies.get('token'); // Obtiene el token de las cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo de respuestas
const handleResponse = async (url: string) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

// === Funciones de autenticación ===
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/User/login', { email, password });
    const { token } = response.data;
    Cookies.set('token', token, { expires: 1 }); // Guarda el token en cookies con 1 día de expiración
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove('token'); // Elimina el token de las cookies
};

// === Servicios relacionados a eventos ===
export const getEvents = () => handleResponse('/Events');

export const addEvent = async (newEvent: any) => {
  try {
    const response = await apiClient.post('/Events', newEvent);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const editEvent = async (eventId: number, updatedEvent: any) => {
  try {
    const response = await apiClient.put(`/Events/${eventId}`, updatedEvent);
    return response.data;
  } catch (error) {
    console.error('Error editing event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: number) => {
  try {
    await apiClient.delete(`/Events/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// === Servicios relacionados a especialidades ===
export const fetchSpecialities = () => handleResponse('/Especiality');

export const addSpeciality = async (speciality: any) => {
  try {
    const response = await apiClient.post('/Especiality', speciality);
    return response.data;
  } catch (error) {
    console.error('Error adding speciality:', error);
    throw error;
  }
};

export const editSpeciality = async (id: number, speciality: any) => {
  try {
    const response = await apiClient.put(`/Especiality/${id}`, speciality);
    return response.data;
  } catch (error) {
    console.error('Error editing speciality:', error);
    throw error;
  }
};

export const deleteSpeciality = async (id: number) => {
  try {
    await apiClient.delete(`/Especiality/${id}`);
  } catch (error) {
    console.error('Error deleting speciality:', error);
    throw error;
  }
};

// === Servicios relacionados con el contenido "Sobre Nosotros" ===
export const getAboutUsContent = async () => {
  const data = await handleResponse('/AboutUsContentManager');
  return data.length > 0 ? data[0] : null;
};

// === Servicios relacionados a la ubicación ===
export const fetchLocation = async () => {
  try {
    const response = await apiClient.get('/Location');
    return response.data[0];
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw new Error('Error al cargar la información de la ubicación.');
  }
};

// === Servicios relacionados con nuestros servicios ===
export const fetchOurServices = () => handleResponse('/OurService');

// === Servicios relacionados con la misión ===
export const fetchMission = async () => {
  try {
    const response = await apiClient.get('/Missions');
    return response.data[0];
  } catch (error) {
    console.error('Error fetching mission data:', error);
    throw new Error('Error al cargar la misión.');
  }
};

// === Servicios relacionados con la visión ===
export const fetchVision = async () => {
  try {
    const response = await apiClient.get('/Vision');
    return response.data[0];
  } catch (error) {
    console.error('Error fetching vision data:', error);
    throw new Error('Error al cargar la visión.');
  }
};

// === Servicios relacionados con valores ===
export const fetchValues = () => handleResponse('/Value');

// === Servicios relacionados a talleres (Workshops) ===
export const getAllWorkshops = async () => {
  try {
    const response = await apiClient.get('/Workshop');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los talleres:', error);
    throw error;
  }
};

export const getWorkshopById = async (id: number) => {
  try {
    const response = await apiClient.get(`/Workshop/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el taller:', error);
    throw error;
  }
};

export const createWorkshop = async (workshopData: any) => {
  try {
    const response = await apiClient.post('/Workshop', workshopData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el taller:', error);
    throw error;
  }
};

export const updateWorkshop = async (id: number, workshopData: any) => {
  try {
    const response = await apiClient.put(`/Workshop/${id}`, workshopData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el taller:', error);
    throw error;
  }
};

export const deleteWorkshop = async (id: number) => {
  try {
    await apiClient.delete(`/Workshop/${id}`);
  } catch (error) {
    console.error('Error al eliminar el taller:', error);
    throw error;
  }
};

// === Servicios relacionados con los métodos de entrega y nombres de certificación ===
export const submitCertificateRequest = async (formData: {
  studentName: string;
  studentIdentification: string;
  guardianName: string;
  guardianIdentification: string;
  email: string;
  phoneNumber: string;
  deliveryMethod: number;
  certificationName: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/CertificationRequests`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud de certificado:', error);
    throw new Error('Error al enviar la solicitud de certificado');
  }
};

export const getDeliveryMethods = async () => {
  try {
    const response = await apiClient.get('/Enums/deliveryMethods');
    console.log("Delivery Methods Data:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery methods:', error);
    throw error;
  }
};

export const getCertificationNames = async () => {
  try {
    const response = await apiClient.get('/CertificationName');
    return response.data;
  } catch (error) {
    console.error('Error fetching certification names:', error);
    throw error;
  }
};

// === Servicios relacionados con solicitudes de certificación ===
export const getRequests = async () => {
  try {
    const response = await apiClient.get('/CertificationRequests');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las solicitudes');
  }
};

export const rejectRequest = async (id: number) => {
  try {
    await apiClient.post(`/CertificationRequests/${id}/reject`);
  } catch (error) {
    throw new Error('Error al rechazar la solicitud');
  }
};

export const approveRequest = async (id: number) => {
  try {
    await apiClient.post(`/CertificationRequests/${id}/approve`);
  } catch (error) {
    throw new Error('Error al aprobar la solicitud');
  }
};

export const setDeliveryDeadline = async (id: number, deliveryDays: number) => {
  try {
    await apiClient.post(`/CertificationRequests/${id}/set-delivery-deadline`, null, {
      params: { deliveryDays },
    });
  } catch (error) {
    throw new Error('Error al establecer la fecha límite de entrega');
  }
};

// === Servicios relacionados con solicitudes de sala (Room Requests) ===
export const createRoomRequest = async (roomRequest: any) => {
  try {
    await apiClient.post(`/RoomRequest`, roomRequest);
  } catch (error) {
    console.error('Error creating room request:', error);
    throw error;
  }
};
