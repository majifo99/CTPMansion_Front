import React from 'react';
import { BiBookReader, BiBusSchool } from "react-icons/bi";
import { TbBallFootball, TbBowlSpoon, TbUserHeart, TbUserQuestion, TbPigMoney, TbHome } from "react-icons/tb";
import { useOurServices } from '../hooks/useOurServices';

const iconMapper = {
  BiBookReader: <BiBookReader className="w-12 h-12 text-[#ff7a59]" />,
  BiBusSchool: <BiBusSchool className="w-12 h-12 text-[#e1cf97]" />,
  TbBallFootball: <TbBallFootball className="w-12 h-12 text-[#2E4A5A]" />,
  TbBowlSpoon: <TbBowlSpoon className="w-12 h-12 text-[#006494]" />,
  TbUserHeart: <TbUserHeart className="w-12 h-12 text-[#87a330]" />,
  TbUserQuestion: <TbUserQuestion className="w-12 h-12 text-[#6EC2D7]" />,
  TbPigMoney: <TbPigMoney className="w-12 h-12 text-[#d9534f]" />,
  TbHome: <TbHome className="w-12 h-12 text-[#d9534f]" />
};

// Componente del loader (skeleton) para mostrar mientras se cargan los datos
const ServiceSkeleton: React.FC = () => (
  <div className="p-4 md:w-1/4 sm:w-1/2 w-full animate-fadeInUp">
    <div className="h-full min-h-[200px] max-h-[300px] bg-gray-200 border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center p-6 animate-pulse">
      <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/4"></div>
    </div>
  </div>
);

const OurServices: React.FC = () => {
  const { services, loading, error } = useOurServices();


  return (
    <section className="bg-white py-16">
      <div className="container px-5 mx-auto">
        {/* Título animado y centrado */}
        <div className="flex justify-center">
          <h2 className="relative text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r bg-[#34436B] text-center mb-10 animate-fadeInUp ">
            Nuestros Servicios
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 h-1 w-4/5 bg-gradient-to-r from-[#13152A] via-[#4A6FA5] to-[#B0C7E4] rounded-md "></span>
          </h2>
        </div>

        <div className="flex flex-wrap -m-4 text-center">
          {loading ? (
            // Mostrar 8 skeletons mientras se cargan los datos
            Array.from({ length: 8 }).map((_, index) => (
              <ServiceSkeleton key={index} />
            ))
          ) : error ? (
            <p className="text-center text-red-500 w-full">Error: {error}</p>
          ) : (
            // Mostrar servicios si ya están cargados
            services.map((service) => (
              <div
                key={service.id}
                className="p-4 md:w-1/4 sm:w-1/2 w-full animate-fadeInUp"
              >
                <div
                  className="h-full min-h-[200px] max-h-[300px] bg-white border-2 border-gray-200 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center p-6"
                  aria-label={`Servicio: ${service.title}`}
                >
                  {/* Icono del servicio */}
                  {iconMapper[service.icon] || (
                    <BiBookReader className="w-12 h-12 text-[#006494]" aria-hidden="true" />
                  )}
                  {/* Título del servicio */}
                  <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 opacity-80">
                    Un servicio para toda la comunidad estudiantil

                  </p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  )

}
export default OurServices;