import React from 'react';
import { Link } from 'react-router-dom';
import { FaDoorOpen, FaUserShield, FaCalendarPlus, FaFileInvoice, FaListAlt, FaCalendarAlt } from 'react-icons/fa';
import { useEvents } from '../../hooks/useEvents'; // Hook personalizado para manejar eventos
import { useAuthContext } from '../../hooks/useAuthContext'; // Hook para acceder al contexto de autenticación

const DashboardHome: React.FC = () => {
  const { events, loading, error } = useEvents(); // Obtener eventos reales
  const { user } = useAuthContext(); // Obtener información del usuario
  const maxUpcomingEvents = 3; // Limitar el número de eventos que se mostrarán

  // Filtrar eventos próximos
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date()) // Solo eventos en el futuro
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Ordenar por proximidad
    .slice(0, maxUpcomingEvents); // Limitar a los eventos más próximos

  const pendingTasks = [
    "Revisar solicitudes pendientes",
    "Actualizar inventario de laboratorios",
    "Confirmar inscripciones a eventos",
  ];

  // Verificar si el usuario tiene un rol específico
  const hasRole = (roles: string[]) => user?.roles?.some(role => roles.includes(role));

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-700 mb-8 text-center">Administración CTP la Mansión</h2>

      {/* Redesigned Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Enlace para "Solicitar Sala", disponible para todos */}
        <Link
          to="/dashboard/solicitar-sala"
          className="bg-blue-500 text-white rounded-lg p-6 shadow-lg flex items-center hover:shadow-xl transition duration-200"
        >
          <FaDoorOpen size={30} className="mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Solicitar Sala</h3>
            <p className="text-md">Reserva de salas</p>
          </div>
        </Link>

        {/* Enlace para "Orden de Pedido", disponible para todos */}
        <Link
          to="/dashboard/orden-de-pedido"
          className="bg-purple-500 text-white rounded-lg p-6 shadow-lg flex items-center hover:shadow-xl transition duration-200"
        >
          <FaFileInvoice size={30} className="mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Orden de Pedido</h3>
            <p className="text-md">Solicitudes de compra</p>
          </div>
        </Link>

        {/* Enlace para "Gestión de Roles", solo para Admin */}
        {hasRole(['Admin']) && (
          <Link
            to="/dashboard/roles"
            className="bg-green-500 text-white rounded-lg p-6 shadow-lg flex items-center hover:shadow-xl transition duration-200"
          >
            <FaUserShield size={30} className="mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Gestión de Roles</h3>
              <p className="text-md">Administrar permisos</p>
            </div>
          </Link>
        )}

        {/* Enlace para "Crear Evento", solo para Admin */}
        {hasRole(['Admin']) && (
          <Link
            to="/dashboard/eventos"
            className="bg-orange-500 text-white rounded-lg p-6 shadow-lg flex items-center hover:shadow-xl transition duration-200"
          >
            <FaCalendarPlus size={30} className="mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Crear Evento</h3>
              <p className="text-md">Organizar actividades</p>
            </div>
          </Link>
        )}
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-500" /> Eventos Próximos
        </h3>
        {loading ? (
          <p>Cargando eventos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : upcomingEvents.length > 0 ? (
          <ul className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <li key={index} className="p-4 bg-indigo-50 text-indigo-800 rounded-lg shadow-md hover:bg-indigo-100 transition duration-200">
                <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay eventos próximos.</p>
        )}
      </div>

      {/* Pending Tasks Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <FaListAlt className="mr-2 text-orange-500" /> Tareas Pendientes
        </h3>
        <ul className="space-y-3">
          {pendingTasks.map((task, index) => (
            <li key={index} className="p-4 bg-orange-50 text-orange-800 rounded-lg shadow-md hover:bg-orange-100 transition duration-200">
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
