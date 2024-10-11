import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RequestStatus } from '../types/LaboratoryRequestType';
import { useLabsAndRequests } from '../hooks/useLabs';

const ManageLabRequests: React.FC = () => {
  const {
    labRequests,
    labs,
    loading,
    error,
    handleApproveLabRequest,
    handleRejectLabRequest,
    fetchLabRequestsData,
  } = useLabsAndRequests();

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const approveRequest = async (id: number | undefined) => {
    if (!id) {
      notifyError('ID de solicitud inválido');
      return;
    }

    try {
      await handleApproveLabRequest(id);
      notifySuccess('Solicitud de laboratorio aprobada exitosamente');
      fetchLabRequestsData();
    } catch {
      notifyError('Error al aprobar la solicitud');
    }
  };

  const rejectRequest = async (id: number | undefined) => {
    if (!id) {
      notifyError('ID de solicitud inválido');
      return;
    }

    try {
      await handleRejectLabRequest(id);
      notifySuccess('Solicitud de laboratorio rechazada exitosamente');
      fetchLabRequestsData();
    } catch {
      notifyError('Error al rechazar la solicitud');
    }
  };

  const sortedRequests = labRequests.sort((a, b) => {
    if (a.status === RequestStatus.Pending && b.status !== RequestStatus.Pending) return -1;
    if (a.status === RequestStatus.Approved && b.status === RequestStatus.Rejected) return -1;
    if (a.status === b.status) return 0;
    return 1;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Solicitudes de Laboratorio</h2>

      {loading && <p>Cargando solicitudes...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRequests.length === 0 ? (
          <p>No hay solicitudes de laboratorio disponibles</p>
        ) : (
          sortedRequests.map((request) => {
            const requestStatus = request.status || RequestStatus.Pending;
            const isPending = requestStatus === RequestStatus.Pending;
            const isApproved = requestStatus === RequestStatus.Approved;
            const isRejected = requestStatus === RequestStatus.Rejected;

            const requestedLab = labs.find((lab) => lab.id_Laboratory === request.laboratoryId);
            const labName = requestedLab ? requestedLab.name : 'Laboratorio desconocido';

            return (
              <div
                key={request.id_LaboratoryRequest}
                className={`p-4 border border-gray-300 rounded-lg shadow-md transition-opacity duration-300 ${isApproved || isRejected ? 'opacity-50' : ''}`}
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
                <p><strong>Laboratorio Solicitado:</strong> {labName}</p>

                <p className={`font-bold mt-2 ${isApproved ? 'text-green-600' : isRejected ? 'text-red-600' : 'text-yellow-600'}`}>
                  Estado: {isApproved ? 'Aprobada' : isRejected ? 'Rechazada' : 'Pendiente'}
                </p>

                {isPending && (
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      onClick={() => approveRequest(request.id_LaboratoryRequest)}
                    >
                      Aprobar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      onClick={() => rejectRequest(request.id_LaboratoryRequest)}
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

      <ToastContainer />
    </div>
  );
};

export default ManageLabRequests;
