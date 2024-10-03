import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // Usar el hook useAuth
import { Link, useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth(); // Obtener el usuario y la función de logout desde el contexto
  const navigate = useNavigate();

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

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Llamar a la función de logout
    navigate('/login'); // Redirigir al usuario a la página de login
  };

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
            <span className="ml-2">{user?.name || 'Usuario'}</span> {/* Mostrar el nombre del usuario */}
            <FaCaretDown className="ml-2" />
          </div>

          {/* Menú desplegable con animación y accesibilidad */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 transition-all duration-200 ease-in-out">
              <Link to="/dashboard/perfil" className="block px-4 py-2 hover:bg-gray-100">
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
