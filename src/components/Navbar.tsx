import { useState } from 'react';
import { FaFacebookF, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full min-h-[80px] flex justify-between items-center fixed top-0 z-50 bg-gradient-to-r from-darkBlue to-[#13152A] text-white shadow-md transition duration-300">
      <div className="flex items-center justify-between w-full px-4">
        <img src="https://i.ibb.co/pdq8Pcj/La-Mansion.png" alt="Logo" className="h-12 w-12 object-cover" />

        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-6 ml-auto">
          <li className="relative group">
            <Link
              to="/"
              className="relative pb-1 transition-all duration-300 hover:text-teal-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </Link>
          </li>

          <li className="relative group">
            <Link
              to="/us"
              className="relative pb-1 transition-all duration-300 hover:text-teal-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Nosotros
            </Link>
          </li>

          <li className="relative group">
            <span className="relative pb-1 cursor-pointer transition-all duration-300 hover:text-teal-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all after:duration-300">
              Oferta Académica
            </span>
            <ul className="absolute left-0 top-full w-48 bg-white text-gray-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 shadow-lg">
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

          <li className="relative group">
            <Link
              to="/events"
              className="relative pb-1 transition-all duration-300 hover:text-teal-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Eventos
            </Link>
          </li>

          <li className="relative group">
            <Link
              to="/certificates"
              className="relative pb-1 transition-all duration-300 hover:text-teal-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Solicitud de Certificados
            </Link>
          </li>

          <li className="relative group">
            <Link
              to="/login"
              className="relative pb-1 transition-all duration-300 hover:text-teal-400 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-teal-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Social Icons & Mobile Menu Icon */}
        <div className="flex items-center">
          <a className="hover:text-teal-400" href="https://www.facebook.com/profile.php?id=100057725107781&locale=es_LA" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebookF className="mx-4" />
          </a>
          {/* Hamburger Icon */}
          <div onClick={handleNav} className="sm:hidden z-10 cursor-pointer">
            <FaBars size={20} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          nav ? 'translate-x-0' : 'translate-x-full'
        } fixed top-0 right-0 w-4/5 h-screen bg-darkBlue p-4 text-white transition-transform duration-300 ease-in-out sm:hidden`}
        role="dialog"
        aria-hidden={!nav}
      >
        <ul className="space-y-6 text-xl mt-10">
          <li onClick={handleNav}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/us">Nosotros</Link>
          </li>
          <li className="relative group">
            <span className="cursor-pointer">Oferta Académica</span>
            <ul className="pl-4 mt-2 space-y-2 text-gray-400">
              <li onClick={handleNav}>
                <Link to="/specialities">Especialidades</Link>
              </li>
              <li onClick={handleNav}>
                <Link to="/workshops">Talleres Exploratorios</Link>
              </li>
            </ul>
          </li>
          <li onClick={handleNav}>
            <Link to="/events">Eventos</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/certificates">Solicitud de Certificados</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/login">Admin</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
