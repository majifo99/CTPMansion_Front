import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[90vh]">
      {/* Imagen de fondo */}
      <img
        src="https://i.ibb.co/RCSMNPg/ctp-m.jpg"
        alt="Colegio Técnico Profesional La Mansión"
        className="w-full h-full object-cover"
      />
      {/* Capa verde transparente */}
      <div className="absolute top-0 left-0 w-full h-full bg-darkBlueTransparent "></div>
      {/* Contenido del Hero */}
      <div className="absolute top-[30%] left-0 md:left-[10%] max-w-[600px] h-full flex flex-col text-white p-4">
        <h1 className="font-bold text-7xl text-white font-playfair">Colegio Técnico Profesional</h1>
        <h2 className="text-6xl py-4 text-[#4EA5c2] ">La Mansión</h2>
      </div>
    </div>
  );
};

export default Hero;
