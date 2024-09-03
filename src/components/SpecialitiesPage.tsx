import Secretariado from '../assets/images/Secretariado Ejecutivo.jpg';
import Contabilidad from '../assets/images/Contabilidad.jpg';
import Cocina from '../assets/images/Gerencia y Producción.jpg';
import Informatica from '../assets/images/Informatica.jpg';
import Mantenimiento from '../assets/images/Instalación y Mantenimiento de Sistemas Eléctricos Industriales.jpg';

import Card from './Card'; // Asegúrate de ajustar la ruta según la ubicación del archivo
import Navbar from './Navbar';

const cards = [
  {
    id: 1,
    image: Contabilidad, // Pasar directamente la variable
    title: "Contabilidad y Control Interno",
    description: "Fomentamos un ambiente donde cada persona es valorada, escuchada y tratada con dignidad, promoviendo la convivencia armoniosa y el reconocimiento de las diferencias.",
  },
  {
    id: 2,
    image: Cocina, // Pasar directamente la variable
    title: "Gerencia y Producción en Cocina",
    description: "Alentamos a los estudiantes a apoyarse mutuamente, trabajar en equipo y construir lazos de amistad que contribuyan al crecimiento personal y al bienestar colectivo.",
  },
  {
    id: 3,
    image: Secretariado, // Pasar directamente la variable
    title: "Secretariado Ejecutivo",
    description: "Enseñamos a nuestros estudiantes a aceptar y valorar la diversidad de ideas, culturas y creencias, cultivando un espacio donde todos puedan expresarse libremente y aprender de los demás.",
  },
  {
    id: 4,
    image: Informatica, // Pasar directamente la variable
    title: "Informática",
    description: "Enseñamos a nuestros estudiantes a aceptar y valorar la diversidad de ideas, culturas y creencias, cultivando un espacio donde todos puedan expresarse libremente y aprender de los demás.",
  },
  {
    id: 5,
    image: Mantenimiento, // Pasar directamente la variable
    title: "Instalación y Mantenimiento de Sistemas Eléctricos Industriales",
    description: "Enseñamos a nuestros estudiantes a aceptar y valorar la diversidad de ideas, culturas y creencias, cultivando un espacio donde todos puedan expresarse libremente y aprender de los demás.",
  }

];

const CardSection = () => (
  <>
    <Navbar />
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Nuestras Especialidades</h2>
        <div className="flex flex-wrap -m-4">
          {cards.map(card => (
            <div key={card.id} className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <Card 
                image={card.image} 
                title={card.title} 
                description={card.description} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default CardSection;
