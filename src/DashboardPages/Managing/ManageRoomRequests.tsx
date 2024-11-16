// src/pages/ManageRoomRequests.tsx
import React, { useState } from 'react';
import { useRoomsAndRequests } from '../../hooks/useRooms';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequestStatus, RoomRequest } from '../../types/RoomRequestType';
import RoomRequestDetailsModal from '../../modals/RoomRequestDetailsModal';
import RoomRequestHistoryModal from '../../modals/RoomRequestHistoryModal';

const ManageRoomRequests: React.FC = () => {
  const { roomRequests, rooms, loading, error, handleApproveRequest, handleRejectRequest, fetchRoomRequestsData } =
    useRoomsAndRequests();

  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // Estado para el modal de historial

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const approveRequest = async (id: number) => {
    try {
      await handleApproveRequest(id);
      notifySuccess('Solicitud aprobada exitosamente');
      fetchRoomRequestsData();
    } catch {
      notifyError('Error al aprobar la solicitud');
    }
  };

  const rejectRequest = async (id: number) => {
    try {
      await handleRejectRequest(id);
      notifySuccess('Solicitud rechazada exitosamente');
      fetchRoomRequestsData();
    } catch {
      notifyError('Error al rechazar la solicitud');
    }
  };

  // Filtrar solicitudes pendientes
  const pendingRequests = roomRequests.filter((request) => request.status === RequestStatus.Pending);

  const openModal = (request: RoomRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Solicitudes de Sala</h2>

      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={openHistoryModal}
        >
          Ver Historial de Solicitudes
        </button>
      </div>

      {loading && <p>Cargando solicitudes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingRequests.length === 0 ? (
          <p>No hay solicitudes pendientes.</p>
        ) : (
          pendingRequests.map((request) => {
            const roomName = rooms.find((room) => room.id_Room === request.roomId)?.name || 'Sala desconocida';

            return (
              <div key={request.id_RoomRequest} className="p-4 border border-gray-300 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">
                  {request.managerName} {request.managerLastName}
                </h3>
                <p><strong>Curso:</strong> {request.course}</p>
                <p><strong>Sala:</strong> {roomName}</p>

                <button
                  className="mt-4 w-full bg-blue-100 text-blue-700 px-4 py-2 rounded border hover:bg-blue-200"
                  onClick={() => openModal(request)}
                >
                  Ver más información
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de detalles */}
      {selectedRequest && (
        <RoomRequestDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          request={selectedRequest}
          onApprove={approveRequest}
          onReject={rejectRequest}
        />
      )}

      {/* Modal de historial */}
      <RoomRequestHistoryModal isOpen={isHistoryModalOpen} onClose={closeHistoryModal} roomRequests={roomRequests} />

      <ToastContainer />
    </div>
  );
};

export default ManageRoomRequests;
