import { useState } from 'react';
import { FaFacebookF, FaBars } from 'react-icons/fa';
import logo from '../assets/images/image.png'; // Asegúrate de ajustar la ruta según tu estructura
import { Link } from 'react-router-dom';
import ctp from '../assets/images/LogoMansion.png'

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="w-full min-h-[80px] flex justify-between items-center fixed top-0 z-50 text-white bg-gradient-to-r bg-darkBlue shadow-lg">
        <div className="flex items-center justify-between w-full px-4">
          <img src={ctp} alt="Logo" className="h-12 w-12" />
          <ul className="hidden sm:flex space-x-6 ml-auto">
            <li>
              <a href='/' className="hover:text-[#B22222] transition duration-300">Home</a>
            </li>
            <li>
            <Link to="/Uspage" className="hover:text-[#B22222] transition duration-300">  Nosotros </Link>
            </li>
            <li className="relative group">
              <a href='/ofertaAcademica' className="hover:text-[#B22222] transition duration-300">Oferta Académica</a>
              <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible">
                <li className="px-4 py-2 hover:bg-transparentCustomGray rounded-t-lg"><Link to="/specialties">Especialidades</Link></li>
                <li className="px-4 py-2 hover:bg-transparentCustomGray rounded-b-lg"><Link to="/workshops">Talleres Exploratorios</Link></li>
              </ul>
            </li>
            <li>
            <Link to="/Events" className="hover:text-[#B22222] transition duration-300">  Eventos </Link>
            </li>
            <li>
            <Link to="/Certificate" className="hover:text-[#B22222] transition duration-300"> Solicitud de Certificados </Link>
            </li>


          </ul>
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
          onClick={handleNav}
          className={
            nav
              ? 'overflow-y-hidden md:hidden ease-in duration-300 absolute text-gray-300 left-0 top-0 w-full h-screen bg-black/90 px-4 py-7 flex flex-col'
              : 'absolute top-0 h-screen left-[-100%] ease-in duration-500'
          }
        >
          <ul className='h-full w-full text-center pt-12'>
            <li className='text-2xl py-8'>
              <a href='/'>Home</a>
            </li>
            <li className='text-2xl py-8'>
              <a href='/us'>Nosotros</a>
            </li>
            <li className='text-2xl py-8 relative group'>
              <a href='/ofertaAcademica'>Oferta Académica</a>
              <ul className={`absolute left-0 mt-2 w-full bg-white text-gray-800 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ${nav ? 'block' : 'hidden'}`}>
                <li className="px-4 py-2 hover:bg-gray-200 rounded-t-lg"><a href="#specialties">Especialidades</a></li>
                <li className="px-4 py-2 hover:bg-gray-200 rounded-b-lg"><a href="#workshops">Talleres Exploratorios</a></li>
              </ul>
            </li>
            <li className='text-2xl py-8'>
              <a href='/gallery'>Gallery</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
