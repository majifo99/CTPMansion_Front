import { useState, useEffect } from 'react';
import { 
  getUDPBalanceHistory, 
  getUDPBalanceHistoryByDateRange, 
  getUDPBalanceHistoryByType,
  getUDPBalanceMonthlyChartData,
  getUDPBalanceTypeChartData,
  UDPBalanceTransaction,
  MonthlyChartData,
  TransactionTypeChartData
} from '../services/udpBalanceService';
import { updateUDPBalance, BalanceUpdateDto } from '../services/udpService';

export const useUDPBalanceHistory = (udpId: number) => {
  const [transactions, setTransactions] = useState<UDPBalanceTransaction[]>([]);
  const [monthlyChartData, setMonthlyChartData] = useState<MonthlyChartData[]>([]);
  const [typeChartData, setTypeChartData] = useState<TransactionTypeChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());

  // Cargar el historial de transacciones
  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUDPBalanceHistory(udpId);
      setTransactions(data);
      // Actualizar el tiempo de última actualización
      setLastUpdateTime(Date.now());
      return data;
    } catch (err) {
      setError('Error al cargar el historial de transacciones.');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Filtrar transacciones por rango de fechas
  const filterByDateRange = async (startDate: string, endDate: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUDPBalanceHistoryByDateRange(udpId, startDate, endDate);
      setTransactions(data);
      return data;
    } catch (err) {
      setError('Error al filtrar transacciones por fechas.');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Filtrar transacciones por tipo
  const filterByType = async (transactionType: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUDPBalanceHistoryByType(udpId, transactionType);
      setTransactions(data);
      return data;
    } catch (err) {
      setError('Error al filtrar transacciones por tipo.');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos para gráfica mensual
  const loadMonthlyChartData = async (year?: number) => {
    setLoading(true);
    setError(null);
    try {
      
      
      const data = await getUDPBalanceMonthlyChartData(udpId, year);
      
      // Procesar los datos para asegurar que las deducciones se muestren correctamente
      const processedData = data.map(item => ({
        ...item,
        // Asegurarnos que expenses sea siempre un valor positivo para visualización
        expenses: Math.abs(item.expenses || 0),
        // Recalcular el balance neto para estar seguros
        net: item.income - Math.abs(item.expenses || 0)
      }));
      
      setMonthlyChartData(processedData);
      return processedData;
    } catch (err) {
      setError('Error al cargar datos para la gráfica mensual.');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos para gráfica por tipo
  const loadTypeChartData = async (isExpense: boolean = true) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUDPBalanceTypeChartData(udpId, isExpense);
      setTypeChartData(data);
      return data;
    } catch (err) {
      setError('Error al cargar datos para la gráfica por tipo.');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Registrar una nueva transacción
  const addTransaction = async (balanceUpdate: BalanceUpdateDto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateUDPBalance(udpId, balanceUpdate);
      
      // Recargar las transacciones Y los datos de las gráficas después de agregar una nueva transacción
      await loadTransactions();
      
      // También actualizamos los datos de las gráficas para el año actual
      const currentYear = new Date().getFullYear();
      await loadMonthlyChartData(currentYear);
      
      // Si es un gasto, actualizamos también los datos de la gráfica de tipos
      if (balanceUpdate.amount < 0) {
        await loadTypeChartData(true); // true = gastos
      } else {
        await loadTypeChartData(false); // false = ingresos
      }
      
      // Actualizar la marca de tiempo
      setLastUpdateTime(Date.now());
      
      return result;
    } catch (err) {
      setError('Error al registrar la nueva transacción.');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar las transacciones al montar el componente o cuando cambia la UDP
  useEffect(() => {
    if (udpId) {
      const loadInitialData = async () => {
        await loadTransactions();
        await loadMonthlyChartData(new Date().getFullYear());
      };
      
      loadInitialData();
    }
  }, [udpId]);

  return {
    transactions,
    monthlyChartData,
    typeChartData,
    loading,
    error,
    loadTransactions,
    filterByDateRange,
    filterByType,
    loadMonthlyChartData,
    loadTypeChartData,
    addTransaction,
    lastUpdateTime // Exportamos esto para que pueda ser usado como dependencia en useEffect
  };
};