import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCertificate, FaChevronDown, FaChevronUp, FaPlus, FaBars } from 'react-icons/fa';
import { MdRoom, MdScience } from 'react-icons/md';
import { GiTeacher, GiTakeMyMoney } from 'react-icons/gi';
import { IoIosConstruct } from 'react-icons/io';
import { BsJournal } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isGestionesOpen, setIsGestionesOpen] = useState(false);
  const [isCreacionElaboracionOpen, setIsCreacionElaboracionOpen] = useState(false);
  const [isSolicitudesOpen, setIsSolicitudesOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const hasRole = (requiredRoles: string[]) => {
    return user?.roles?.some((role) => requiredRoles.includes(role));
  };

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-900 text-white h-full p-4 transition-all duration-300 overflow-y-auto ${isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 focus:outline-none flex justify-center"
        >
          <FaBars size={20} />
        </button>


        {/* Logo y Nombre del Sidebar */}
        {!isSidebarCollapsed && <h2 className="text-xl font-bold mb-6 text-center">CTP La Mansión</h2>}

        {/* Link to Dashboard Home */}
        <Link
          to="/dashboard"
          className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 justify-center"
        >
          <FaHome size={24} className="mr-2" />
          {!isSidebarCollapsed && <span className="text-lg">Inicio</span>}
        </Link>


        <nav>
          {/* Solicitudes */}
          {hasRole(['RoomandLabRequester']) && (
            <div className="mb-4">
              <h3
                className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
                onClick={() => setIsSolicitudesOpen(!isSolicitudesOpen)}
              >
                <div className="flex items-center justify-center">
                  <MdRoom size={24} />
                  {!isSidebarCollapsed && (
                    <span className="ml-2">Solicitudes</span>
                  )}
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
                <div className="flex items-center justify-center">
                  <FiUsers size={24} />
                  {!isSidebarCollapsed && (
                    <span className="ml-2">Gestiones</span>
                  )}
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
                <div className="flex items-center justify-center">
                  <IoIosConstruct size={24} />
                  {!isSidebarCollapsed && (
                    <span className="ml-2">Creación y elaboración</span>
                  )}
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
    </div>
  );
};

export default Sidebar;
