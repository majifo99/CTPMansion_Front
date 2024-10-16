// hooks/useSuppliers.ts
import { useState, useEffect, useCallback } from 'react';
import supplierService from '../Services/supplierService';
import { Supplier } from '../types/Supplier';

interface UseSuppliersResult {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
  fetchSuppliers: () => Promise<void>;
  createSupplier: (supplier: Omit<Supplier, 'id_Supplier'>) => Promise<void>;
  updateSupplier: (id: number, updatedSupplier: Omit<Supplier, 'id_Supplier'>) => Promise<void>;
  deleteSupplier: (id: number) => Promise<void>;
}

export const useSuppliers = (): UseSuppliersResult => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await supplierService.getSuppliers();
      setSuppliers(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener proveedores');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSupplier = async (supplier: Omit<Supplier, 'id_Supplier'>) => {
    try {
      const newSupplier = await supplierService.createSupplier(supplier);
      setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
    } catch (err: any) {
      setError(err.message || 'Error al crear el proveedor');
    }
  };

  const updateSupplier = async (id: number, updatedSupplier: Omit<Supplier, 'id_Supplier'>) => {
    try {
      const updated = await supplierService.updateSupplier(id, updatedSupplier);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((sup) => (sup.id_Supplier === id ? updated : sup))
      );
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el proveedor');
    }
  };

  const deleteSupplier = async (id: number) => {
    try {
      const success = await supplierService.deleteSupplier(id);
      if (success) {
        setSuppliers((prevSuppliers) => prevSuppliers.filter((sup) => sup.id_Supplier !== id));
      }
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el proveedor');
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return {
    suppliers,
    loading,
    error,
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
};
