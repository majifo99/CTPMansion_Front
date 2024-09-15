import React, { useState } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

const Topbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 text-white h-16 flex items-center justify-between px-4 shadow-md">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
   
        {/* Menú de perfil */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <FaUserCircle size={24} />
            <span className="ml-2">Usuario</span>
            <FaCaretDown className="ml-2" />
          </div>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2">
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
