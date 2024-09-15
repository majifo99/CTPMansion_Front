import React, { useState } from 'react';
import { FaCertificate, FaCogs, FaFolderPlus } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isGestionesOpen, setIsGestionesOpen] = useState(false);
  const [isCreacionOpen, setIsCreacionOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-bold">Menu</h2>
      </div>
      <ul className="flex flex-col flex-grow">
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer">
          <FaCertificate className="mr-2" />
          <Link to="/certificaciones">Certificaciones</Link>
        </li>
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer" onClick={() => setIsGestionesOpen(!isGestionesOpen)}>
          <FaCogs className="mr-2" />
          Gestiones
          <MdArrowDropDown className="ml-auto" />
        </li>
        {isGestionesOpen && (
          <ul className="pl-8">
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/gestiones/salas">Salas</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/gestiones/laboratorios">Laboratorios</Link>
            </li>
          </ul>
        )}
        <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer" onClick={() => setIsCreacionOpen(!isCreacionOpen)}>
          <FaFolderPlus className="mr-2" />
          Creación
          <MdArrowDropDown className="ml-auto" />
        </li>
        {isCreacionOpen && (
          <ul className="pl-8">
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/creacion/salas">Salas</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/creacion/laboratorios">Laboratorios</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/creacion/eventos">Eventos</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/creacion/udps">UDPs</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/creacion/especialidades">Especialidades</Link>
            </li>
            <li className="py-2 hover:bg-gray-700 cursor-pointer">
              <Link to="/creacion/talleres">Talleres</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
