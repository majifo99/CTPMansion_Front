import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequestStatus, RoomRequest } from '../../types/RoomRequestType';
import { useRoomsAndRequests } from '../../hooks/useRooms';
import RoomRequestDetailsModal from '../../modals/RoomRequestDetailsModal';

const ManageRoomRequests: React.FC = () => {
  const {
    roomRequests,
    rooms,
    loading,
    error,
    handleApproveRequest,
    handleRejectRequest,
    fetchRoomRequestsData,
  } = useRoomsAndRequests();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handleRequestAction = async (action: () => Promise<void>, successMessage: string) => {
    try {
      await action();
      notifySuccess(successMessage);
      await fetchRoomRequestsData();
      closeModal();
    } catch (error) {
      notifyError(`Error: ${error instanceof Error ? error.message : 'Ocurrió un error'}`);
    }
  };

  const approveRequest = (id: number) =>
    handleRequestAction(
      () => handleApproveRequest(id),
      'Solicitud aprobada exitosamente'
    );

  const rejectRequest = (id: number) =>
    handleRequestAction(
      () => handleRejectRequest(id),
      'Solicitud rechazada exitosamente'
    );

  const openModal = (request: RoomRequest) => {
    const room = rooms.find((r) => r.id_Room === request.roomId);

    if (!room && rooms.length === 0) {
      notifyError('Error cargando información de la sala');
      return;
    }

    setSelectedRequest({
      ...request,
      roomName: room?.name || 'Sala no encontrada',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const filteredRequests = roomRequests.filter((request) =>
    `${request.managerName} ${request.managerLastName} ${request.managerLastName2}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedRequests = filteredRequests.sort((a, b) => {
    // Orden principal por estado
    if (a.status === RequestStatus.Pending && b.status !== RequestStatus.Pending) return -1;
    if (a.status === RequestStatus.Approved && b.status === RequestStatus.Rejected) return -1;

    // Orden secundario por fecha (más reciente primero)
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA; // Más reciente primero
  });

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Solicitudes de Sala</h2>

      <div className="mb-4">
        <input
          type="text"
          className="border px-4 py-2 w-full rounded"
          placeholder="Buscar por gestor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="text-gray-600">Cargando solicitudes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRequests.length === 0 ? (
          <p className="text-gray-600">No hay solicitudes disponibles</p>
        ) : (
          sortedRequests.map((request) => (
            <div
              key={request.id_RoomRequest}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">
                {request.managerName} {request.managerLastName} {request.managerLastName2}
              </h3>
              <p className="text-gray-600 mt-2">
                Sala: {rooms.find((r) => r.id_Room === request.roomId)?.name || 'Desconocida'}
              </p>

              <button
                className="mt-4 w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                onClick={() => openModal(request)}
              >
                Ver detalles
              </button>
            </div>
          ))
        )}
      </div>

      {selectedRequest && (
        <RoomRequestDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          request={selectedRequest}
          onApprove={approveRequest}
          onReject={rejectRequest}
        />
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ManageRoomRequests;