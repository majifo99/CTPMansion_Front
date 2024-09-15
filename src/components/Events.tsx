import Navbar from './Navbar'; // Asegúrate de tener este componente creado
import Footer from './Footer'; // Asegúrate de tener este componente creado
import { useEvents } from '../hooks/useEvents'; // Importa el hook para obtener los eventos
import { Event } from '../types/Types';


const EventItem: React.FC<Event> = ({ title, date, description, urlImage }) => (
  <li className="flex items-center space-x-4 py-4 border-b border-gray-200">
    <img src={urlImage} alt={title} className="w-20 h-20 object-cover rounded" />
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <span className="text-sm text-gray-600">{new Date(date).toLocaleDateString()}</span>
      <p className="text-gray-700 text-sm mt-2">{description}</p>
    </div>
  </li>
);

const EventListPage: React.FC = () => {
  const { events, loading, error } = useEvents(); // Usa el hook para obtener los eventos

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 py-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Próximos Eventos</h2>
        {loading ? (
          <p className="text-center">Cargando eventos...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {events.map(event => (
              <EventItem 
                key={event.id}
                title={event.title}
                date={event.date}
                description={event.description}
                urlImage={event.urlImage} // Usamos la propiedad correcta del evento
              />
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventListPage;