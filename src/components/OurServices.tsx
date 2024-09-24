import React from 'react';
import { BiBookReader, BiBusSchool } from "react-icons/bi";
import { TbBallFootball, TbBowlSpoon, TbUserHeart, TbUserQuestion, TbPigMoney, TbHome } from "react-icons/tb";
import { useOurServices } from '../hooks/useOurServices';

// Mapeo de iconos según el nombre proporcionado en la API
const iconMapper: { [key: string]: JSX.Element } = {
  BiBookReader: <BiBookReader className="w-12 h-12 text-[#0075A2]" />,
  BiBusSchool: <BiBusSchool className="w-12 h-12 text-[#0075A2]" />,
  TbBallFootball: <TbBallFootball className="w-12 h-12 text-[#0075A2]" />,
  TbBowlSpoon: <TbBowlSpoon className="w-12 h-12 text-[#0075A2]" />,
  TbUserHeart: <TbUserHeart className="w-12 h-12 text-[#4EA5D9]" />,
  TbUserQuestion: <TbUserQuestion className="w-12 h-12 text-[#B22222]" />,
  TbPigMoney: <TbPigMoney className="w-12 h-12 text-[#B22222]" />,
  TbHome: <TbHome className="w-12 h-12 text-[#B22222]" />,
};

const OurServices: React.FC = () => {
  const { services, loading, error } = useOurServices();

  if (loading) return <p className="text-center text-lg">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">Nuestros Servicios</h2>
        <div className="flex flex-wrap -m-4 text-center">
          {services.map((service) => (
            <div key={service.id} className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div
                className="h-full min-h-[200px] max-h-[300px] border-2 border-gray-200 px-6 py-6 rounded-lg hover:shadow-lg transform transition duration-300 hover:scale-105 flex flex-col justify-center items-center"
                aria-label={`Servicio: ${service.title}`}
              >
                {/* Icono del servicio */}
                {iconMapper[service.icon] || (
                  <BiBookReader className="w-12 h-12 text-[#0075A2]" aria-hidden="true" />
                )}
                {/* Título del servicio */}
                <h2 className="title-font font-semibold text-xl text-gray-900 mt-4">
                  {service.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
