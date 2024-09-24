import { Link } from 'react-router-dom';
import { useAboutUsContent } from '../hooks/useAboutUsContent'; // Verifica que la ruta sea correcta

const AboutUs = () => {
  const { content, loading, error } = useAboutUsContent(); // Hook para obtener contenido

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (!content) return <p>No se encontró contenido.</p>;

  return (
    <div className="relative flex flex-col items-center justify-center bg-white overflow-hidden pt-16 z-10">
      <div className="container mx-auto px-4 pb-20 md:pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-16">
          {/* Contenido textual */}
          <div className="relative z-40 lg:max-w-xl lg:pr-5">
            <p className="text-sm uppercase text-g1">{content.title}</p>
            <h2 className="mb-6 text-5xl font-light leading-snug tracking-tight text-softGreen sm:text-7xl sm:leading-snug">
              ¿Quiénes{' '}
              <span className="inline-block px-4 font-bold text-g4 border-b-8 border-g4 bg-white animate__animated animate__flash">
                Somos?
              </span>
            </h2>
            <p className="text-base text-darkBlue">{content.description}</p>
            <div className="mt-10">
              <Link
                to="/us"
                aria-label="Conoce más de nosotros"
                className="inline-flex items-center font-semibold text-g1 transition-transform group hover:translate-x-1"
              >
                Conoce un poco más de nosotros
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-4 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Imagen del contenido */}
          {content.url_Image && (
            <div className="relative hidden lg:block lg:w-1/2">
              <div className="overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none w-fit">
                <img
                  src={content.url_Image}
                  alt="Nosotros"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Texto de fondo */}
      <div className="absolute top-6 left-1/4 hidden text-9xl text-g/10 z-10 select-none">
        About Us
      </div>

      {/* Separador */}
      <div className="w-full h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 my-10"></div>
    </div>
  );
};

export default AboutUs;
