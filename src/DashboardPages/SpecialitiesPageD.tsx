import React, { useState } from 'react';
import { useSpecialities } from '../hooks/useSpecialities';
import EditSpecialityModal from '../modals/EditSpecialityModal'; // Modal para agregar/editar especialidad
import DeleteEventModal from '../modals/DeleteEventModal'; // Modal para confirmar eliminación
import { Speciality } from '../types/Types';
import { AiFillDelete, AiTwotoneEdit, AiTwotonePlusSquare } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SpecialitiesPage: React.FC = () => {
  const { specialities, loading, error, handleAddSpeciality, handleEditSpeciality, handleDeleteSpeciality } = useSpecialities();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingSpeciality, setEditingSpeciality] = useState<Speciality | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletingSpecialityId, setDeletingSpecialityId] = useState<number | null>(null);

  // Abre el modal de edición o creación
  const handleOpenEditModal = (speciality?: Speciality) => {
    setEditingSpeciality(speciality || null);
    setShowEditModal(true);
  };

  // Cierra el modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingSpeciality(null);
  };

  // Guarda la especialidad (agrega o edita)
  const handleSaveSpeciality = (speciality: Speciality) => {
    if (editingSpeciality) {
      handleEditSpeciality(editingSpeciality.id, speciality);
      toast.success('Especialidad editada correctamente');
    } else {
      handleAddSpeciality(speciality);
      toast.success('Especialidad agregada correctamente');
    }
    handleCloseEditModal();
  };

  // Abre el modal de confirmación de eliminación
  const handleOpenDeleteModal = (id: number) => {
    setDeletingSpecialityId(id);
    setShowDeleteModal(true);
  };

  // Cierra el modal de confirmación de eliminación
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingSpecialityId(null);
  };

  // Elimina la especialidad después de la confirmación
  const handleConfirmDelete = () => {
    if (deletingSpecialityId !== null) {
      handleDeleteSpeciality(deletingSpecialityId);
      toast.success('Especialidad eliminada correctamente');
      handleCloseDeleteModal();
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 bg-gray-600">
      <h1 className="text-3xl font-bold mb-6 text-center text-stone-50">Gestión de Especialidades</h1>
      <div className="flex justify-end mb-6 mr-10">
      <button className=" bg-softGreen hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg " onClick={() => handleOpenEditModal()}>
        <AiTwotonePlusSquare size={30} />
      </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white text-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {specialities.map((speciality, index) => (
              <tr key={speciality.id} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="border px-4 py-2">{speciality.title}</td>
                <td className="border px-4 py-2">{speciality.description}</td>
                <td className="border px-4 py-2">
                  <img src={speciality.url_Image} alt={speciality.title} className="h-16 w-16 object-cover rounded-lg mx-auto" />
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleOpenEditModal(speciality)}>
                  <AiTwotoneEdit size={20} />
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleOpenDeleteModal(speciality.id)}>
                    <AiFillDelete size={20} />
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
        speciality={editingSpeciality}
        onClose={handleCloseEditModal}
        onSave={handleSaveSpeciality}
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

export default SpecialitiesPage;
