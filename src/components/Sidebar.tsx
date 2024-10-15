import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCertificate, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { MdRoom, MdScience } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { IoIosConstruct } from 'react-icons/io';
import { BsJournal } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  // States for handling dropdowns
  const [isGestionesOpen, setIsGestionesOpen] = useState(false);
  const [isCreacionElaboracionOpen, setIsCreacionElaboracionOpen] = useState(false);
  const [isSolicitudesOpen, setIsSolicitudesOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">CTP La Mansión</h2>

      <nav>
        {/* Section for Requests */}
        <div className="mb-4">
          <h3
            className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => setIsSolicitudesOpen(!isSolicitudesOpen)}
          >
            Solicitudes {isSolicitudesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {isSolicitudesOpen && (
            <div className="pl-4">
              <Link to="/dashboard/solicitar-sala" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                <MdRoom className="mr-2" />
                Solicitar sala
              </Link>
              <Link to="/dashboard/solicitar-laboratorio" className="flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
                <MdScience className="mr-2" />
                Solicitar laboratorio
              </Link>
            </div>
          )}
        </div>

        {/* Section for Management with dropdown */}
        <div className="mb-4">
          <h3
            className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => setIsGestionesOpen(!isGestionesOpen)}
          >
            Gestiones {isGestionesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {isGestionesOpen && (
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
            </div>
          )}
        </div>

        {/* Combined Creation and Elaboration section */}
        <div className="mb-4">
          <h3
            className="text-lg font-semibold mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => setIsCreacionElaboracionOpen(!isCreacionElaboracionOpen)}
          >
            Creación y elaboración {isCreacionElaboracionOpen ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {isCreacionElaboracionOpen && (
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
      </nav>
    </div>
  );
};

export default Sidebar;
