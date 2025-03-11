import React, { useEffect, useState } from 'react';
import { addUserRole, getUserRoles, getUsers, removeUserRole } from '../../services/userService';

interface User {
  id: number;
  name: string;
  lastName: string;
  lastName2: string;
  email: string;
  phoneNumber: string;
}

interface Role {
  id: number;
  name: string;
}

const roleNames: { [key: number]: string } = {
  1: "Admin",
  3: "Encarg. UDP",
  4: "Encarg. Certificados",
  5: "Encarg. Labs",
  6: "Editor de Contenido",
  7: "Encarg. Salas",
  8: "Encarg. Sala de Conf.",
  9: "Solicitante de Salas y Labs",
};

const RolesManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<{ [key: number]: Role[] }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const usersData = await getUsers();
        setUsers(Array.isArray(usersData) ? usersData : []);

        const rolesData: { [key: number]: Role[] } = {};
        for (const user of usersData) {
          const userRoles = await getUserRoles(user.id);
          rolesData[user.id] = userRoles;
        }
        setRoles(rolesData);
      } catch (error) {
        console.error('Error al obtener usuarios o roles:', error);
        setUsers([]);
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleRoleChange = async (userId: number, roleId: number, isAssigned: boolean) => {
    try {
      if (isAssigned) {
        await removeUserRole(userId, roleId);
      } else {
        await addUserRole(userId, roleId);
      }

      const updatedRoles = await getUserRoles(userId);
      setRoles((prevRoles) => ({ ...prevRoles, [userId]: updatedRoles }));
    } catch (error) {
      console.error('Error al cambiar roles:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastName} ${user.lastName2}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Gestión de Roles de Usuarios
      </h1>

      <input
        type="text"
        placeholder="Buscar por nombre o apellido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 md:p-3 mb-6 rounded-lg shadow-lg border border-gray-300 outline-none text-gray-700 placeholder-gray-500 text-sm md:text-base"
      />

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredUsers.map((user) => {
          const userRoles = roles[user.id] || [];
          const availableRoles = Object.keys(roleNames)
            .map(Number)
            .filter((roleId) => !userRoles.some((role) => role.id === roleId));

          return (
            <li
              key={user.id}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">
                    {user.name} {user.lastName} {user.lastName2}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">{user.email}</p>
                  <p className="text-sm md:text-base text-gray-600">{user.phoneNumber}</p>
                </div>
              </div>

              {/* Roles Asignados */}
              <div className="mt-4 md:mt-6">
                <h3 className="font-semibold text-base md:text-lg text-gray-700 mb-2">
                  Roles Asignados
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userRoles.length > 0 ? (
                    userRoles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleRoleChange(user.id, role.id, true)}
                        className="px-2 py-1 text-xs md:text-sm bg-red-100 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all"
                      >
                        {roleNames[role.id]} ✖
                      </button>
                    ))
                  ) : (
                    <p className="text-xs md:text-sm text-gray-500">No hay roles asignados</p>
                  )}
                </div>

                {/* Roles Disponibles */}
                <h3 className="font-semibold text-base md:text-lg text-gray-700 mb-2">
                  Roles Disponibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableRoles.length > 0 ? (
                    availableRoles.map((roleId) => (
                      <button
                        key={roleId}
                        onClick={() => handleRoleChange(user.id, roleId, false)}
                        className="px-2 py-1 text-xs md:text-sm bg-green-100 text-green-600 font-semibold rounded-full hover:bg-green-600 hover:text-white transition-all"
                      >
                        {roleNames[roleId]} +
                      </button>
                    ))
                  ) : (
                    <p className="text-xs md:text-sm text-gray-500">No hay roles disponibles</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RolesManagement;