import axios from 'axios';
import { Supplier } from '../types/Supplier';

const BASE_URL = 'https://localhost:7055/api/Supplier';

const supplierService = {
  // GET: Obtener todos los proveedores
  getSuppliers: async (): Promise<Supplier[]> => {
    const response = await axios.get<Supplier[]>(BASE_URL);
    return response.data;
  },

  // GET: Obtener un proveedor por ID
  getSupplierById: async (id: number): Promise<Supplier> => {
    const response = await axios.get<Supplier>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // POST: Crear un nuevo proveedor
  createSupplier: async (supplier: Omit<Supplier, 'id_Supplier'>): Promise<Supplier> => {
    const response = await axios.post<Supplier>(BASE_URL, supplier);
    return response.data;
  },

  // PUT: Actualizar un proveedor por ID
  updateSupplier: async (id: number, supplier: Omit<Supplier, 'id_Supplier'>): Promise<Supplier> => {
    const response = await axios.put<Supplier>(`${BASE_URL}/${id}`, supplier);
    return response.data;
  },

  // PATCH: Actualizar parcialmente un proveedor por ID
  patchSupplier: async (id: number, patchData: any): Promise<Supplier> => {
    const response = await axios.patch<Supplier>(`${BASE_URL}/${id}`, patchData, {
      headers: { 'Content-Type': 'application/json-patch+json' },
    });
    return response.data;
  },

  // DELETE: Eliminar un proveedor por ID
  deleteSupplier: async (id: number): Promise<boolean> => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.status === 200;
  },
};

export default supplierService;
