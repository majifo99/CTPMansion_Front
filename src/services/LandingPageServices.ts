import axios from 'axios';
import { AboutUsContent, Event, Location, Mission, OurService, Speciality, Value, Vision, Workshop } from '../types/Types';

const API_URL = 'https://localhost:7055/api'; // Cambia esta URL por la real

const handleResponse = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const fetchSpecialities = (): Promise<Speciality[]> => {
    return handleResponse<Speciality[]>(`${API_URL}/Especiality`);
  };




export const getEvents = (): Promise<Event[]> => {
  return handleResponse<Event[]>(`${API_URL}/Events`);
};

export const getAboutUsContent = async (): Promise<AboutUsContent | null> => {
    const data = await handleResponse<AboutUsContent[]>(`${API_URL}/AboutUsContentManager`);
    return data.length > 0 ? data[0] : null;
  };




  export const fetchLocation = async (): Promise<Location> => {
    try {
      const response = await axios.get<Location[]>(`${API_URL}/Location`);
      return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw new Error('Error al cargar la información de la ubicación.');
    }
  };
export const fetchOurServices = (): Promise<OurService[]> => {
  return handleResponse<OurService[]>(`${API_URL}/OurService`);
};

export const fetchMission = async (): Promise<Mission> => {
    try {
      const response = await axios.get<Mission[]>(`${API_URL}/Missions`);
      return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
    } catch (error) {
      console.error('Error fetching mission data:', error);
      throw new Error('Error al cargar la misión.');
    }
  };

  export const fetchVision = async (): Promise<Vision> => {
    try {
      const response = await axios.get<Vision[]>(`${API_URL}/Vision`);
      return response.data[0]; // Asume que la respuesta es un array y toma el primer elemento
    } catch (error) {
      console.error('Error fetching vision data:', error);
      throw new Error('Error al cargar la visión.');
    }
  };
export const fetchValues = (): Promise<Value[]> => {
  return handleResponse<Value[]>(`${API_URL}/Value`);
};

export const fetchWorkshops = (): Promise<Workshop[]> => {
  return handleResponse<Workshop[]>(`${API_URL}/Workshop`);
};


