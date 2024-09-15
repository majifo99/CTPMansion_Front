import React from 'react';
import { BiBookReader, BiBusSchool } from "react-icons/bi";
import { TbBallFootball, TbBowlSpoon, TbUserHeart, TbUserQuestion, TbPigMoney, TbHome } from "react-icons/tb";
import { useOurServices } from '../hooks/useOurServices';

// Mapea los iconos según el nombre proporcionado en la API
const iconMapper: { [key: string]: JSX.Element } = {
  'BiBookReader': <BiBookReader className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
  'BiBusSchool': <BiBusSchool className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
  'TbBallFootball': <TbBallFootball className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
  'TbBowlSpoon': <TbBowlSpoon className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />,
  'TbUserHeart': <TbUserHeart className="text-[#4EA5D9] w-12 h-12 mb-3 inline-block" />,
  'TbUserQuestion': <TbUserQuestion className="text-burntOrange w-12 h-12 mb-3 inline-block" />,
  'TbPigMoney': <TbPigMoney className="text-burntOrange w-12 h-12 mb-3 inline-block" />,
  'TbHome': <TbHome className="text-burntOrange w-12 h-12 mb-3 inline-block" />,
};

const OurServices = () => {
  const { services, loading, error } = useOurServices();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Nuestros Servicios</h2>
        <div className="flex flex-wrap -m-4 text-center">
          {services.map((service) => (
            <div key={service.id} className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                {iconMapper[service.icon] || <BiBookReader className="text-[#0075A2] w-12 h-12 mb-3 inline-block" />} {/* Icono por defecto */}
                <h2 className="title-font font-medium text-2xl text-gray-900">{service.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
