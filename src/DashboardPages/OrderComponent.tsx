import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts'; // Hook para obtener los productos
import { useOrders } from '../hooks/useOrders';     // Hook para gestionar las órdenes
import { useAuth } from '../contexts/AuthContext';  // Para obtener los datos del usuario logueado
import { Product } from '../types/Product';
import { OrderDetail } from '../types/Order';
import { useUDPs } from '../hooks/useUDPs'; // Hook para obtener las UDPs

const OrderComponent: React.FC = () => {
  const { products, loading: loadingProducts, error: errorProducts } = useProducts();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const { udps, loading: loadingUDPs, error: errorUDPs } = useUDPs();

  const [cart, setCart] = useState<OrderDetail[]>([]); // Carrito de productos agregados
  const [selectedUDP, setSelectedUDP] = useState<number | null>(null); // UDP seleccionada
  const [receiver, setReceiver] = useState<string>(''); // Receptor de la orden
  const [comments, setComments] = useState<string>(''); // Comentarios de la orden

  // Función para agregar productos al carrito
  const addToCart = (product: Product, quantity: number) => {
    const orderDetail: OrderDetail = {
      id: 0,
      orderDetailId: 0,
      orderId: 0,
      productId: product.id_Product,
      product: product,
      quantity: quantity,
      unitOfMeasure: 'pcs', // Aquí puedes poner la unidad de medida real si la tienes
      received: null
    };
    setCart((prevCart) => [...prevCart, orderDetail]);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
  };

  // Función para crear la orden de compra
  const handleSubmitOrder = async () => {
    if (!selectedUDP || !user) {
      alert('Selecciona una UDP y asegúrate de estar logueado');
      return;
    }

    const newOrder = {
      orderDate: new Date().toISOString(),
      userId: user.id,
      udpId: selectedUDP,
      requester: user.name + ' ' + user.lastName, // Usuario logueado como solicitante
      udp: '', // Este campo lo puedes ajustar según tu modelo de datos
      orderDetails: cart,
      receiver,
      comments
    };

    try {
      await createOrder(newOrder);
      alert('Orden creada exitosamente');
      setCart([]); // Limpiar el carrito después de la creación
    } catch (error) {
      console.error('Error al crear la orden', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Orden de Compra</h2>

      {/* Selección de UDP */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona una UDP</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedUDP || ''}
          onChange={(e) => setSelectedUDP(parseInt(e.target.value))}
        >
          <option value="">Selecciona una UDP</option>
          {loadingUDPs ? (
            <option>Cargando UDPs...</option>
          ) : (
            udps.map((udp) => (
              <option key={udp.id_UDP} value={udp.id_UDP}>
                {udp.name}
              </option>
            ))
          )}
        </select>
        {errorUDPs && <p className="text-red-500">{errorUDPs}</p>}
      </div>

      {/* Lista de productos */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Selecciona Productos</h3>
        {loadingProducts ? (
          <p>Cargando productos...</p>
        ) : errorProducts ? (
          <p className="text-red-500">{errorProducts}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id_Product} className="border p-4 rounded-lg">
                <h4 className="font-bold">{product.name}</h4>
                <p className="text-sm">{product.description}</p>
                <input
                  type="number"
                  placeholder="Cantidad"
                  className="mt-2 p-2 border rounded w-full"
                  onChange={(e) => addToCart(product, parseInt(e.target.value))}
                />
                <button
                  onClick={() => removeFromCart(product.id_Product)}
                  className="text-red-500 mt-2 underline"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Información del receptor */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Receptor</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Nombre del receptor"
        />
      </div>

      {/* Comentarios */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
        <textarea
          className="w-full p-2 border rounded"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comentarios adicionales"
        />
      </div>

      {/* Mostrar carrito de compra */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Carrito de Compras</h3>
        <ul className="list-disc pl-5">
          {cart.map((item) => (
            <li key={item.productId}>
              {item.product.name} - Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Botón para enviar la orden */}
      <button
        onClick={handleSubmitOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Enviar Orden
      </button>
    </div>
  );
};

export default OrderComponent;
