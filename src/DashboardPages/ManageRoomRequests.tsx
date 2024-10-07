import React from 'react';
import { useRoomsAndRequests } from '../hooks/useRooms'; // Importa el hook que maneja las solicitudes de sala
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequestStatus } from '../types/RoomRequestType'; // Importamos el enum para manejar el estado de las solicitudes

const ManageRoomRequests: React.FC = () => {
  const {
    roomRequests,
    rooms,
    loading,
    error,
    handleApproveRequest,
    handleRejectRequest,
    fetchRoomRequestsData, // Asegúrate de traer la función que recarga los datos.
  } = useRoomsAndRequests(); // Llamamos al hook que trae los datos

  // Notificaciones de éxito o error
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const approveRequest = async (id: number) => {
    try {
      await handleApproveRequest(id);
      notifySuccess('Solicitud aprobada exitosamente');
      fetchRoomRequestsData(); // Recarga los datos después de aprobar
    } catch {
      notifyError('Error al aprobar la solicitud');
    }
  };

  const rejectRequest = async (id: number) => {
    try {
      await handleRejectRequest(id);
      notifySuccess('Solicitud rechazada exitosamente');
      fetchRoomRequestsData(); // Recarga los datos después de rechazar
    } catch {
      notifyError('Error al rechazar la solicitud');
    }
  };

  // Ordenar las solicitudes: Pendientes primero, luego Aprobadas, luego Rechazadas
  const sortedRequests = roomRequests.sort((a, b) => {
    if (a.status === RequestStatus.Pending && b.status !== RequestStatus.Pending) return -1;
    if (a.status === RequestStatus.Approved && b.status === RequestStatus.Rejected) return -1;
    if (a.status === b.status) return 0;
    return 1;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Solicitudes de Sala</h2>

      {loading && <p>Cargando solicitudes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRequests.length === 0 ? (
          <p>No hay solicitudes de sala disponibles</p>
        ) : (
          sortedRequests.map((request) => {
            // Aseguramos que el estado esté definido
            const requestStatus = request.status || RequestStatus.Pending;
            const isPending = requestStatus === RequestStatus.Pending;
            const isApproved = requestStatus === RequestStatus.Approved;
            const isRejected = requestStatus === RequestStatus.Rejected;

            // Buscar el nombre de la sala solicitada
            const requestedRoom = rooms.find((room) => room.id_Room === request.roomId);
            const roomName = requestedRoom ? requestedRoom.name : 'Sala desconocida';

            return (
              <div
                key={request.id_RoomRequest}
                className={`p-4 border border-gray-300 rounded-lg shadow-md transition-opacity duration-300 ${isApproved || isRejected ? 'opacity-50' : ''}`} // La tarjeta se oscurece si está aprobada o rechazada
              >
                <h3 className="text-lg font-semibold mb-2">
                  {request.managerName} {request.managerLastName}
                </h3>
                <p><strong>Curso:</strong> {request.course}</p>
                <p><strong>Descripción:</strong> {request.activityDescription}</p>
                <p><strong>Necesidades:</strong> {request.needs}</p>
                <p><strong>Número de Asistentes:</strong> {request.numberOfAttendees}</p>
                <p><strong>Fecha:</strong> {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {request.startTime} - {request.endTime}</p>
                <p><strong>Sala Solicitada:</strong> {roomName}</p> {/* Mostrar el nombre de la sala */}

                {/* Mostrar el estado */}
                <p className={`font-bold mt-2 ${isApproved ? 'text-green-600' : isRejected ? 'text-red-600' : 'text-yellow-600'}`}>
                  Estado: {isApproved ? 'Aprobada' : isRejected ? 'Rechazada' : 'Pendiente'}
                </p>

                {/* Botones de aprobar/rechazar solo si está pendiente */}
                {isPending && (
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      onClick={() => approveRequest(request.id_RoomRequest)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      onClick={() => rejectRequest(request.id_RoomRequest)}
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <ToastContainer /> {/* Contenedor para notificaciones */}
    </div>
  );
};

export default ManageRoomRequests;
