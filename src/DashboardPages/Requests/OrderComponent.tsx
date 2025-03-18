import React, { useState, useEffect, useRef } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import { Order, OrderDetail, Product } from '../../types/OrderTypes';
import { useAuth } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUnitOfMeasure from '../../hooks/useUnitOfMeasure';

const OrderComponent: React.FC = () => {
  const { handleCreateOrder } = useOrders();
  const { handleSearchProducts, searchResults, searchLoading } = useProducts();
  const { user } = useAuth();
  const { unitOfMeasures, loading: loadingUnitOfMeasures } = useUnitOfMeasure();
  
  // Estado local para los resultados de búsqueda
  const [localSearchResults, setLocalSearchResults] = useState<Product[]>([]);
  
  // Add a new state to track the currently selected product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Core state
  const [selectedProducts, setSelectedProducts] = useState<OrderDetail[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [unitOfMeasure, setUnitOfMeasure] = useState<string>('');
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [unitSearchTerm, setUnitSearchTerm] = useState<string>('');
  const [filteredUnits, setFilteredUnits] = useState<any[]>([]);
  const [requesterArea, setRequesterArea] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  
  // UI control
  const [showProductDropdown, setShowProductDropdown] = useState<boolean>(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState<boolean>(false);
  const [localSearchLoading, setLocalSearchLoading] = useState<boolean>(false);
  
  // Refs for handling outside clicks
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const unitDropdownRef = useRef<HTMLDivElement>(null);
  
  // Actualizar resultados locales cuando cambien los del hook
  useEffect(() => {
    console.log("searchResults cambiados:", searchResults);
    if (searchResults) {
      setLocalSearchResults(searchResults);
    }
  }, [searchResults]);
  
  // Handle search term changes and trigger search
  const handleSearchTermChange = async (value: string) => {
    setSearchTerm(value);
    
    if (value.length > 0) {
      setLocalSearchLoading(true);
      try {
        const results = await handleSearchProducts(value);
        console.log("Resultados obtenidos directamente:", results);
        if (results) {
          setLocalSearchResults(results);
        }
        setShowProductDropdown(true);
      } catch (error) {
        console.error("Error al buscar productos:", error);
      } finally {
        setLocalSearchLoading(false);
      }
    } else {
      setShowProductDropdown(false);
      setLocalSearchResults([]);
    }
  };

  // Handle unit of measure search - Modified to not set unitOfMeasure immediately
  const handleUnitSearchTermChange = (value: string) => {
    setUnitSearchTerm(value);
    // Don't set unitOfMeasure here, only when an item is selected
    
    if (value === '') {
      setFilteredUnits(unitOfMeasures);
    } else {
      const filtered = unitOfMeasures.filter(unit => 
        unit.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUnits(filtered);
    }
    
    setShowUnitDropdown(true);
  };

  // Handle unit selection from dropdown - Modified to accept the full unit object
  const handleUnitSelect = (unit: any) => {
    console.log(`Selected unit: ${unit.name} with ID: ${unit.unitOfMeasureId}`);
    
    // Set both the display name and store the ID
    setUnitSearchTerm(unit.name);
    setUnitOfMeasure(unit.name);
    setSelectedUnitId(unit.unitOfMeasureId);
    
    // Close the dropdown
    setShowUnitDropdown(false);
  };

  // Update filtered units when unitOfMeasures changes
  useEffect(() => {
    setFilteredUnits(unitOfMeasures);
  }, [unitOfMeasures]);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target as Node)) {
        setShowProductDropdown(false);
      }
      
      if (unitDropdownRef.current && !unitDropdownRef.current.contains(event.target as Node)) {
        setShowUnitDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Select product from dropdown
  const handleProductSelect = (product: Product) => {
    console.log("Selected product:", product);
    setSearchTerm(product.name);
    // Store the selected product with its ID for later use
    setSelectedProduct(product);
    setShowProductDropdown(false);
  };

  // Add product to order
  const addProduct = () => {
    if (!searchTerm || !quantity || !unitOfMeasure) {
      toast.error('Por favor, completa todos los campos para agregar un producto.');
      return;
    }

    // Use either the selected unit ID or find it from the name
    let unitId = selectedUnitId;
    if (!unitId) {
      const unitOfMeasureObj = unitOfMeasures.find(unit => unit.name === unitOfMeasure);
      if (!unitOfMeasureObj) {
        toast.error('Unidad de medida no válida.');
        return;
      }
      unitId = unitOfMeasureObj.unitOfMeasureId;
    }

    // Use the selected product if available, or create a new one
    const productToAdd = selectedProduct || { name: searchTerm };
    
    const newOrderDetail: OrderDetail = {
      product: productToAdd,
      quantity: parseInt(quantity),
      unitOfMeasureId: unitId,
      received: false,
    };

    console.log("Adding order detail:", newOrderDetail);

    setSelectedProducts([...selectedProducts, newOrderDetail]);
    setSearchTerm('');
    setQuantity('');
    setUnitOfMeasure('');
    setUnitSearchTerm('');
    setSelectedProduct(null);
    setSelectedUnitId(null);
    setLocalSearchResults([]);
    toast.success('Producto añadido exitosamente');
  };

  // Handle product field changes in table
  const handleProductChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...selectedProducts];
    if (field === 'name') {
      updatedProducts[index].product.name = value;
    } else if (field === 'quantity') {
      updatedProducts[index].quantity = parseInt(value);
    } else if (field === 'unitOfMeasureId') {
      const unitObj = unitOfMeasures.find(unit => unit.name === value);
      if (unitObj) {
        updatedProducts[index].unitOfMeasureId = unitObj.unitOfMeasureId;
      }
    }
    setSelectedProducts(updatedProducts);
  };

  // Submit order
  const handleSubmitOrder = async () => {
    if (!requesterArea || !receiver || !comments || selectedProducts.length === 0) {
      toast.error('Todos los campos y al menos un producto son requeridos.');
      return;
    }

    if (!user) {
      toast.error('No se encontró el usuario autenticado.');
      return;
    }

    // Format order details to match API expectations
    const formattedOrderDetails = selectedProducts.map(detail => ({
      product: {
        id_Product: detail.product.id_Product ?? undefined,
        name: detail.product.name
      },
      quantity: detail.quantity,
      unitOfMeasureId: detail.unitOfMeasureId, // Corrected property name
      received: false
    }));

    const newOrder: Order = {
      orderId: 0,
      status: 0,
      orderDate: new Date().toISOString(),
      userId: user.id,
      requesterArea,
      orderDetails: formattedOrderDetails,
      receiver,
      comments,
    };

    console.log("Submitting order:", newOrder);

    try {
      await handleCreateOrder(newOrder);
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
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Crear Orden de Compra</h2>

      {/* Formulario para añadir productos */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Product search with dropdown */}
        <div className="relative col-span-1 md:col-span-2" ref={productDropdownRef}>
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            onFocus={() => searchTerm.length > 0 && setShowProductDropdown(true)}
            className="p-2 border rounded w-full"
          />
          {showProductDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {localSearchLoading || searchLoading ? (
                <div className="p-2 text-center">Buscando productos...</div>
              ) : localSearchResults && localSearchResults.length > 0 ? (
                localSearchResults.map((product) => (
                  <div 
                    key={product.id_Product || Math.random()}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    {product.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500 text-center">
                  {searchTerm.length > 0 ? 
                    'No se encontraron productos. Puedes crear uno nuevo.' : 
                    'Comienza a escribir para buscar'}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Quantity input */}
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded col-span-1"
          min="1"
        />
        
        {/* Unit of measure dropdown with search - MODIFIED */}
        <div className="relative" ref={unitDropdownRef}>
          <input
            type="text"
            placeholder="Unidad de Medida"
            value={unitSearchTerm}
            onChange={(e) => handleUnitSearchTermChange(e.target.value)}
            onClick={() => setShowUnitDropdown(true)}
            className="p-2 border rounded w-full cursor-pointer"
          />
          {showUnitDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {loadingUnitOfMeasures ? (
                <div className="p-2 text-center">Cargando unidades...</div>
              ) : filteredUnits.length > 0 ? (
                filteredUnits.map((unit) => (
                  <div 
                    key={unit.unitOfMeasureId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleUnitSelect(unit)} // Pass the whole unit object
                  >
                    {unit.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500">
                  {unitSearchTerm ? 'No hay unidades que coincidan' : 'No hay unidades disponibles'}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Add product button */}
        <button 
          onClick={addProduct} 
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-4 hover:bg-blue-600 transition-colors"
        >
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
                      min="1"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      title="Unidad de Medida"
                      value={unitOfMeasures.find(u => u.unitOfMeasureId === product.unitOfMeasureId)?.name || ''}
                      onChange={(e) => handleProductChange(index, 'unitOfMeasureId', e.target.value)}
                      className="p-1 border rounded w-full"
                    >
                      {unitOfMeasures.map((unit) => (
                        <option key={`${index}-${unit.unitOfMeasureId}`} value={unit.name}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => setSelectedProducts(selectedProducts.filter((_, i) => i !== index))}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-4">No se han añadido productos.</p>
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
          rows={3}
        />
      </div>

      <button 
        onClick={handleSubmitOrder} 
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-700 transition-colors"
      >
        Enviar Orden
      </button>
    </div>
  );
};

export default OrderComponent;