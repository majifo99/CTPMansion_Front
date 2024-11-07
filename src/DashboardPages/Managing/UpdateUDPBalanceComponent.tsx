import React, { useState } from 'react';
import { useUDPs } from '../../hooks/useUDP';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUDPBalanceComponent: React.FC = () => {
  const { udps, selectedUdp, loading, error, fetchUdpById, updateUDPBalance } = useUDPs();
  const [amount, setAmount] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(true);

  const handleSelectUdp = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const udpId = parseInt(e.target.value);
    if (!isNaN(udpId)) fetchUdpById(udpId);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseFloat(value) < 0) {
      toast.error('La cantidad no puede ser negativa.');
    } else {
      setAmount(value);
    }
  };

  const handleUpdateBalance = async () => {
    if (!selectedUdp) return;
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error('La cantidad debe ser un número válido mayor a 0.');
      return;
    }

    const newBalance = isAdding
      ? selectedUdp.balance + amountValue
      : selectedUdp.balance - amountValue;

    try {
      await updateUDPBalance(selectedUdp.id_UDP, newBalance);
      toast.success('Balance actualizado exitosamente.');
      setAmount('');
    } catch (error) {
      toast.error('Error al actualizar el balance. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Administrar Balance de UDP</h2>

      {/* ToastContainer para mostrar las notificaciones */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />

      {/* Contenedor general a pantalla completa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Selector de UDP */}
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Seleccionar UDP</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Balance actual */}
          {selectedUdp && (
            <div className="text-lg font-semibold">
              <p className="text-gray-700">
                Balance Actual: 
                <span className={`ml-2 font-bold ${selectedUdp.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ₡{selectedUdp.balance}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Sección de actualización de balance */}
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Cantidad</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Ingrese el monto"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Acción</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsAdding(true)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isAdding ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200'
                }`}
              >
                Agregar
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  !isAdding ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-200'
                }`}
              >
                Deducir
              </button>
            </div>
          </div>

          <button
            onClick={handleUpdateBalance}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Actualizar Balance
          </button>
        </div>
      </div>

      {/* Mensajes de error o carga */}
      {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
      {loading && <p className="text-gray-500 mt-6 text-center">Actualizando balance...</p>}
    </div>
  );
};

export default UpdateUDPBalanceComponent;
