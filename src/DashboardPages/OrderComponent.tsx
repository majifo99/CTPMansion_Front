import React, { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders'; // Usamos el hook de órdenes
import { Order, OrderDetail } from '../types/Order'; // Importar los tipos necesarios

const OrderComponent: React.FC = () => {
  const { fetchOrdersByProductName, createOrder } = useOrders(); // Usamos el hook
  const [searchTerm, setSearchTerm] = useState<string>(''); // Término de búsqueda
  const [selectedProducts, setSelectedProducts] = useState<OrderDetail[]>([]); // Productos seleccionados
  const [quantity, setQuantity] = useState<string>(''); // Cantidad
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>(''); // Unidad de medida
  const [requesterArea, setRequesterArea] = useState<string>(''); // Área de donde proviene la solicitud
  const [receiver, setReceiver] = useState<string>(''); // Receptor de la orden
  const [comments, setComments] = useState<string>(''); // Comentarios adicionales
  const [userId, setUserId] = useState<number | null>(null); // ID del usuario logueado
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [message, setMessage] = useState<string>(''); // Mensaje de éxito o error

  useEffect(() => {
    // Simulación de obtener el userId del usuario logueado, reemplazar con lógica real
    setUserId(1);
  }, []);

  // Función para agregar un producto a la lista de productos seleccionados
  const addProduct = async () => {
    if (!searchTerm || !quantity || !unitOfMeasure) {
      setMessage('Por favor, completa todos los campos para agregar un producto.');
      return;
    }

    try {
      setLoading(true);
      await fetchOrdersByProductName(searchTerm);

      const newOrderDetail: OrderDetail = {
        id: Math.random(),
        orderDetailId: 0,
        orderId: 0,
        productId: Math.random(), // Genera un ID temporal o usa el ID real que venga de la búsqueda
        product: { id_Product: Math.random(), name: searchTerm },
        quantity: parseInt(quantity),
        unitOfMeasure,
        received: false,
      };

      setSelectedProducts([...selectedProducts, newOrderDetail]);
      setSearchTerm('');
      setQuantity('');
      setUnitOfMeasure('');
      setMessage('Producto agregado correctamente');
    } catch (err) {
      setMessage('Producto no encontrado en las órdenes.');
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un producto de la lista de productos seleccionados
  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(item => item.product.id_Product !== productId));
  };

  // Función para manejar la edición inline de los productos
  const handleEditProduct = (index: number, field: string, value: string) => {
    const updatedProducts = [...selectedProducts];
    if (field === 'product') {
      updatedProducts[index].product.name = value;
    } else if (field === 'quantity') {
      updatedProducts[index].quantity = parseInt(value);
    } else if (field === 'unitOfMeasure') {
      updatedProducts[index].unitOfMeasure = value;
    }
    setSelectedProducts(updatedProducts);
  };

  // Validación y envío de la orden
  const handleSubmitOrder = async () => {
    if (!requesterArea || !receiver || !comments || selectedProducts.length === 0) {
      setMessage('Por favor, completa todos los campos y selecciona al menos un producto.');
      return;
    }

    const newOrder: Omit<Order, 'id'> = {
      orderDate: new Date().toISOString(),
      userId: userId || 0,
      requesterArea,
      orderDetails: selectedProducts,
      receiver,
      comments,
    };

    try {
      setLoading(true);
      await createOrder(newOrder);
      setMessage('Orden creada exitosamente');
      setSelectedProducts([]);
      setRequesterArea('');
      setReceiver('');
      setComments('');
    } catch (error) {
      setMessage('Ocurrió un error al crear la orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear Orden de Compra</h2>

      {/* Mensaje de éxito o error */}
      {message && <p className="mb-4 text-center text-sm text-blue-600">{message}</p>}

      <div className="mb-4 flex space-x-4">
        <div className="flex-1 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Buscar Producto</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Escribe el nombre del producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Cantidad"
            min="1"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Unidad de Medida</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={unitOfMeasure}
            onChange={(e) => setUnitOfMeasure(e.target.value)}
            placeholder="Unidad de Medida"
          />
        </div>

        <div className="flex items-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addProduct}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Añadir Producto'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Productos Seleccionados</h3>
        {selectedProducts.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">Producto</th>
                <th className="border border-gray-300 p-2 text-left">Cantidad</th>
                <th className="border border-gray-300 p-2 text-left">Unidad de Medida</th>
                <th className="border border-gray-300 p-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((item, index) => (
                <tr key={item.product.id_Product}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={item.product.name}
                      onChange={(e) => handleEditProduct(index, 'product', e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleEditProduct(index, 'quantity', e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={item.unitOfMeasure}
                      onChange={(e) => handleEditProduct(index, 'unitOfMeasure', e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => removeProduct(item.product.id_Product)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No se han añadido productos.</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Área Solicitante</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={requesterArea}
          onChange={(e) => setRequesterArea(e.target.value)}
          placeholder="Área de donde proviene la solicitud"
        />
      </div>

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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
        <textarea
          className="w-full p-2 border rounded"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comentarios adicionales"
        />
      </div>

      <button
        onClick={handleSubmitOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 w-full"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Orden'}
      </button>
    </div>
  );
};

export default OrderComponent;
