// hooks/useProducts.ts
import { useState, useEffect, useCallback } from 'react';
import productService from '../Services/productService';
import { Product } from '../types/Product';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id_Product'>) => Promise<void>;
  updateProduct: (id: number, updatedProduct: Omit<Product, 'id_Product'>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  fetchProductsBySupplierId: (supplierId: number) => Promise<void>;
  fetchProductByName: (name: string) => Promise<void>;
}

export const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener productos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsBySupplierId = async (supplierId: number) => {
    setLoading(true);
    try {
      const data = await productService.getProductsBySupplierId(supplierId);
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Error al obtener productos por proveedor');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductByName = async (name: string) => {
    setLoading(true);
    try {
      const product = await productService.getProductByName(name);
      setProducts([product]);
    } catch (err: any) {
      setError(err.message || 'Error al obtener producto por nombre');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Omit<Product, 'id_Product'>) => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (err: any) {
      setError(err.message || 'Error al crear el producto');
    }
  };

  const updateProduct = async (id: number, updatedProduct: Omit<Product, 'id_Product'>) => {
    try {
      const updated = await productService.updateProduct(id, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((prod) => (prod.id_Product === id ? updated : prod))
      );
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el producto');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const success = await productService.deleteProduct(id);
      if (success) {
        setProducts((prevProducts) => prevProducts.filter((prod) => prod.id_Product !== id));
      }
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el producto');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProductsBySupplierId,
    fetchProductByName,
  };
};
