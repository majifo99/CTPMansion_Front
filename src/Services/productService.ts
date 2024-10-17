import axios from 'axios';
import { Product } from '../types/Product';

const BASE_URL = 'https://localhost:7055/api/Product';

const productService = {
  // GET: Obtener todos los productos
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(BASE_URL);
    return response.data;
  },

  // GET: Obtener un producto por nombre
  getProductByName: async (name: string): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/${name}`);
    return response.data;
  },

  // GET: Obtener productos por ID de proveedor
  getProductsBySupplierId: async (supplierId: number): Promise<Product[]> => {
    const response = await axios.get<Product[]>(`${BASE_URL}/supplier/${supplierId}`);
    return response.data;
  },

  // GET: Obtener un producto por ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // POST: Crear un nuevo producto
  createProduct: async (product: Omit<Product, 'id_Product'>): Promise<Product> => {
    const response = await axios.post<Product>(BASE_URL, product);
    return response.data;
  },

  // PUT: Actualizar un producto por ID
  updateProduct: async (id: number, product: Omit<Product, 'id_Product'>): Promise<Product> => {
    const response = await axios.put<Product>(`${BASE_URL}/${id}`, product);
    return response.data;
  },

  // PATCH: Actualizar parcialmente un producto por ID
  patchProduct: async (id: number, patchData: any): Promise<Product> => {
    const response = await axios.patch<Product>(`${BASE_URL}/${id}`, patchData, {
      headers: { 'Content-Type': 'application/json-patch+json' },
    });
    return response.data;
  },

  // DELETE: Eliminar un producto por ID
  deleteProduct: async (id: number): Promise<boolean> => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.status === 200;
  },
};

export default productService;