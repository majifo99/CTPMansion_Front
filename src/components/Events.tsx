import React from 'react';
import Navbar from './Navbar'; // Asegúrate de tener este componente creado
import Footer from './Footer'; // Asegúrate de tener este componente creado

const events = [
  {
    id: 1,
    title: "Feria de Ciencia y Tecnología",
    date: "2024-09-15",
    description: "Participa en la Feria de Ciencia y Tecnología, donde los estudiantes presentan sus proyectos innovadores.",
    image: "https://via.placeholder.com/100", // Cambia esto por la ruta de tu imagen local
  },
  {
    id: 2,
    title: "Día de la Independencia",
    date: "2024-09-15",
    description: "Celebramos nuestra independencia con un desfile y actividades culturales en el colegio.",
    image: "https://via.placeholder.com/100", // Cambia esto por la ruta de tu imagen local
  },
  {
    id: 3,
    title: "Competencia de Robótica",
    date: "2024-10-05",
    description: "Los equipos competirán en una emocionante carrera de robots diseñados por ellos mismos.",
    image: "https://via.placeholder.com/100", // Cambia esto por la ruta de tu imagen local
  },
];

const EventItem = ({ title, date, description, image }) => (
  <li className="flex items-center space-x-4 py-4 border-b border-gray-200">
    <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <span className="text-sm text-gray-600">{date}</span>
      <p className="text-gray-700 text-sm mt-2">{description}</p>
    </div>
  </li>
);

const EventListPage = () => (
  <>
    <Navbar />
    <div className="container mx-auto px-5 py-24">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Próximos Eventos</h2>
      <ul className="divide-y divide-gray-200">
        {events.map(event => (
          <EventItem 
            key={event.id}
            title={event.title}
            date={event.date}
            description={event.description}
            image={event.image}
          />
        ))}
      </ul>
    </div>
    <Footer />
  </>
);

export default EventListPage;
