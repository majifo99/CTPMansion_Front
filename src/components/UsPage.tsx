import { FaPeopleCarry, FaHandshake } from 'react-icons/fa';
import mision from '../assets/images/mision.png';
import vision from '../assets/images/vision.png';
import Navbar from './Navbar';
import { RiEmpathizeFill } from "react-icons/ri";
import Footer from './Footer';
import { useEffect } from 'react';


const UsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Esto asegura que la página empiece en la parte superior
  }, []);

  const cards = [
    {
      id: 1,
      icon: <RiEmpathizeFill className="text-burntOrange w-12 h-12" />,
      title: "Respeto",
      description: "Fomentamos un ambiente donde cada persona es valorada, escuchada y tratada con dignidad, promoviendo la convivencia armoniosa y el reconocimiento de las diferencias.",
    },
    {
      id: 2,
      icon: <FaPeopleCarry className="text-burntOrange w-12 h-12" />,
      title: "Compañerismo",
      description: "Alentamos a los estudiantes a apoyarse mutuamente, trabajar en equipo y construir lazos de amistad que contribuyan al crecimiento personal y al bienestar colectivo.",
    },
    {
      id: 3,
      icon: <FaHandshake className="text-burntOrange w-12 h-12" />,
      title: "Tolerancia",
      description: "Enseñamos a nuestros estudiantes a aceptar y valorar la diversidad de ideas, culturas y creencias, cultivando un espacio donde todos puedan expresarse libremente y aprender de los demás.",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="text-center p-8 mt-8">
        <div className="flex flex-wrap items-center mt-20 text-center">
          <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img
              src={vision}
              alt="Visión"
              className="inline-block rounded"
            />
          </div>
          <div className="w-full md:w-2/5 lg:w-1/2 px-4 text-center md:text-left lg:pl-12">
            <h2 className="font-bold mt-8 text-xl md:mt-0 sm:text-4xl">
              Visión
            </h2>
            <p className="sm:text-lg mt-6">
              Ser una institución de referencia en Guanacaste y a nivel nacional, reconocida por su excelencia en la formación técnica y académica. Nos enfocamos en acciones estratégicas y sostenibles que promuevan el desarrollo social, impulsando la participación activa de nuestros estudiantes en la solución solidaria de los problemas. Aspiramos a ser un motor de ascenso social, contribuyendo al progreso integral de nuestra comunidad.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-20 text-center">
          <div className="w-full md:w-3/5 lg:w-1/2 px-4">
            <img
              src={mision}
              alt="Misión"
              className="inline-block rounded"
            />
          </div>
          <div className="w-full md:w-2/5 lg:w-1/2 px-4 md:order-first text-center md:text-left lg:pr-12">
            <h2 className="font-bold mt-8 text-xl md:mt-0 sm:text-4xl">
              Misión
            </h2>
            <p className="sm:text-lg mt-6">
              Formar ciudadanos críticos y competentes, mediante una educación técnica y académica de calidad, que les permita destacarse como Técnicos Medios en diversas especialidades, alcanzar el bachillerato, y continuar su formación en la educación superior. Promovemos el aprendizaje continuo y la adaptación al cambio, preparando a nuestros estudiantes para contribuir al desarrollo sostenible en el ámbito laboral, ya sea en empresas públicas, privadas o en sus propios emprendimientos.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
          <div className="flex flex-wrap -mx-4">
            {cards.map((card) => (
              <div key={card.id} className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white p-8 shadow-md rounded-md">
                  <div className="flex justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.description}</p>
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
