// components/OrderForm.tsx
import React, { useState } from 'react';
import { useOrder } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';

const OrderForm = () => {
  const {
    cart, addProductToCart, removeProductFromCart,
    udpList, selectedUdp, setSelectedUdp, createNewOrder, loading,
  } = useOrder();

  const { products } = useProducts(); // Obtener productos disponibles
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unitOfMeasure, setUnitOfMeasure] = useState('pcs'); // Unidades por defecto
  const [receiver, setReceiver] = useState('');
  const [comments, setComments] = useState('');

  // Maneja agregar producto al carrito
  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      addProductToCart(selectedProduct, quantity, unitOfMeasure);
      setSelectedProduct(null); // Limpiar la selección
      setQuantity(1); // Reiniciar la cantidad
    }
  };

  // Manejar creación de la orden
  const handleCreateOrder = async () => {
    try {
      await createNewOrder(receiver, comments);
      alert('Orden creada exitosamente');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Orden</h2>

      {/* Selección de UDP */}
      <div className="mb-4">
        <label className="block font-medium">UDP</label>
        <select
          className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
          value={selectedUdp?.id || ''}
          onChange={(e) => setSelectedUdp(udpList.find((udp) => udp.id === parseInt(e.target.value)))}
        >
          <option value="">Seleccione una UDP</option>
          {udpList.map((udp) => (
            <option key={udp.id} value={udp.id}>
              {udp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Selección de Producto */}
      <div className="mb-4">
        <label className="block font-medium">Producto</label>
        <select
          className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
          onChange={(e) => setSelectedProduct(products.find((prod) => prod.id_Product === parseInt(e.target.value)))}
        >
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product.id_Product} value={product.id_Product}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cantidad y Unidad de Medida */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium">Cantidad</label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium">Unidad de Medida</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
            value={unitOfMeasure}
            onChange={(e) => setUnitOfMeasure(e.target.value)}
          />
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleAddProduct}
      >
        Agregar Producto
      </button>

      {/* Mostrar Carrito */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Carrito de Productos</h3>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>{item.product.name} - {item.quantity} {item.unitOfMeasure}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeProductFromCart(item.product.id_Product)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Campos adicionales para la Orden */}
      <div className="mt-4">
        <label className="block font-medium">Receptor</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Comentarios</label>
        <textarea
          className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
          rows={4}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        ></textarea>
      </div>

      {/* Botón para Crear Orden */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
        onClick={handleCreateOrder}
        disabled={loading}
      >
        {loading ? 'Creando Orden...' : 'Crear Orden'}
      </button>
    </div>
  );
};

export default OrderForm;
