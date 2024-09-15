import axios from 'axios';

const API_URL = 'https://localhost:7055/api/User'; // Asegúrate de usar la URL correcta del backend

export interface UserData {
  name: string;
  lastName: string;
  lastName2: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const registerUser = async (userData: UserData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, null, {
    params: { email, password },
  });
  return response.data;
};

export const verifyEmail = async (userId: string, verificationCode: string) => {
  const response = await axios.post(`${API_URL}/verify-email`, null, {
    params: { userId, verificationCode },
  });
  return response.data;
};
