import Navbar from './Navbar'; // Asegúrate de tener este componente creado
import Footer from './Footer'; // Asegúrate de tener este componente creado
import { useWorkshops } from '../hooks/useWorkshops'; // Importa el hook

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

const TalleresExploratoriosPage = () => {
  const { workshops, loading, error } = useWorkshops();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-5 py-24">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Talleres Exploratorios</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {workshops.map(workshop => (
            <TallerCard
              key={workshop.id}
              title={workshop.title}
              description={workshop.description}
              image={workshop.url_image}
              especialidad={workshop.especialidad}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TalleresExploratoriosPage;
