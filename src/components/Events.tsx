import Navbar from './Navbar';
import Footer from './Footer';
import { useEvents } from '../hooks/useEvents'; // Importa el hook para obtener los eventos
import { Event } from '../types/Types';

const EventItem: React.FC<Event> = ({ title, date, description, url_Image }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
    <img src={url_Image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <span className="text-sm text-gray-500 block mb-4">
        {new Date(date).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  </div>
);

const EventListPage: React.FC = () => {
  const { events, loading, error } = useEvents(); // Hook para obtener los eventos

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 py-24">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Próximos Eventos
        </h2>
        {loading ? (
          <p className="text-center">Cargando eventos...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventItem
                key={event.id}
                title={event.title}
                date={event.date}
                description={event.description}
                url_Image={event.url_Image} // Usamos la propiedad correcta del evento
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EventListPage;
