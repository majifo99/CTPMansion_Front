import React, { useState } from 'react';
import { useUDPs } from '../hooks/useUDP';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUDPBalanceComponent: React.FC = () => {
  const { udps, selectedUdp, loading, error, fetchUdpById, updateUDPBalance } = useUDPs();
  const [amount, setAmount] = useState<string>(''); // Mantener como cadena vacía inicialmente
  const [isAdding, setIsAdding] = useState<boolean>(true); // True si se añade, false si se deduce

  // Manejador para seleccionar una UDP
  const handleSelectUdp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const udpId = parseInt(e.target.value);
    console.log('UDP seleccionada con ID:', udpId);
    if (!isNaN(udpId)) {
      fetchUdpById(udpId);
    }
  };

  // Validación para que la cantidad no sea negativa
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Cantidad ingresada:', value);
    if (parseFloat(value) < 0) {
      toast.error('La cantidad no puede ser negativa.');
    } else {
      setAmount(value);
    }
  };

  // Manejador para actualizar el balance de la UDP
  const handleUpdateBalance = async () => {
    console.log('Botón "Actualizar Balance" presionado');
    if (!selectedUdp) {
      console.log('No se ha seleccionado ninguna UDP');
      return;
    }

    const amountValue = parseFloat(amount); // Convertir cadena a número
    console.log('Cantidad para actualizar el balance:', amountValue);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error('La cantidad debe ser un número válido mayor a 0.');
      return;
    }

    const newBalance = isAdding
      ? selectedUdp.balance + amountValue
      : selectedUdp.balance - amountValue;

    console.log(`Actualizando balance de UDP con ID ${selectedUdp.id_UDP}. Nuevo balance: ${newBalance}`);

    try {
      await updateUDPBalance(selectedUdp.id_UDP, newBalance);
      console.log('Balance actualizado exitosamente en el servidor');
      toast.success('Balance actualizado exitosamente.');
      setAmount(''); // Reiniciar la cantidad después de la operación
    } catch (error) {
      console.error('Error al actualizar el balance:', error);
      toast.error('Error al actualizar el balance. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Administrar Balance de UDP</h2>

      {/* ToastContainer para mostrar las notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Selector de UDP */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Seleccionar UDP</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handleSelectUdp}
          defaultValue=""
        >
          <option value="">-- Selecciona una UDP --</option>
          {udps.map(udp => (
            <option key={udp.id_UDP} value={udp.id_UDP}>
              {udp.title} (Balance Actual: ₡{udp.balance})
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar balance actual con color condicional solo en el monto */}
      {selectedUdp && (
        <div className="mb-4">
          <p className="text-lg">
            Balance Actual: 
            <strong>
              <span style={{ color: selectedUdp.balance < 0 ? 'red' : 'green' }}>
                ₡{selectedUdp.balance}
              </span>
            </strong>
          </p>
        </div>
      )}

      {/* Campo de cantidad */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Cantidad</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={amount} // El valor ahora es una cadena vacía por defecto
          onChange={handleAmountChange} // Validación de número negativo
          placeholder="Ingrese el monto"
        />
      </div>

      {/* Botones para elegir si se añade o deduce el balance */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Acción</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              console.log('Acción seleccionada: Agregar');
              setIsAdding(true);
            }}
            className={`p-2 w-full rounded ${isAdding ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Agregar
          </button>
          <button
            onClick={() => {
              console.log('Acción seleccionada: Deducir');
              setIsAdding(false);
            }}
            className={`p-2 w-full rounded ${!isAdding ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Deducir
          </button>
        </div>
      </div>

      {/* Botón para actualizar el balance */}
      <button
        onClick={handleUpdateBalance}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Actualizar Balance
      </button>

      {/* Mostrar errores o resultados */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {loading && <p className="text-gray-500 mt-4">Actualizando balance...</p>}
    </div>
  );
};

export default UpdateUDPBalanceComponent;
