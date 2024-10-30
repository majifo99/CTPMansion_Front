import React, { useState } from 'react';
import { useSpecialities } from '../hooks/useSpecialities';
import EditSpecialityModal from '../modals/EditSpecialityModal';
import DeleteEventModal from '../modals/DeleteEventModal';
import { Speciality } from '../types/Types';
import { AiFillDelete, AiTwotoneEdit, AiTwotonePlusSquare } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpecialityForm from './SpecialityForm';

const SpecialitiesPage: React.FC = () => {
  const { specialities, loading, error, handleAddSpeciality, handleEditSpeciality, handleDeleteSpeciality } = useSpecialities();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingSpeciality, setEditingSpeciality] = useState<Speciality | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingSpecialityId, setDeletingSpecialityId] = useState<number | null>(null);

  // Abrir el modal de edición o creación
  const handleOpenEditModal = (speciality?: Speciality) => {
    setEditingSpeciality(speciality || null);
    setShowEditModal(true);
  };

  // Cerrar el modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingSpeciality(null);
  };

  // Guardar la especialidad (agregar o editar)
  const handleSaveSpeciality = async (speciality: Speciality) => {
    if (editingSpeciality) {
      await handleEditSpeciality(editingSpeciality.id, speciality);
      toast.success('Especialidad editada correctamente');
    } else {
      await handleAddSpeciality(speciality);
      toast.success('Especialidad agregada correctamente');
    }
    handleCloseEditModal();
  };

  // Abre el modal de confirmación de eliminación
  const handleOpenDeleteModal = (id: number) => {
    setDeletingSpecialityId(id);
    setShowDeleteModal(true);
  };

  // Cerrar el modal de confirmación de eliminación
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingSpecialityId(null);
  };

  // Confirmación de eliminación
  const handleConfirmDelete = async () => {
    if (deletingSpecialityId !== null) {
      await handleDeleteSpeciality(deletingSpecialityId);
      toast.success('Especialidad eliminada correctamente');
      handleCloseDeleteModal();
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Especialidades</h1>

      <div className="flex justify-end mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => handleOpenEditModal()}
        >
          <AiTwotonePlusSquare size={30} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white text-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {specialities.map((speciality) => (
              <tr key={speciality.id} className="border-t">
                <td className="border px-4 py-2">{speciality.title}</td>
                <td className="border px-4 py-2">{speciality.description}</td>
                <td className="border px-4 py-2">
                  <img src={speciality.url_Image} alt={speciality.title} className="h-16 w-16 object-cover rounded-lg mx-auto" />
                </td>
                <td className="border px-4 py-2 flex justify-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleOpenEditModal(speciality)}
                  >
                    <AiTwotoneEdit size={24} />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleOpenDeleteModal(speciality.id)}
                  >
                    <AiFillDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar especialidad */}
      <EditSpecialityModal
        show={showEditModal}
        onClose={handleCloseEditModal}
      >
        <SpecialityForm
          speciality={editingSpeciality}
          onSave={handleSaveSpeciality}
          onCancel={handleCloseEditModal}
        />
      </EditSpecialityModal>

      {/* Modal para confirmar eliminación */}
      <DeleteEventModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Contenedor de Toast */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default SpecialitiesPage;
