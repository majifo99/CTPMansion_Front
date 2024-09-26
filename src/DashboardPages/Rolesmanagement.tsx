import React, { useEffect, useState } from 'react'; 
//import jwtDecode from 'jwt-decode';
import { addUserRole, getUserRoles, getUsers, removeUserRole } from '../Services/userService';

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
  const [users, setUsers] = useState<User[]>([]); // Estado para los usuarios
  const [roles, setRoles] = useState<{ [key: number]: Role[] }>({}); // Estado para los roles por usuario
  const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
  const [token, setToken] = useState<string | null>(null); // Token de autenticación

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      const fetchUsersAndRoles = async () => {
        try {
          const usersData = await getUsers(storedToken);
          if (Array.isArray(usersData)) {
            setUsers(usersData);
          } else {
            console.error('La respuesta de la API no es un array:', usersData);
            setUsers([]);
          }

          const rolesData: { [key: number]: Role[] } = {};
          for (const user of usersData) {
            const userRoles = await getUserRoles(user.id, storedToken);
            rolesData[user.id] = userRoles;
          }
          setRoles(rolesData);
        } catch (error) {
          console.error('Error al obtener usuarios o roles:', error);
          setUsers([]);
        }
      };

      fetchUsersAndRoles();
    }
  }, []);

  // Filtrar usuarios por nombre, apellido o apellido2
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastName} ${user.lastName2}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Manejar el cambio de roles
  const handleRoleChange = async (userId: number, roleId: number, isAssigned: boolean) => {
    if (!token) return;

    try {
      if (isAssigned) {
        await removeUserRole(userId, roleId, token); // Quitar rol
      } else {
        await addUserRole(userId, roleId, token); // Agregar rol
      }

      // Actualizar roles después de agregar o quitar
      const updatedRoles = await getUserRoles(userId, token);
      setRoles((prevRoles) => ({ ...prevRoles, [userId]: updatedRoles }));
    } catch (error) {
      console.error('Error al cambiar roles:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Roles de Usuarios</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />

      {/* Lista de usuarios */}
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li key={user.id} className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-lg font-semibold">
              {user.name} {user.lastName} {user.lastName2}
            </h2>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phoneNumber}</p>

            {/* Mostrar los roles actuales del usuario */}
            <div className="mt-4">
              <span className="font-semibold">Roles actuales:</span>
              <div className="flex flex-wrap mt-2 space-x-2">
                {roles[user.id]?.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleChange(user.id, role.id, true)} // Quitar rol
                    className="px-3 py-1 mb-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    {roleNames[role.id] || `Rol ${role.id}`} (Quitar)
                  </button>
                ))}
              </div>
            </div>

            {/* Mostrar los roles disponibles */}
            <div className="mt-4">
              <span className="font-semibold">Roles disponibles:</span>
              <div className="flex flex-wrap mt-2 space-x-2">
                {[1, 3, 4, 5, 6, 7, 8, 9].map((roleId) => (
                  !roles[user.id]?.some((r) => r.id === roleId) && (
                    <button
                      key={roleId}
                      onClick={() => handleRoleChange(user.id, roleId, false)} // Agregar rol
                      className="px-3 py-1 mb-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                    >
                      {roleNames[roleId]} (Agregar)
                    </button>
                  )
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RolesManagement;
