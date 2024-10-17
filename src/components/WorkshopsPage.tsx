import Navbar from './Navbar';
import Footer from './Footer';
import { useWorkshops } from '../hooks/useWorkshops';
import 'aos/dist/aos.css'; // Importamos AOS para las animaciones
import { useEffect } from 'react';
import AOS from 'aos'; // Inicialización de AOS

const TalleresExploratoriosPage = () => {
  const { workshops, loading, error } = useWorkshops();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-5 py-24">

        {/* Skeletons para el estado de carga */}
        {[1, 2, 3].map((skeletonIndex) => (
          <div
            key={skeletonIndex}
            className="flex flex-col md:flex-row items-center justify-between mb-16 p-8 bg-gray-100 rounded-lg animate-pulse"
          >
            <div className="md:w-1/2 w-full h-96 bg-gray-300 rounded-lg"></div>
            <div className="md:w-1/2 w-full p-8 space-y-4">
              <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div>
              <div className="h-6 w-full bg-gray-300 rounded-md"></div>
              <div className="h-6 w-5/6 bg-gray-300 rounded-md"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded-md"></div>
              <div className="h-10 w-1/3 bg-blue-400 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <section className="text-gray-700 body-font bg-gray-50 py-24">
        <div className="container mx-auto px-5">
          {/* Título llamativo y único */}
          <div className="relative text-center mb-12">
            <h2 className="relative inline-block text-5xl font-extrabold text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse">
                Talleres Exploratorios
              </span>
            </h2>
            <div className="absolute inset-0 flex justify-center">
              <div className="rounded-full w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 opacity-30 blur-2xl -z-10"></div>
            </div>
          </div>

          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              data-aos="fade-up" // Animación de AOS
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center justify-between mb-16 p-8 bg-white rounded-lg`}
            >
              {/* Imagen del taller */}
              <div className="md:w-1/2 w-full h-96">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={workshop.url_Image}
                  alt={workshop.title}
                />
              </div>

              {/* Contenido textual */}
              <div className="md:w-1/2 w-full p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {workshop.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6  text-justify">
                  {workshop.description}
                </p>
                <a
                  href={`/talleres/${workshop.id}`} // Enlace a más detalles del taller
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Ver más detalles
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TalleresExploratoriosPage;
