import { useEffect } from 'react';
import { FaPeopleCarry, FaHandshake } from 'react-icons/fa';
import Navbar from './Navbar';
import { RiEmpathizeFill } from "react-icons/ri";
import Footer from './Footer';
import useUsPage from '../hooks/useUsePage';

// Mapea los iconos según el nombre proporcionado en la API
const iconMapper: { [key: string]: JSX.Element } = {
  RiEmpathizeFill: <RiEmpathizeFill className="text-burntOrange w-12 h-12" />,
  FaPeopleCarry: <FaPeopleCarry className="text-burntOrange w-12 h-12" />,
  FaHandshake: <FaHandshake className="text-burntOrange w-12 h-12" />,
};

const UsPage: React.FC = () => {
  const { mission, vision, values, loading, error } = useUsPage();

  // Desplazarse al principio de la página al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <p className="text-center text-lg">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />

      <div className="text-center p-8 mt-8">
        {vision && (
          <div className="flex flex-wrap items-center mt-20 text-center">
            <div className="w-full md:w-3/5 lg:w-1/2 px-4">
              <img
                src={vision.url_Image}
                alt="Visión"
                className="inline-block rounded "
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
              <h2 className="font-bold mt-8 text-xl md:mt-0 sm:text-4xl">
                {vision.title}
              </h2>
              <p className="sm:text-lg mt-6 text-gray-600">
                {vision.description}
              </p>
            </div>
          </div>
        )}

        {mission && (
          <div className="flex flex-wrap items-center mt-20 text-center">
            <div className="w-full md:w-3/5 lg:w-1/2 px-4">
              <img
                src={mission.url_Image}
                alt="Misión"
                className="inline-block rounded "
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
              <h2 className="font-bold mt-8 text-xl md:mt-0 sm:text-4xl">
                {mission.title}
              </h2>
              <p className="sm:text-lg mt-6 text-gray-600">
                {mission.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Valores */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Nuestros Valores</h2>
          <div className="flex flex-wrap -mx-4">
            {values.map((value) => (
              <div key={value.id} className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-8 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    {iconMapper[value.icon] || (
                      <RiEmpathizeFill className="text-burntOrange w-12 h-12" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UsPage;
