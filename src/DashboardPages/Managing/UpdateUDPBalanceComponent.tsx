import React, { useState, useEffect } from 'react';
import { useUDPs } from '../../hooks/useUDP';
import { useUDPBalanceHistory } from '../../hooks/useUDPBalanceHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BalanceUpdateDto } from '../../services/udpService';
import UDPBalanceChart, { UDPBalanceDataTable } from '../../components/UDPBalanceChart';

// Lista de tipos de transacción comunes
const TRANSACTION_TYPES = [
  'Venta',
  'Compra',
  'Donación',
  'Servicio',
  'Pago',
  'Otro'
];

const UpdateUDPBalanceComponent: React.FC = () => {
  const { udps, selectedUdp, loading: udpLoading, error: udpError, fetchUdpById } = useUDPs();
  
  // Estado para la nueva transacción
  const [transactionData, setTransactionData] = useState<BalanceUpdateDto>({
    amount: 0,
    description: '',
    transactionType: 'Venta'
  });

  // Estado para determinar si es ingreso o deducción
  const [transactionMode, setTransactionMode] = useState<'ingreso' | 'deduccion'>('ingreso');
  
  // Estados para el manejo de la UDP seleccionada
  const [selectedUdpId, setSelectedUdpId] = useState<number | null>(null);
  
  // Obtener el hook de historial del balance con la UDP seleccionada
  const { 
    addTransaction, 
    loading: historyLoading, 
    error: historyError, 
    lastUpdateTime
  } = useUDPBalanceHistory(selectedUdpId || 0);
  
  // Estado combinado para loading y error
  const loading = udpLoading || historyLoading;
  const error = udpError || historyError;

  const handleSelectUdp = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const udpId = parseInt(e.target.value);
    if (!isNaN(udpId)) {
      await fetchUdpById(udpId);
      setSelectedUdpId(udpId);
    } else {
      setSelectedUdpId(null);
    }
  };

  const handleTransactionDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      const numValue = parseFloat(value);
      if (numValue < 0) {
        toast.error('Ingrese un valor positivo y seleccione el tipo de transacción (ingreso o deducción).');
        return;
      }
      setTransactionData({ ...transactionData, [name]: numValue });
    } else {
      setTransactionData({ ...transactionData, [name]: value });
    }
  };

  const handleSubmitTransaction = async () => {
    if (!selectedUdp || !selectedUdpId) {
      toast.error('Debes seleccionar una UDP primero.');
      return;
    }
    
    if (transactionData.amount <= 0) {
      toast.error('La cantidad debe ser un número válido mayor a 0.');
      return;
    }
    
    if (!transactionData.description.trim()) {
      toast.error('La descripción es obligatoria.');
      return;
    }

    try {
      // Si es deducción, convertimos el monto a negativo
      const finalAmount = transactionMode === 'deduccion' 
        ? -Math.abs(transactionData.amount) 
        : Math.abs(transactionData.amount);

      // Crear un nuevo objeto para no modificar el estado directamente
      const transactionToSubmit = {
        ...transactionData,
        amount: finalAmount
      };

      // Usar el método del hook de historial para registrar la transacción
      const result = await addTransaction(transactionToSubmit);
      
      if (result) {
        // Recargamos también los datos de la UDP para actualizar el balance mostrado
        await fetchUdpById(selectedUdpId);
        
        toast.success(`${transactionMode === 'ingreso' ? 'Ingreso' : 'Deducción'} registrada exitosamente.`);
        setTransactionData({
          amount: 0,
          description: '',
          transactionType: 'Venta'
        });
      }
    } catch (error) {
      console.error('Error al registrar la transacción:', error);
      toast.error('Error al registrar la transacción. Inténtalo nuevamente.');
    }
  };

  // Actualizar selectedUdpId cuando cambie selectedUdp
  useEffect(() => {
    if (selectedUdp) {
      setSelectedUdpId(selectedUdp.id_UDP);
    }
  }, [selectedUdp]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Administrar Balance de UDP</h2>

      {/* ToastContainer para mostrar las notificaciones */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />

      {/* Selector de UDP */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
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

        {/* Balance actual */}
        {selectedUdp && (
          <div className="text-lg font-semibold mt-4">
            <p className="text-gray-700">
              Balance Actual: 
              <span className={`ml-2 font-bold ${selectedUdp.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                ₡{selectedUdp.balance.toLocaleString('es-CR')}
              </span>
            </p>
          </div>
        )}
      </div>

      {selectedUdpId && selectedUdp && (
        <>
          {/* Contenedor de dos columnas para gráfico y formulario */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Columna izquierda: Gráfica de seguimiento del balance */}
            <div className="md:w-3/5 lg:w-2/3">
              <UDPBalanceChart 
                udpId={selectedUdpId} 
                refreshTrigger={lastUpdateTime} 
                currentBalance={selectedUdp.balance}
              />
            </div>
            
            {/* Columna derecha: Formulario para registrar transacción */}
            <div className="md:w-2/5 lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Registrar Nueva Transacción</h3>
                
                <div className="space-y-4">
                  {/* Selector de tipo de transacción: Ingreso o Deducción */}
                  <div className="flex space-x-4 mb-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ingreso"
                        name="transactionMode"
                        value="ingreso"
                        checked={transactionMode === 'ingreso'}
                        onChange={() => setTransactionMode('ingreso')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor="ingreso" className="ml-2 block text-sm font-medium text-gray-700">
                        Ingreso
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="deduccion"
                        name="transactionMode"
                        value="deduccion"
                        checked={transactionMode === 'deduccion'}
                        onChange={() => setTransactionMode('deduccion')}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                      />
                      <label htmlFor="deduccion" className="ml-2 block text-sm font-medium text-gray-700">
                        Deducción (gasto)
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Transacción</label>
                    <select
                      name="transactionType"
                      value={transactionData.transactionType}
                      onChange={handleTransactionDataChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {TRANSACTION_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₡</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        value={transactionData.amount || ''}
                        onChange={handleTransactionDataChange}
                        className="w-full pl-8 p-2 border border-gray-300 rounded-md"
                        placeholder="Ingrese el monto"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="description"
                      value={transactionData.description}
                      onChange={handleTransactionDataChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Describa la transacción"
                      rows={3}
                    />
                  </div>
                  
                  <button
                    onClick={handleSubmitTransaction}
                    className={`w-full py-2 text-white font-medium rounded-md transition-colors duration-200 ${
                      transactionMode === 'ingreso' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    disabled={loading}
                  >
                    {loading 
                      ? 'Procesando...' 
                      : `${transactionMode === 'ingreso' ? 'Registrar Ingreso' : 'Registrar Deducción'}`
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabla de datos detallados (debajo de ambos componentes) */}
          <UDPBalanceDataTable
            udpId={selectedUdpId}
            refreshTrigger={lastUpdateTime}
            currentBalance={selectedUdp.balance}
          />
        </>
      )}

      {/* Mensajes de error */}
      {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
    </div>
  );
};

export default UpdateUDPBalanceComponent;
