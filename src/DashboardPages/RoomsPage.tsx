import React, { useState } from 'react';
import { useRoomsAndRequests } from '../hooks/useRooms'; // Hook para manejar salas
import EditRoomModal from '../modals/EditRoomModal'; // Modal para agregar/editar salas
import DeleteEventModal from '../modals/DeleteEventModal'; // Modal para confirmar eliminación
import { Room } from '../types/Types';
import { AiFillDelete, AiTwotoneEdit, AiTwotonePlusSquare } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomsPage: React.FC = () => {
  const { rooms, loading, error, handleAddRoom, handleEditRoom, handleDeleteRoom } = useRoomsAndRequests();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingRoomId, setDeletingRoomId] = useState<number | null>(null);

  // Abre el modal de edición o creación
  const handleOpenEditModal = (room?: Room) => {
    setEditingRoom(room || null);
    setShowEditModal(true);
  };

  // Cierra el modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingRoom(null);
  };

  // Guarda la sala (agrega o edita)
  const handleSaveRoom = (room: Room) => {
    if (editingRoom) {
      handleEditRoom(editingRoom.id_Room, room);
      toast.success('Sala editada correctamente');
    } else {
      handleAddRoom(room);
      toast.success('Sala agregada correctamente');
    }
    handleCloseEditModal();
  };

  // Abre el modal de confirmación de eliminación
  const handleOpenDeleteModal = (id: number) => {
    setDeletingRoomId(id);
    setShowDeleteModal(true);
  };

  // Cierra el modal de confirmación de eliminación
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingRoomId(null);
  };

  // Elimina la sala después de la confirmación
  const handleConfirmDelete = () => {
    if (deletingRoomId !== null) {
      handleDeleteRoom(deletingRoomId);
      toast.success('Sala eliminada correctamente');
      handleCloseDeleteModal();
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 bg-gray-600">
      <h1 className="text-3xl font-bold mb-6 text-center text-stone-50">Gestión de Salas</h1>
      <div className="flex justify-end mb-6 mr-10">
        <button className="bg-softGreen hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg" onClick={() => handleOpenEditModal()}>
          <AiTwotonePlusSquare size={30} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white text-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Capacidad</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rooms.map((room, index) => (
              <tr key={room.id_Room} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border px-4 py-2">{room.name}</td>
                <td className="border px-4 py-2">{room.description}</td>
                <td className="border px-4 py-2">{room.capacity}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleOpenEditModal(room)}>
                    <AiTwotoneEdit size={20} />
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleOpenDeleteModal(room.id_Room)}>
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar sala */}
      <EditRoomModal
        show={showEditModal}
        room={editingRoom}
        onClose={handleCloseEditModal}
        onSave={handleSaveRoom}
      />

      {/* Modal para confirmar eliminación */}
      <DeleteEventModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Contenedor de Toast */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default RoomsPage;
