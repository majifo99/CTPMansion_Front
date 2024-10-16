import { useEffect } from 'react';
import { FaPeopleCarry, FaHandshake, FaHandsHelping } from 'react-icons/fa';
import { RiEmpathizeFill } from 'react-icons/ri';
import Navbar from './Navbar';
import Footer from './Footer';
import useUsPage from '../hooks/useUsePage';

const iconMapper = {
  Respeto: <FaHandshake className="text-burntOrange w-12 h-12" />,
  Compromiso: <FaPeopleCarry className="text-burntOrange w-12 h-12" />,
  Empatía: <RiEmpathizeFill className="text-burntOrange w-12 h-12" />,
  Colaboración: <FaHandsHelping className="text-burntOrange w-12 h-12" />,
};

const UsPage = () => {
  const { mission, vision, values, loading, error } = useUsPage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />

      {/* Misión y Visión */}
      <div className="text-center p-8 mt-8">
        {loading ? (
          <div className="flex flex-wrap items-center mt-20 text-center animate-pulse">
            <div className="w-full md:w-3/5 lg:w-1/2 px-4 h-64 bg-gray-200 rounded"></div>
            <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12 mt-4 md:mt-0">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-4/5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        ) : (
          <>
            {vision && (
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
            {mission && (
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
          </>
        )}
      </div>

      {/* Valores */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array(4).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-8 shadow-md rounded-md hover:shadow-lg transition-shadow duration-300 animate-pulse"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-200 w-12 h-12 rounded-full"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-4 mx-auto"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded mb-2"></div>
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
