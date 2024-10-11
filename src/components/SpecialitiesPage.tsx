import Navbar from './Navbar';
import Footer from './Footer';
import { useSpecialities } from '../hooks/useSpecialities';
import 'aos/dist/aos.css'; // Librería de animaciones AOS
import { useEffect } from 'react';
import AOS from 'aos'; // Inicialización de AOS

const SpecialitySections = () => {
  const { specialities, loading, error } = useSpecialities();

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
              <div className="h-10 w-1/3 bg-green-400 rounded-lg"></div>
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
          {/* Título elegante con un degradado y subrayado sutil */}
          <h2 className="relative text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-600 to-blue-500">
            Nuestras Especialidades
            <span className="block h-1 w-20 mx-auto mt-2 bg-gradient-to-r from-blue-700 to-teal-500 rounded-full"></span>
          </h2>

          {specialities.map((speciality, index) => (
            <div
              key={speciality.id}
              data-aos="fade-up" // Animación AOS
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center justify-between mb-16 p-8 bg-white rounded-lg`}
            >
              {/* Imagen de la especialidad */}
              <div className="md:w-1/2 w-full h-96">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={speciality.url_Image}
                  alt={speciality.title}
                />
              </div>

              {/* Contenido textual */}
              <div className="md:w-1/2 w-full p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {speciality.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {speciality.description}
                </p>
                <a
                  href={`/especialidades/${speciality.id}`}
                  className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
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

export default SpecialitySections;
