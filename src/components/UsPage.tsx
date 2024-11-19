import { useEffect } from 'react';
import { FaPeopleCarry, FaHandshake, FaHandsHelping } from 'react-icons/fa';
import { RiEmpathizeFill } from 'react-icons/ri';
import Navbar from './Navbar';
import Footer from './Footer';
import useUsPage from '../hooks/useUsePage';

const iconMapper: Record<string, JSX.Element> = {
  Respeto: <FaHandshake className="text-burntOrange w-12 h-12" />,
  Compromiso: <FaPeopleCarry className="text-burntOrange w-12 h-12" />,
  Empatía: <RiEmpathizeFill className="text-burntOrange w-12 h-12" />,
  Colaboración: <FaHandsHelping className="text-burntOrange w-12 h-12" />,
};

// Skeleton loader para mejorar la UX mientras los datos cargan
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-8">
    <div className="bg-gray-300 h-6 w-1/3 mx-auto rounded"></div>
    <div className="bg-gray-300 h-4 w-2/3 mx-auto rounded"></div>
    <div className="bg-gray-300 h-52 w-full mx-auto rounded mt-4"></div>
  </div>
);

const UsPage = () => {
  const { mission, vision, values, error, loading } = useUsPage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mostrar error si ocurre uno
  if (error) {
    return (
      <div>
        <Navbar />
        <p className="text-center text-red-500 mt-10">{error}</p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Misión y Visión */}
      <div className="text-center p-8 mt-8">
        {loading && <SkeletonLoader />}

        {!loading && vision && (
          <div className="flex flex-wrap items-center mt-20 text-center">
            <div className="w-full md:w-3/5 lg:w-1/2 px-4">
              <img
                src={vision.url_Image}
                alt="Visión"
                className="inline-block rounded"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
              <h2 className="font-bold mt-8 text-xl md:mt-0 sm:text-4xl text-center">
                {vision.title}
              </h2>
              <p className="sm:text-lg mt-6 text-gray-600 text-justify">
                {vision.description}
              </p>
            </div>
          </div>
        )}

        {!loading && mission && (
          <div className="flex flex-wrap items-center mt-20 text-center">
            <div className="w-full md:w-3/5 lg:w-1/2 px-4">
              <img
                src={mission.url_Image}
                alt="Misión"
                className="inline-block rounded"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
              <h2 className="font-bold mt-8 text-xl md:mt-0 sm:text-4xl text-center">
                {mission.title}
              </h2>
              <p className="sm:text-lg mt-6 text-gray-600 text-justify">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-8 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 animate-pulse"
                    >
                      <div className="bg-gray-300 h-12 w-12 mx-auto rounded-full mb-4"></div>
                      <div className="bg-gray-300 h-6 w-2/3 mx-auto rounded"></div>
                      <div className="bg-gray-300 h-4 w-full mt-4 rounded"></div>
                      <div className="bg-gray-300 h-4 w-3/4 mt-2 rounded"></div>
                    </div>
                  ))
              : values.map((value) => (
                  <div
                    key={value.id}
                    className="bg-white p-8 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      {iconMapper[value.title] || (
                        <RiEmpathizeFill className="text-burntOrange w-12 h-12" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
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
