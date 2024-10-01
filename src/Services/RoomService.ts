import axios from 'axios';
import { Room } from '../types/Types'; // Import the Room type

const API_URL = 'https://localhost:7055/api/Room'; // Adjust base URL as necessary

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Expecting the response to be an array of rooms
  } catch (error) {
    throw new Error('Failed to fetch rooms'); // Handle errors appropriately
  }
};
