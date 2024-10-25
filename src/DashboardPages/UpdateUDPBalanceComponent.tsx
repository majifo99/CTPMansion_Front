import React, { useState } from 'react';
import { useUDPs } from '../hooks/useUDP';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUDPBalanceComponent: React.FC = () => {
  const { udps, selectedUdp, loading, error, fetchUdpById, updateUDPBalance } = useUDPs();
  const [amount, setAmount] = useState<string>(''); // Cambiar a cadena vacía para que esté vacío inicialmente
  const [isAdding, setIsAdding] = useState<boolean>(true); // True si se añade, false si se deduce

  // Manejador para seleccionar una UDP
  const handleSelectUdp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const udpId = parseInt(e.target.value);
    if (!isNaN(udpId)) {
      fetchUdpById(udpId);
    }
  };

  // Validación para que la cantidad no sea negativa
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) < 0) {
      toast.error('La cantidad no puede ser negativa.');
    } else {
      setAmount(value);
    }
  };

  // Manejador para actualizar el balance de la UDP
  const handleUpdateBalance = () => {
    if (!selectedUdp) return;

    const amountValue = parseFloat(amount); // Convertir cadena a número
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error('La cantidad debe ser un número válido mayor a 0.');
      return;
    }

    const newBalance = isAdding
      ? selectedUdp.balance + amountValue
      : selectedUdp.balance - amountValue;

    if (!isAdding && selectedUdp.balance < amountValue) {
      toast.error('No puedes deducir más de lo que hay en el balance.');
      return;
    }

    // Actualizar el balance
    updateUDPBalance(selectedUdp.id_UDP, newBalance)
      .then(() => {
        toast.success('Balance actualizado exitosamente.');
        setAmount(''); // Reiniciar la cantidad después de la operación
      })
      .catch(() => {
        toast.error('Error al actualizar el balance. Inténtalo nuevamente.');
      });
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
              {udp.title} (Balance Actual: {udp.balance} colones)
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar balance actual */}
      {selectedUdp && (
        <div className="mb-4">
          <p className="text-lg">
            Balance Actual: <strong>{selectedUdp.balance} colones</strong>
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
            onClick={() => setIsAdding(true)}
            className={`p-2 w-full rounded ${isAdding ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Agregar
          </button>
          <button
            onClick={() => setIsAdding(false)}
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
