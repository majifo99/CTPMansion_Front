import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaCertificate,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaBars,
  FaCartArrowDown,
  FaUserCircle,
  FaCaretDown,
} from 'react-icons/fa';
import { MdRoom, MdScience } from 'react-icons/md';
import { GiTeacher, GiTakeMyMoney } from 'react-icons/gi';
import { IoIosConstruct } from 'react-icons/io';
import { BsJournal } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSolicitudesOpen, setIsSolicitudesOpen] = useState(false);
  const [isGestionesOpen, setIsGestionesOpen] = useState(false);
  const [isCreacionElaboracionOpen, setIsCreacionElaboracionOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsProfileMenuOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsProfileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const hasRole = (requiredRoles: string[]) => {
    return user?.roles?.some((role) => requiredRoles.includes(role));
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-900 text-white h-full p-4 transition-all duration-300 overflow-y-auto flex flex-col justify-between ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Parte superior de la Sidebar */}
        <div>
          {/* Botón para colapsar Sidebar */}
          <button onClick={toggleSidebar} className="text-white mb-4 focus:outline-none flex justify-center">
            <FaBars size={20} />
          </button>

          {/* Logo y nombre de la Sidebar */}
          {!isSidebarCollapsed && <h2 className="text-xl font-bold mb-6 text-center">CTP La Mansión</h2>}

          <nav>
            {/* Link al Dashboard principal */}
            <Link to="/dashboard" className="flex items-center mb-4  rounded hover:bg-gray-700">
              <FaHome size={24} className="mr-2" />
              {!isSidebarCollapsed && <span className="text-lg">Inicio</span>}
            </Link>

            {/* Sección de Solicitudes */}
            {hasRole(['RoomandLabRequester']) && (
              <div className="mb-4">
                <h3
                  className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsSolicitudesOpen(!isSolicitudesOpen)}
                >
                  <div className="flex items-center">
                    <MdRoom size={24} className="mr-2" />
                    {!isSidebarCollapsed && <span className="ml-2">Solicitudes</span>}
                  </div>
                  {!isSidebarCollapsed && (isSolicitudesOpen ? <FaChevronUp /> : <FaChevronDown />)}
                </h3>
                {isSolicitudesOpen && !isSidebarCollapsed && (
                  <div className="pl-4">
                    <Link to="/dashboard/solicitar-sala" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <MdRoom className="mr-2" />
                      Solicitar sala
                    </Link>
                    <Link to="/dashboard/solicitar-laboratorio" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <MdScience className="mr-2" />
                      Solicitar laboratorio
                    </Link>
                    <Link to="/dashboard/orden-de-pedido" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaPlus className="mr-2" />
                      Orden de Pedido
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Gestiones */}
            {hasRole(['Admin', 'RoomManager', 'ConferenceRoomManager']) && (
              <div className="mb-4">
                <h3
                  className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsGestionesOpen(!isGestionesOpen)}
                >
                  <div className="flex items-center">
                    <FiUsers size={24} className="mr-2" />
                    {!isSidebarCollapsed && <span className="ml-2">Gestiones</span>}
                  </div>
                  {!isSidebarCollapsed && (isGestionesOpen ? <FaChevronUp /> : <FaChevronDown />)}
                </h3>
                {isGestionesOpen && !isSidebarCollapsed && (
                  <div className="pl-4">
                    <Link to="/dashboard/roles" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FiUsers className="mr-2" />
                      Gestión de roles
                    </Link>
                    <Link to="/dashboard/salas" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <MdRoom className="mr-2" />
                      Salas
                    </Link>
                    <Link to="/dashboard/laboratorios" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <MdScience className="mr-2" />
                      Laboratorios
                    </Link>
                    <Link to="/dashboard/certificaciones" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaCertificate className="mr-2" />
                      Certificaciones
                    </Link>
                    <Link to="/dashboard/admin-udp-balance" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <GiTakeMyMoney className="mr-2" />
                      Balance UDP
                    </Link>
                    <Link to="/dashboard/ordenesdepedido" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaCartArrowDown className="mr-2" />
                      Ordenes de pedido
                    </Link>

                    <Link to="/dashboard/GraficoSalas" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaCartArrowDown className="mr-2" />
                      Grafico de salas 
                    </Link>

                  </div>
                )}
              </div>
            )}

            {/* Creación y Elaboración */}
            {hasRole(['Admin', 'ContentEditor']) && (
              <div className="mb-4">
                <h3
                  className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsCreacionElaboracionOpen(!isCreacionElaboracionOpen)}
                >
                  <div className="flex items-center">
                    <IoIosConstruct size={24} className="mr-2" />
                    {!isSidebarCollapsed && <span className="ml-2">Creación y Elaboración</span>}
                  </div>
                  {!isSidebarCollapsed && (isCreacionElaboracionOpen ? <FaChevronUp /> : <FaChevronDown />)}
                </h3>
                {isCreacionElaboracionOpen && !isSidebarCollapsed && (
                  <div className="pl-4">
                    <Link to="/dashboard/eventos" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <IoIosConstruct className="mr-2" />
                      Eventos
                    </Link>
                    <Link to="/dashboard/udps" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <GiTeacher className="mr-2" />
                      UDPs
                    </Link>
                    <Link to="/dashboard/especialidades" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <BsJournal className="mr-2" />
                      Especialidades
                    </Link>
                    <Link to="/dashboard/talleres" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaCog className="mr-2" />
                      Talleres
                    </Link>
                    <Link to="/dashboard/elaborar-salas" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaPlus className="mr-2" />
                      Elaborar salas
                    </Link>
                    <Link to="/dashboard/elaborar-laboratorios" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                      <FaPlus className="mr-2" />
                      Elaborar laboratorios
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>

        {/* Parte inferior de la Sidebar - Menú de perfil */}
        <div className="relative mt-auto" ref={menuRef}>
          <button
            className="flex items-center cursor-pointer focus:outline-none w-full text-left  hover:bg-gray-700 rounded"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={isProfileMenuOpen}
            aria-controls="profile-menu"
          >
            <FaUserCircle size={24} />
            {!isSidebarCollapsed && <span className="ml-2">{user?.name || 'Usuario'}</span>}
            {!isSidebarCollapsed && <FaCaretDown className="ml-2" />}
          </button>

          {isProfileMenuOpen && (
            <div
              id="profile-menu"
              className={clsx(
                'absolute bottom-14 w-full bg-white text-gray-800 rounded shadow-lg py-2 z-20 transform transition duration-200',
                isProfileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              )}
            >
              <Link to="/dashboard/perfil" className="block px-4 py-2 hover:bg-gray-100" tabIndex={0}>
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                tabIndex={0}
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

export default Sidebar;