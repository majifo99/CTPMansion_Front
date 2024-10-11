import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url("https://i.ibb.co/RCSMNPg/ctp-m.jpg")` }}
        aria-hidden="true"
      ></div>

      {/* Capa de fondo con degradado oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkBlue/70 via-darkBlue/50 to-darkBlue/70"></div>

      {/* Contenido del Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white font-playfair tracking-wide shadow-lg">
          Colegio Técnico Profesional
        </h1>
        <h2 className="mt-2 text-4xl md:text-5xl lg:text-6xl font-semibold text-teal-400 shadow-md">
          La Mansión
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-200 font-light max-w-xl px-4">
          Formación técnica de excelencia para el desarrollo integral de nuestros estudiantes.
        </p>
        <div className="mt-10 h-1 w-1/2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;
