import Navbar from './Navbar';
import Footer from './Footer';
import { useEvents } from '../hooks/useEvents';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AOS from 'aos';

const EventsPage = () => {
  const { events, loading, error } = useEvents();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) return <EventsSkeleton />;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <section className="text-gray-700 body-font">
        <div className="container mx-auto px-5 py-24">
          {/* Título con estilo formal y color en degradado */}
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 text-center relative inline-block">
              Próximos Eventos
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-md"></span>
            </h2>
          </div>

          {/* Lista de eventos */}
          <div className="flex flex-wrap -m-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 md:w-1/3"
                data-aos="fade-up"
              >
                <div className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={event.url_Image}
                    alt={event.title}
                  />
                  <div className="p-6">
                    <h3 className="title-font text-xl font-semibold text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {new Date(event.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="leading-relaxed text-gray-700">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventsPage;

// Skeleton Loader Component
const EventsSkeleton = () => (
  <div className="container mx-auto px-5 py-24 animate-pulse">
    <h2 className="text-3xl font-semibold text-center text-gray-300 mb-12">
      Cargando Eventos...
    </h2>
    <div className="flex flex-wrap -m-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-4 md:w-1/3">
          <div className="h-full bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="lg:h-48 md:h-36 w-full bg-gray-300"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
