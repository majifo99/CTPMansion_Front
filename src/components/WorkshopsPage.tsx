import Navbar from './Navbar'; // Asegúrate de tener este componente creado
import Footer from './Footer'; // Asegúrate de tener este componente creado

const talleres = [
  {
    id: 1,
    title: "Taller de Programación",
    description: "Introducción a los conceptos básicos de la programación en diferentes lenguajes.",
    image: "https://via.placeholder.com/100", // Cambia esto por la ruta de tu imagen local
    especialidad: "Informática",
  },
  {
    id: 2,
    title: "Taller de Contabilidad",
    description: "Enseñanza de los principios contables y gestión de libros financieros.",
    image: "https://via.placeholder.com/100", // Cambia esto por la ruta de tu imagen local
    especialidad: "Contabilidad y Control Interno",
  },
  {
    id: 3,
    title: "Taller de Cocina Gourmet",
    description: "Exploración de técnicas avanzadas de cocina y presentación de platos gourmet.",
    image: "https://via.placeholder.com/100", // Cambia esto por la ruta de tu imagen local
    especialidad: "Gerencia y Producción en Cocina",
  },
];

const TallerCard = ({ title, description, image, especialidad }) => (
  <a href="#" className="group relative block max-w-screen-sm mx-auto h-64 sm:h-80 lg:h-96 mb-8">
    <span className="absolute inset-0 border-2 border-dashed border-black"></span>

    <div className="relative flex h-full w-full transform items-end border-2 border-black bg-white transition-transform group-hover:scale-105">
      <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
        <img src={image} alt={title} className="h-10 w-10 sm:h-12 sm:w-12 object-cover" />
        <h2 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h2>
        <span className="block mt-2 text-sm text-gray-500">{especialidad}</span>
      </div>

      <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
        <h3 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h3>
        <p className="mt-4 text-sm sm:text-base">{description}</p>
        <p className="mt-8 font-bold">Read more</p>
      </div>
    </div>
  </a>
);

const TalleresExploratoriosPage = () => (
  <>
    <Navbar />
    <div className="container mx-auto px-5 py-24">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Talleres Exploratorios</h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {talleres.map(taller => (
          <TallerCard
            key={taller.id}
            title={taller.title}
            description={taller.description}
            image={taller.image}
            especialidad={taller.especialidad}
          />
        ))}
      </div>
    </div>
    <Footer />
  </>
);

export default TalleresExploratoriosPage;
