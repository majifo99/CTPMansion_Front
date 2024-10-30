import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { Order, OrderDetail, Product } from '../types/Order';
import { useAuth } from '../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderComponent: React.FC = () => {
  const { handleCreateOrder } = useOrders(); // Cambiado de createOrder a handleCreateOrder
  const { user } = useAuth();

  const [selectedProducts, setSelectedProducts] = useState<OrderDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>('');
  const [requesterArea, setRequesterArea] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');
  const [comments, setComments] = useState<string>('');

  const addProduct = () => {
    if (!searchTerm || !quantity || !unitOfMeasure) {
      toast.error('Por favor, completa todos los campos para agregar un producto.');
      return;
    }

    const newProduct: Product = { name: searchTerm };
    const newOrderDetail: OrderDetail = {
      product: newProduct,
      quantity: parseInt(quantity),
      unitOfMeasure,
      received: false,
    };

    setSelectedProducts([...selectedProducts, newOrderDetail]);
    setSearchTerm('');
    setQuantity('');
    setUnitOfMeasure('');
    toast.success('Producto añadido exitosamente');
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...selectedProducts];
    if (field === 'name') {
      updatedProducts[index].product.name = value;
    } else if (field === 'quantity') {
      updatedProducts[index].quantity = parseInt(value);
    } else if (field === 'unitOfMeasure') {
      updatedProducts[index].unitOfMeasure = value;
    }
    setSelectedProducts(updatedProducts);
  };

  const handleSubmitOrder = async () => {
    if (!requesterArea || !receiver || !comments || selectedProducts.length === 0) {
      toast.error('Todos los campos y al menos un producto son requeridos.');
      return;
    }

    if (!user) {
      toast.error('No se encontró el usuario autenticado.');
      return;
    }

    const newOrder: Order = {
      orderDate: new Date().toISOString(),
      userId: user.id,
      requesterArea,
      orderDetails: selectedProducts,
      receiver,
      comments,
    };

    try {
      await handleCreateOrder(newOrder); // Cambiado de createOrder a handleCreateOrder
      toast.success('Orden creada exitosamente');
      setRequesterArea('');
      setReceiver('');
      setComments('');
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error al crear la orden:', error);
      toast.error('Ocurrió un error al crear la orden');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer /> {/* Contenedor de Toast */}
      <h2 className="text-2xl font-semibold mb-4">Crear Orden de Compra</h2>

      {/* Formulario para añadir productos */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded col-span-1 md:col-span-2"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded col-span-1"
        />
        <input
          type="text"
          placeholder="Unidad de Medida"
          value={unitOfMeasure}
          onChange={(e) => setUnitOfMeasure(e.target.value)}
          className="p-2 border rounded col-span-1"
        />
        <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-4">
          Añadir Producto
        </button>
      </div>

      {/* Lista de productos seleccionados */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Productos Seleccionados</h3>
        {selectedProducts.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Producto</th>
                <th className="border border-gray-300 p-2">Cantidad</th>
                <th className="border border-gray-300 p-2">Unidad de Medida</th>
                <th className="border border-gray-300 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={product.product.name}
                      onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={product.unitOfMeasure}
                      onChange={(e) => handleProductChange(index, 'unitOfMeasure', e.target.value)}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() =>
                        setSelectedProducts(selectedProducts.filter((_, i) => i !== index))
                      }
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

      {/* Otros campos del formulario de orden */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Área Solicitante"
          value={requesterArea}
          onChange={(e) => setRequesterArea(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Receptor"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Comentarios"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button onClick={handleSubmitOrder} className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4">
        Enviar Orden
      </button>
    </div>
  );
};

export default OrderComponent;
