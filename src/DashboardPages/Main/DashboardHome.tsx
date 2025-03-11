import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaDoorOpen,
  FaUserShield,
  FaCalendarPlus,
  FaFileInvoice,
  FaCalendarAlt,
} from 'react-icons/fa';
import { useEvents } from '../../hooks/useEvents';
import { useAuthContext } from '../../hooks/useAuthContext';

const DashboardHome: React.FC = () => {
  const { events, loading, error } = useEvents();
  const { user } = useAuthContext();
  const maxUpcomingEvents = 3;

  // Obtener eventos próximos ordenados
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, maxUpcomingEvents);

  // Verifica si el usuario tiene un rol específico
  const hasRole = (roles: string[]) =>
    user?.roles?.some(role => roles.includes(role));

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-700 mb-8 text-center">
        Administración CTP la Mansión
      </h2>

      {/* Enlaces Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <QuickLink
          to="/dashboard/solicitar-sala"
          icon={<FaDoorOpen size={30} />}
          title="Solicitar Sala"
          description="Reserva de salas"
          color="blue"
        />
        <QuickLink
          to="/dashboard/orden-de-pedido"
          icon={<FaFileInvoice size={30} />}
          title="Orden de Pedido"
          description="Solicitudes de compra"
          color="purple"
        />
        {hasRole(['Admin']) && (
          <>
            <QuickLink
              to="/dashboard/roles"
              icon={<FaUserShield size={30} />}
              title="Gestión de Roles"
              description="Administrar permisos"
              color="green"
            />
            <QuickLink
              to="/dashboard/eventos"
              icon={<FaCalendarPlus size={30} />}
              title="Crear Evento"
              description="Organizar actividades"
              color="orange"
            />
          </>
        )}
      </div>

      {/* Eventos Próximos */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
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
              <li
                key={index}
                className="p-4 bg-indigo-50 text-indigo-800 rounded-lg shadow-md hover:bg-indigo-100 transition duration-200"
              >
                <p className="font-semibold">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>{event.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay eventos próximos.</p>
        )}
      </div>
    </div>
  );
};

// Componente reutilizable para los enlaces rápidos
const QuickLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ to, icon, title, description, color }) => (
  <Link
    to={to}
    className={`bg-${color}-500 text-white rounded-lg p-6 shadow-lg flex items-center hover:shadow-xl transition duration-200`}
  >
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-md">{description}</p>
    </div>
  </Link>
);

export default DashboardHome;
