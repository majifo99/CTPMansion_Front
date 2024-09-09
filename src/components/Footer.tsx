// src/Footer.tsx
import { FaFacebookF } from 'react-icons/fa';
import logo from '../assets/images/image.png'; // Asegúrate de que la ruta sea correcta

const Footer = () => {
  return (
    <footer className="bg-darkBlue py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sección de Información */}
          <div>
            <img src={logo} className="mr-5 h-10" alt="Logo de la Institución" />
            <p className="mt-4 text-sm text-gray-300">
              Somos una institución dedicada a brindar la mejor educación para nuestros estudiantes, comprometidos con la excelencia y el crecimiento integral.
            </p>
            <div className="flex mt-8 space-x-6">
              <a
                className="hover:opacity-75"
                href="https://www.facebook.com/profile.php?id=100057725107781&locale=es_LA"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="w-6 h-6 text-gray-300" />
              </a>
              {/* Puedes agregar más iconos de redes sociales aquí si lo deseas */}
            </div>
          </div>

          {/* Sección de Dirección y Horario */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            {/* Dirección */}
            <div>
              <h3 className="font-semibold text-lg text-gray-200">Nuestra Dirección</h3>
              <p className="mt-4 text-sm text-gray-400">
                100 metros sur de la Plaza de Fútbol, La Mansión, Nicoya, Provincia de Guanacaste.
              </p>
            </div>
            {/* Horario */}
            <div>
              <h3 className="font-semibold text-lg text-gray-200">Horario</h3>
              <p className="mt-4 text-sm text-gray-400">
                Lunes - Viernes: 9am - 5pm <br />
                Sábado: 10am - 4pm <br />
                Domingo: Cerrado
              </p>
            </div>
            {/* Contacto */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg text-gray-200">Contacto</h3>
              <p className="mt-4 text-sm text-gray-400">
                Correo: <a href="mailto:info@example.com" className="hover:underline text-gray-300">info@example.com</a> <br />
                Teléfono: <a href="tel:+5061234567" className="hover:underline text-gray-300">+506 1234 567</a>
              </p>
            </div>
          </div>
        </div>
        {/* Línea de Separación y Derechos Reservados */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-xs text-gray-400">
          <p>© 2024 Colegio Técnico Profesional La Mansión. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
