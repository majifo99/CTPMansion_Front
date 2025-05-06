import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts';
import { useUDPBalanceHistory } from '../hooks/useUDPBalanceHistory';
import { MonthlyChartData } from '../services/udpBalanceService';

interface UDPBalanceChartProps {
  udpId: number;
  year?: number;
  refreshTrigger?: number;
  currentBalance?: number;
  showControls?: boolean;
}

const UDPBalanceChart: React.FC<UDPBalanceChartProps> = ({ 
  udpId, 
  year, 
  refreshTrigger, 
  currentBalance = 0,
  showControls = true
}) => {
  const { 
    loading, 
    error, 
    loadMonthlyChartData,
    loadTransactions,
    monthlyChartData,
    lastUpdateTime
  } = useUDPBalanceHistory(udpId);

  const [selectedYear, setSelectedYear] = useState<number>(year || new Date().getFullYear());
  const [chartType, setChartType] = useState<'line' | 'bar' | 'composed'>('composed');
  const [processedChartData, setProcessedChartData] = useState<MonthlyChartData[]>([]);
  
  // Estados adicionales para los cálculos
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [netBalance, setNetBalance] = useState<number>(currentBalance);
  
  // Flag para evitar actualizaciones infinitas
  const isProcessingData = useRef(false);
  const lastProcessedData = useRef<string>("");
  const lastCurrentBalance = useRef<number>(currentBalance);

  // Función para forzar recarga de datos
  const forceReload = async () => {
    console.log("Forzando recarga de datos para UDP:", udpId);
    try {
      await loadTransactions();
      const data = await loadMonthlyChartData(selectedYear);
      console.log("Datos recargados:", data);
    } catch (err) {
      console.error("Error al recargar datos:", err);
    }
  };
  
  // Cargar datos cuando cambie el ID de UDP, el año seleccionado o el refreshTrigger
  useEffect(() => {
    if (udpId) {
      console.log("Cargando datos de gráfica mensual para UDP:", udpId, "Año:", selectedYear);
      loadMonthlyChartData(selectedYear);
    }
    // Importante: NO incluir lastUpdateTime en las dependencias para evitar actualizaciones infinitas
  }, [udpId, selectedYear, refreshTrigger]);

  // Actualizamos el netBalance cuando cambie el currentBalance
  useEffect(() => {
    if (lastCurrentBalance.current !== currentBalance) {
      setNetBalance(currentBalance);
      lastCurrentBalance.current = currentBalance;
    }
  }, [currentBalance]);

  // Procesar los datos de la gráfica y calcular totales
  useEffect(() => {
    // Verificar si los datos son iguales a los procesados anteriormente
    const currentDataString = JSON.stringify(monthlyChartData);
    if (isProcessingData.current || 
        (currentDataString === lastProcessedData.current && 
         lastCurrentBalance.current === currentBalance)) {
      return; // Evitar procesamiento duplicado
    }

    if (monthlyChartData && monthlyChartData.length > 0) {
      isProcessingData.current = true;
      console.log("Procesando datos de gráfica con balance actual:", currentBalance);
      
      // Primero calculamos el total de ingresos de los datos mensuales
      const incomeTotal = monthlyChartData.reduce((acc, item) => acc + (Number(item.income) || 0), 0);
      setTotalIncome(incomeTotal);
      
      // Deducimos los gastos totales: Ingresos Totales - Balance Actual = Gastos Totales
      const calculatedExpenses = incomeTotal - currentBalance;
      setTotalExpenses(calculatedExpenses > 0 ? calculatedExpenses : 0);
      
      console.log(`Totales calculados: Ingresos=${incomeTotal}, Gastos=${calculatedExpenses}, Balance Actual=${currentBalance}`);
      
      // Ahora procesamos los datos mensuales
      const processedData = monthlyChartData.map(item => {
        const income = Number(item.income) || 0;
        // Para los gastos mensuales, mantenemos la proporción respecto al total
        const expenses = item.expenses || 0;
        
        return {
          ...item,
          income: income,
          expenses: Math.abs(expenses),
          // El neto mensual sigue siendo la diferencia entre ingresos y gastos de ese mes
          net: income - Math.abs(expenses)
        };
      });
      
      console.log("Datos procesados:", processedData);
      setProcessedChartData(processedData);
      
      // Guardar estado para comparaciones futuras
      lastProcessedData.current = currentDataString;
      lastCurrentBalance.current = currentBalance;
      isProcessingData.current = false;
    } else {
      setProcessedChartData([]);
      setTotalIncome(0);
      setTotalExpenses(0);
      lastProcessedData.current = currentDataString;
    }
  }, [monthlyChartData, currentBalance]);

  // Generar años para el selector (desde 2020 hasta año actual)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

  // Formateador para valores de dinero en Costa Rica (colones)
  const formatCurrency = (value: number) => {
    return `₡${value.toLocaleString('es-CR')}`;
  };

  // Renderizar el gráfico correspondiente al tipo seleccionado
  const renderChart = () => {
    if (loading) {
      return <div className="text-center py-10">Cargando datos...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    if (!processedChartData || processedChartData.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          No hay datos disponibles para mostrar en este período.
          <button 
            onClick={forceReload}
            className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Recargar Datos
          </button>
        </div>
      );
    }

    // Verificar que los datos son los esperados
    console.log("Datos para gráfica:", processedChartData);

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                labelFormatter={(label) => `Mes: ${label}`} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                name="Ingresos" 
                stroke="#4CAF50" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                name="Gastos" 
                stroke="#F44336" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="net" 
                name="Balance Neto" 
                stroke="#2196F3" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processedChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                labelFormatter={(label) => `Mes: ${label}`} 
              />
              <Legend />
              <Bar dataKey="income" name="Ingresos" fill="#4CAF50" />
              <Bar dataKey="expenses" name="Gastos" fill="#F44336" />
              <Bar dataKey="net" name="Balance Neto" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'composed':
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={processedChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                labelFormatter={(label) => `Mes: ${label}`} 
              />
              <Legend />
              <Bar dataKey="income" name="Ingresos" fill="#4CAF50" />
              <Bar dataKey="expenses" name="Gastos" fill="#F44336" />
              <Line 
                type="monotone" 
                dataKey="net" 
                name="Balance Neto" 
                stroke="#2196F3" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="net" 
                fill="#2196F3" 
                stroke="none" 
                fillOpacity={0.2} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Solo mostramos el título y controles si se solicita */}
      {showControls && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Seguimiento de Balance {selectedYear}</h3>
          
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="mb-2 md:mb-0">
              <label className="mr-2 font-medium text-gray-700">Año:</label>
              <select 
                className="p-2 border border-gray-300 rounded-md bg-white"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={forceReload}
                className="p-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-md bg-blue-50 hover:bg-blue-100 mr-4"
              >
                Recargar Datos
              </button>

              <label className="mr-2 font-medium text-gray-700">Tipo de Gráfica:</label>
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setChartType('composed')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                    chartType === 'composed'
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Combinada
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('line')}
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    chartType === 'line'
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Líneas
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('bar')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                    chartType === 'bar'
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Barras
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {renderChart()}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <h4 className="text-green-700 font-medium">Ingresos</h4>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
          <h4 className="text-red-700 font-medium">Gastos</h4>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <h4 className="text-blue-700 font-medium">Balance</h4>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatCurrency(netBalance)}
          </p>
        </div>
      </div>

      {/* Indicador de última actualización */}
      <div className="mt-4 text-xs text-gray-400 text-right">
        Última actualización: {new Date(lastUpdateTime).toLocaleTimeString()}
      </div>
    </div>
  );
};

// Componente para mostrar la tabla de datos detallados por separado
export const UDPBalanceDataTable: React.FC<{
  udpId: number;
  refreshTrigger?: number;
  currentBalance?: number;
}> = ({ udpId, currentBalance = 0 }) => {
  const { 
    loading, 
    error, 
    monthlyChartData,
    lastUpdateTime
  } = useUDPBalanceHistory(udpId);

  const [processedChartData, setProcessedChartData] = useState<MonthlyChartData[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [netBalance, setNetBalance] = useState<number>(currentBalance);

  // Flag para evitar actualizaciones infinitas
  const isProcessingData = useRef(false);
  const lastProcessedData = useRef<string>("");
  const lastCurrentBalance = useRef<number>(currentBalance);

  // Formateador para valores de dinero
  const formatCurrency = (value: number) => {
    return `₡${value.toLocaleString('es-CR')}`;
  };

  // Procesar los datos para la tabla usando la misma lógica del gráfico
  useEffect(() => {
    // Verificar si los datos son iguales a los procesados anteriormente
    const currentDataString = JSON.stringify(monthlyChartData);
    if (isProcessingData.current || 
        (currentDataString === lastProcessedData.current && 
         lastCurrentBalance.current === currentBalance)) {
      return; // Evitar procesamiento duplicado
    }
    
    if (monthlyChartData && monthlyChartData.length > 0) {
      isProcessingData.current = true;
      console.log("Procesando datos de tabla con balance actual:", currentBalance);
      
      // Primero calculamos el total de ingresos de los datos mensuales
      const incomeTotal = monthlyChartData.reduce((acc, item) => acc + (Number(item.income) || 0), 0);
      setTotalIncome(incomeTotal);
      
      // Deducimos los gastos totales: Ingresos Totales - Balance Actual = Gastos Totales
      const calculatedExpenses = incomeTotal - currentBalance;
      setTotalExpenses(calculatedExpenses > 0 ? calculatedExpenses : 0);
      
      // Actualizamos el balance neto para que sea igual al balance actual
      setNetBalance(currentBalance);

      console.log(`Totales calculados (tabla): Ingresos=${incomeTotal}, Gastos=${calculatedExpenses}, Balance Actual=${currentBalance}`);
      
      // Distribuir los gastos calculados proporcionalmente entre los meses según los ingresos
      const totalMonthlyIncome = incomeTotal > 0 ? incomeTotal : 1; // Evitar división por cero
      
      const processedData = monthlyChartData.map(item => {
        const income = Number(item.income) || 0;
        
        // Calculamos los gastos de este mes proporcionalmente a su contribución al ingreso total
        // Si el ingreso total es 0, distribuimos los gastos equitativamente
        const proportion = totalMonthlyIncome > 0 ? income / totalMonthlyIncome : 1 / monthlyChartData.length;
        const monthlyExpense = calculatedExpenses * proportion;
        
        // El neto mensual es la diferencia entre ingresos y gastos de ese mes
        const monthlyNet = income - monthlyExpense;
        
        return {
          ...item,
          income: income,
          expenses: monthlyExpense,
          net: monthlyNet
        };
      });
      
      setProcessedChartData(processedData);
      
      // Guardar estado para comparaciones futuras
      lastProcessedData.current = currentDataString;
      lastCurrentBalance.current = currentBalance;
      isProcessingData.current = false;
    } else {
      setProcessedChartData([]);
      setTotalIncome(0);
      setTotalExpenses(0);
      setNetBalance(currentBalance);
      lastProcessedData.current = currentDataString;
      lastCurrentBalance.current = currentBalance;
    }
  }, [monthlyChartData, currentBalance]);

  if (loading) {
    return <div className="text-center py-6">Cargando datos detallados...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">{error}</div>;
  }

  if (!monthlyChartData || monthlyChartData.length === 0) {
    return <div className="text-center py-6 text-gray-500">No hay datos disponibles para mostrar.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Datos Mensuales Detallados</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Mes</th>
              <th className="border border-gray-300 px-4 py-2">Ingresos</th>
              <th className="border border-gray-300 px-4 py-2">Gastos</th>
              <th className="border border-gray-300 px-4 py-2">Neto</th>
            </tr>
          </thead>
          <tbody>
            {processedChartData.map((item, index) => (
              <tr key={item.month} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 px-4 py-2">{item.month}</td>
                <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.income || 0)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.expenses || 0)}</td>
                <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.net || 0)}</td>
              </tr>
            ))}
            <tr className="bg-blue-50 font-semibold">
              <td className="border border-gray-300 px-4 py-2">Total</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600">{formatCurrency(totalIncome)}</td>
              <td className="border border-gray-300 px-4 py-2 text-red-600">{formatCurrency(totalExpenses)}</td>
              <td className="border border-gray-300 px-4 py-2 text-blue-600">{formatCurrency(netBalance)}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="mt-2 text-xs text-gray-400 text-right">
          Última actualización: {new Date(lastUpdateTime).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default UDPBalanceChart;