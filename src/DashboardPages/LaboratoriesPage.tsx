import React, { useState } from 'react';
import { useLaboratories } from '../hooks/useLaboratories';
import EditLaboratoryModal from '../modals/EditLaboratoryModal';
import DeleteEventModal from '../modals/DeleteEventModal'; 
import { AiFillDelete, AiTwotoneEdit, AiTwotonePlusSquare } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Laboratory } from '../types/LaboratoryRequestType';

const LaboratoriesPage: React.FC = () => {
  const { laboratories, loading, error, handleAddLaboratory, handleEditLaboratory, handleDeleteLaboratory } = useLaboratories();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [editingLaboratory, setEditingLaboratory] = useState<Laboratory | null>(null);
  const [deletingLaboratoryId, setDeletingLaboratoryId] = useState<number | null>(null);

  console.log('Laboratories:', laboratories);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const handleOpenEditModal = (laboratory?: Laboratory) => {
    setEditingLaboratory(laboratory || null);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingLaboratory(null);
  };

  const handleSaveLaboratory = (laboratory: Laboratory) => {
    if (editingLaboratory) {
      handleEditLaboratory(editingLaboratory.id_Laboratory, laboratory); // Editar laboratorio
      toast.success('Laboratorio editado con éxito!');
    } else {
      handleAddLaboratory(laboratory); // Agregar nuevo laboratorio
      toast.success('Laboratorio creado con éxito!');
    }
    handleCloseEditModal();
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeletingLaboratoryId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingLaboratoryId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingLaboratoryId !== null) {
      handleDeleteLaboratory(deletingLaboratoryId); // Eliminar laboratorio
      toast.error('Laboratorio eliminado');
      handleCloseDeleteModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Laboratorios</h1>

      <div className="flex justify-end mb-6 mr-10">
        <button
          className="bg-softGreen hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
          onClick={() => handleOpenEditModal()}
        >
          <AiTwotonePlusSquare size={30} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center bg-white text-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Capacidad</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-2">Cargando...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-red-500">Error: {error}</td>
              </tr>
            ) : laboratories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2">No hay laboratorios disponibles.</td>
              </tr>
            ) : (
              laboratories.map((laboratory) => (
                <tr key={laboratory.id_Laboratory} className="border-t">
                  <td className="border px-4 py-2">{laboratory.name}</td>
                  <td className="border px-4 py-2">{laboratory.description}</td>
                  <td className="border px-4 py-2">{laboratory.capacity}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={laboratory.url_Image}
                      alt={laboratory.name}
                      className="h-16 w-16 object-cover mx-auto rounded-lg"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleOpenEditModal(laboratory)}
                    >
                      <AiTwotoneEdit size={30} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleOpenDeleteModal(laboratory.id_Laboratory)}
                    >
                      <AiFillDelete size={30} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Agregar/Editar Laboratorio */}
      <EditLaboratoryModal
        show={showEditModal}
        laboratory={editingLaboratory}
        onClose={handleCloseEditModal}
        onSave={handleSaveLaboratory}
      />

      {/* Modal para Confirmación de Eliminación */}
      <DeleteEventModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Contenedor para Toasts */}
      <ToastContainer />
    </div>
  );
};

export default LaboratoriesPage;