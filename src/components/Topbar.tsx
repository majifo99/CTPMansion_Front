import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

const Topbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white h-16 flex items-center justify-between px-4 shadow-md">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Menú de perfil */}
        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-haspopup="true"
            aria-expanded={isProfileMenuOpen}
          >
            <FaUserCircle size={24} />
            <span className="ml-2">Usuario</span>
            <FaCaretDown className="ml-2" />
          </div>

          {/* Menú desplegable con animación y accesibilidad */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 transition-all duration-200 ease-in-out">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Perfil
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Configuración
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
