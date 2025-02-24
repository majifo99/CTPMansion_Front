import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useRoomsAndRequests } from '../hooks/useRooms';
import { useLabsAndRequests } from '../hooks/useLabs';
import { useOrders } from '../hooks/useOrders';
import { RequestStatus as RoomRequestStatus } from '../types/RoomRequestType';
import { RequestStatus as LabRequestStatus } from '../types/LaboratoryRequestType';
import { RequestStatus as OrderRequestStatus } from '../types/OrderTypes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllRequestsCharts: React.FC = () => {
  const { roomRequests, loading: loadingRooms, error: errorRooms } = useRoomsAndRequests();
  const { labRequests, loading: loadingLabs, error: errorLabs } = useLabsAndRequests();
  const { orders, loading: loadingOrders, error: errorOrders } = useOrders(OrderRequestStatus.Approved);

  // Utilidad para calcular datos agrupados por mes y año
  const getCountsByMonthAndYear = (data: any[], dateKey: string) => {
    const countsByMonth = Array(12).fill(0);
    const countsByYear: Record<number, number> = {};

    data.forEach((item) => {
      const date = new Date(item[dateKey]);
      const month = date.getMonth();
      const year = date.getFullYear();

      countsByMonth[month]++;
      countsByYear[year] = (countsByYear[year] || 0) + 1;
    });

    return { countsByMonth, countsByYear };
  };

  // Procesar datos para Salas
  const approvedRoomRequests = roomRequests.filter((req) => req.status === RoomRequestStatus.Approved);
  const roomData = useMemo(() => getCountsByMonthAndYear(approvedRoomRequests, 'startDate'), [approvedRoomRequests]);

  // Procesar datos para Laboratorios
  const approvedLabRequests = labRequests.filter((req) => req.status === LabRequestStatus.Approved);
  const labData = useMemo(() => getCountsByMonthAndYear(approvedLabRequests, 'startDate'), [approvedLabRequests]);

  // Procesar datos para Órdenes
  const orderData = useMemo(() => getCountsByMonthAndYear(orders, 'orderDate'), [orders]);

  // Configuración para gráficos
  const createChartData = (labels: string[], data: number[], label: string, color: string) => ({
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: `${color}70`,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  });

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  // Gráficos de Salas
  const roomMonthlyData = createChartData(months, roomData.countsByMonth, 'Solicitudes aprobadas (Salas)', 'rgba(75, 192, 192, 1)');
  const roomYearlyData = createChartData(Object.keys(roomData.countsByYear), Object.values(roomData.countsByYear), 'Solicitudes aprobadas (Salas)', 'rgba(75, 192, 192, 1)');

  // Gráficos de Laboratorios
  const labMonthlyData = createChartData(months, labData.countsByMonth, 'Solicitudes aprobadas (Laboratorios)', 'rgba(255, 159, 64, 1)');
  const labYearlyData = createChartData(Object.keys(labData.countsByYear), Object.values(labData.countsByYear), 'Solicitudes aprobadas (Laboratorios)', 'rgba(255, 159, 64, 1)');

  // Gráficos de Órdenes
  const orderMonthlyData = createChartData(months, orderData.countsByMonth, 'Órdenes aprobadas', 'rgba(153, 102, 255, 1)');
  const orderYearlyData = createChartData(Object.keys(orderData.countsByYear), Object.values(orderData.countsByYear), 'Órdenes aprobadas', 'rgba(153, 102, 255, 1)');

  if (loadingRooms || loadingLabs || loadingOrders) return <p>Cargando datos...</p>;
  if (errorRooms || errorLabs || errorOrders) return <p className="text-red-600">Error cargando datos.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Gráficos de Solicitudes y Órdenes</h2>

      {/* Gráficos de Salas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Solicitudes de Salas</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold mb-2">Por Mes</h4>
            <Bar data={roomMonthlyData} />
          </div>
          <div>
            <h4 className="text-md font-semibold mb-2">Por Año</h4>
            <Bar data={roomYearlyData} />
          </div>
        </div>
      </div>

      {/* Gráficos de Laboratorios */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Solicitudes de Laboratorios</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold mb-2">Por Mes</h4>
            <Bar data={labMonthlyData} />
          </div>
          <div>
            <h4 className="text-md font-semibold mb-2">Por Año</h4>
            <Bar data={labYearlyData} />
          </div>
        </div>
      </div>

      {/* Gráficos de Órdenes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Órdenes de Pedido</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold mb-2">Por Mes</h4>
            <Bar data={orderMonthlyData} />
          </div>
          <div>
            <h4 className="text-md font-semibold mb-2">Por Año</h4>
            <Bar data={orderYearlyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRequestsCharts;
