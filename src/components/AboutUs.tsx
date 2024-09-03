import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="relative flex items-center justify-center bg-white overflow-hidden pt-[60px] z-10">
      <div className="relative mx-auto h-full px-4 pb-20 md:pb-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-col items-center justify-between py-16 lg:flex-row">
          <div className="relative z-40">
            <div className="lg:max-w-xl lg:pr-5">
              <p className="flex text-sm uppercase text-g1">Nosotros</p>
              <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-softGreen sm:text-7xl sm:leading-snug">
                ¿Quiénes
                <span className="my-1 inline-block px-4 font-bold text-g4 border-b-8 border-g4 bg-white animate__animated animate__flash">
                  Somos?
                </span>
              </h2>
              <p className="text-base text-darkBlue">
                 Antes de 1973, el personal docente de la Escuela Antonio Maceo y Grajales ya tenía la idea de crear una institución de enseñanza secundaria en Nicoya debido a la dificultad que enfrentaban sus egresados para continuar con sus estudios. Aprovechando el Plan Nacional de Desarrollo Educativo, y mediante el decreto N°3333-E, se constituyó el Colegio Técnico Profesional Industrial La Mansión. El 22 de julio de 1975, el Ministro Gómez Solano aprobó la iniciativa, y el colegio comenzó a operar el 10 de marzo de 1976 en aulas provisionales de la Escuela Antonio Maceo, con una matrícula inicial de 145 estudiantes y 17 profesores, bajo la dirección de Gregorio Guevara..
              </p>
              <div className="mt-10 flex flex-col items-center md:flex-row">
                <Link
                  to="/Uspage"
                  aria-label="Conoce más de nosotros"
                  className="group inline-flex items-center font-semibold text-g1"
                >
                  Conoce un poco más de nosotros
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2"
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
          </div>
          <div className="relative hidden lg:block lg:ml-32 lg:w-1/2">
            <div className="mx-auto overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none w-fit">
              <img src= "https://i.ibb.co/7SPk3sb/Nosotros.jpg"  alt="Nosotros" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-6 left-1/4 hidden text-9xl text-g/10 varien z-10">
        About Us
      </div>
    </div>
  );
};

export default AboutUs;
