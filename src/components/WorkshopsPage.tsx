import Navbar from './Navbar';
import Footer from './Footer';
import { useWorkshops } from '../hooks/useWorkshops';
import 'aos/dist/aos.css'; // Importamos la librería de animaciones AOS
import { useEffect } from 'react';
import AOS from 'aos'; // Inicialización de AOS

const TalleresExploratoriosPage = () => {
  const { workshops, loading, error } = useWorkshops();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Inicializamos AOS con una duración de 1000ms
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <section className="text-gray-700 body-font">
        <div className="container mx-auto px-5 py-24">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Talleres Exploratorios
          </h2>

          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              data-aos="fade-up" // Animación de AOS
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center justify-between mb-16 p-8 ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } rounded-lg shadow-lg`}
            >
              {/* Imagen del taller */}
              <div className="md:w-1/2 w-full h-96">
                <img
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  src={workshop.url_Image}
                  alt={workshop.title}
                />
              </div>

              {/* Contenido textual */}
              <div className="md:w-1/2 w-full p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {workshop.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {workshop.description}
                </p>
                <a
                  href={`/talleres/${workshop.id}`} // Enlace a más detalles del taller
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
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
