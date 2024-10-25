// src/services/productService.ts
import axios from 'axios';
import { Product } from '../types/Product';

const BASE_URL = 'https://localhost:7055/api/Product';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const productService = {
  // GET: Obtener todos los productos
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(BASE_URL, authHeaders());
    return response.data;
  },

  // GET: Obtener un producto por nombre
  getProductByName: async (name: string): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/name/${name}`, authHeaders());
    return response.data;
  },

  // GET: Obtener productos por ID de proveedor
  getProductsBySupplierId: async (supplierId: number): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${BASE_URL}/supplier/${supplierId}`, authHeaders());
    return response.data;
  },

  // GET: Obtener un producto por ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/${id}`, authHeaders());
    return response.data;
  },

  // POST: Crear un nuevo producto
  createProduct: async (product: Omit<Product, 'id_Product'>): Promise<Product> => {
    const response = await axios.post<Product>(BASE_URL, product, authHeaders());
    return response.data;
  },
  
  // PUT: Actualizar un producto por ID
  updateProduct: async (id: number, product: Omit<Product, 'id_Product'>): Promise<Product> => {
    const response = await axios.put<Product>(`${BASE_URL}/${id}`, product, authHeaders());
    return response.data;
  },

  // DELETE: Eliminar un producto por ID
  deleteProduct: async (id: number): Promise<boolean> => {
    const response = await axios.delete(`${BASE_URL}/${id}`, authHeaders());
    return response.status === 200;
  },
};

export default productService;
