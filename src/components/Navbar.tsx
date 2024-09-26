import { useState } from 'react';
import { FaFacebookF, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full min-h-[80px] flex justify-between items-center fixed top-0 z-50 shadow-lg bg-darkBlue text-white transition duration-300">
      <div className="flex items-center justify-between w-full px-4">
        <img src="https://i.ibb.co/pdq8Pcj/La-Mansion.png" alt="Logo" className="h-12 w-12 object-cover" />
        
        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 ml-auto">
          {/* Home */}
          <li className="relative group">
            <a href="/" className="relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#B22222] hover:after:w-full after:transition-all after:duration-300">
              Home
            </a>
          </li>

          {/* Nosotros */}
          <li className="relative group">
            <Link to="/us" className="relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#B22222] hover:after:w-full after:transition-all after:duration-300">
              Nosotros
            </Link>
          </li>

          {/* Oferta Académica */}
          <li className="relative group">
            <a href="#" className="relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#B22222] hover:after:w-full after:transition-all after:duration-300">
              Oferta Académica
            </a>
            <ul className="absolute left-0 top-full w-48 bg-white text-gray-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
              <li>
                <Link to="/specialities" className="block px-4 py-2 hover:bg-gray-100">
                  Especialidades
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="block px-4 py-2 hover:bg-gray-100">
                  Talleres Exploratorios
                </Link>
              </li>
            </ul>
          </li>

          {/* Eventos */}
          <li className="relative group">
            <Link to="/events" className="relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#B22222] hover:after:w-full after:transition-all after:duration-300">
              Eventos
            </Link>
          </li>

          {/* Certificados */}
          <li className="relative group">
            <Link to="/certificates" className="relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#B22222] hover:after:w-full after:transition-all after:duration-300">
              Solicitud de Certificados
            </Link>
          </li>

          {/* Admin */}
          <li className="relative group">
            <Link to="/login" className="relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#B22222] hover:after:w-full after:transition-all after:duration-300">
              Admin
            </Link>
          </li>
        </ul>

        {/* Social Icons & Mobile Menu Icon */}
        <div className="flex items-center">
          <a className="hover:opacity-75" href="https://www.facebook.com/profile.php?id=100057725107781&locale=es_LA" target="_blank" rel="noreferrer">
            <span className="sr-only">Facebook</span>
            <FaFacebookF className="mx-4" />
          </a>
          {/* Hamburger Icon */}
          <div onClick={handleNav} className="sm:hidden z-10">
            <FaBars size={20} className="mr-4 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          nav ? 'translate-x-0' : 'translate-x-full'
        } md:hidden fixed top-0 right-0 w-full h-screen bg-black/90 px-4 py-7 flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <ul className="h-full w-full text-center pt-12 space-y-8">
          <li className="text-2xl">
            <a href="/">Home</a>
          </li>
          <li className="text-2xl">
            <a href="/us">Nosotros</a>
          </li>
          <li className="text-2xl">
            <a href="/ofertaAcademica">Oferta Académica</a>
            <ul className="mt-2 space-y-2 text-gray-300 text-lg">
              <li><a href="#specialities">Especialidades</a></li>
              <li><a href="#workshops">Talleres Exploratorios</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
