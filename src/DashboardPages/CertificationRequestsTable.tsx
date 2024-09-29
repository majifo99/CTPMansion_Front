import React, { useState } from 'react';
import { CertificationRequest } from '../types/Types'; // Define la estructura de las solicitudes
import useCertificationRequests from '../hooks/useCertificationRequests'; // Hook personalizado
import Modal from '../modals/ModalRequest'; // Modal personalizado
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos de Toastify

const CertificationRequestsTable: React.FC = () => {
  const { requests, loading, error, handleRejectRequest, handleApproveRequest, setDeliveryDeadline, getCertificationName } = useCertificationRequests();
  const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [deliveryDays, setDeliveryDays] = useState<number>(0);
  const [isDeliveryDaysSaved, setIsDeliveryDaysSaved] = useState<boolean>(false); // Controlar si los días han sido guardados

  // Abrir el modal para ingresar los días de entrega
  const openDeliveryModal = (request: CertificationRequest) => {
    setSelectedRequest(request);
    setDeliveryDays(0); // Restablecer días de entrega
    setIsDeliveryDaysSaved(false); // Restablecer el estado de guardado
    setIsModalOpen(true);
  };

  // Abrir modal para ver detalles completos
  const openDetailModal = (request: CertificationRequest) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  // Cerrar modales
  const closeModal = () => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedRequest(null);
  };

  // Guardar días límite (fecha de entrega)
  const handleSaveDeliveryDays = async () => {
    if (selectedRequest && deliveryDays > 0) {
      try {
        await setDeliveryDeadline(selectedRequest.id, deliveryDays);
        setIsDeliveryDaysSaved(true); // Marcar como guardado
        toast.success('Días límite guardados correctamente.');
      } catch (error) {
        toast.error('Error al guardar los días límite.');
      }
    } else {
      toast.error('Por favor, ingrese un número válido de días de entrega.');
    }
  };

  // Aprobar solicitud desde el modal
  const handleApprove = async () => {
    if (selectedRequest && isDeliveryDaysSaved) {
      try {
        await handleApproveRequest(selectedRequest.id);
        closeModal();
        toast.success('Solicitud aprobada.');
      } catch (error) {
        toast.error('Error al aprobar la solicitud.');
      }
    } else {
      toast.error('Por favor, guarde primero los días límite.');
    }
  };

  // Rechazar solicitud
  const handleReject = async (request: CertificationRequest) => {
    try {
      await handleRejectRequest(request.id);
      toast.success('Solicitud rechazada.');
    } catch (error) {
      toast.error('Error al rechazar la solicitud.');
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Cargando solicitudes...</p>;
  }

  if (error) {
    toast.error(`Error: ${error}`);
  }

  // Asignar clase de color basada en el estado de la solicitud
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0: // Pendiente
        return 'text-yellow-500';
      case 1: // Aprobado
        return 'text-green-500';
      case 2: // Rechazado
        return 'text-red-500';
      default:
        return '';
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Aprobado';
      case 2:
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer /> {/* Contenedor para notificaciones */}
      
      <h1 className="text-3xl font-bold mb-8 text-center">Solicitudes de Certificación</h1>
      
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre del Estudiante</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Tipo de Certificación</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="text-center">
              <td className="py-2 px-4 border-b">{request.id}</td>
              <td className="py-2 px-4 border-b">{request.studentName}</td>
              <td className={`py-2 px-4 border-b ${getStatusColor(request.status)}`}>
                {getStatusText(request.status)}
              </td>
              {/* Mostrar el nombre de la certificación usando el ID de la certificación */}
              <td className="py-2 px-4 border-b">{getCertificationName(request.certificationNameId)}</td>
              <td className="py-2 px-4 border-b space-y-2">
                <button
                  className="bg-green-500 text-white px-6 py-1 rounded hover:bg-green-600"
                  onClick={() => openDeliveryModal(request)}
                >
                  Aceptar
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-600"
                  onClick={() => handleReject(request)}
                >
                  Rechazar
                </button>
                <button
                  className="bg-gray-500 text-white px-6 py-1 rounded hover:bg-gray-600"
                  onClick={() => openDetailModal(request)}
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para ingresar los días de entrega y aprobar */}
      {isModalOpen && selectedRequest && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Gestionar Solicitud</h2>
          <p>
            <strong>Nombre del Estudiante:</strong> {selectedRequest.studentName}
          </p>
          <p>
            <strong>ID del Estudiante:</strong> {selectedRequest.studentIdentification}
          </p>
          
          {/* Seleccionar días de entrega */}
          <div className="mt-4">
            <label className="block font-semibold mb-2">Días de entrega:</label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(Number(e.target.value))}
              placeholder="Ingresa los días de entrega"
              disabled={isDeliveryDaysSaved} // Deshabilitar el input después de guardar
            />
          </div>

          {/* Botón para guardar los días de entrega */}
          {!isDeliveryDaysSaved && (
            <button
              onClick={handleSaveDeliveryDays}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            >
              Guardar Días Límite
            </button>
          )}

          {/* Botón para aprobar la solicitud */}
          {isDeliveryDaysSaved && (
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Aprobar Solicitud
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* Modal para mostrar todos los datos */}
      {isDetailModalOpen && selectedRequest && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Detalles Completos de la Solicitud</h2>
          <p>
            <strong>Nombre del Estudiante:</strong> {selectedRequest.studentName}
          </p>
          <p>
            <strong>ID del Estudiante:</strong> {selectedRequest.studentIdentification}
          </p>
          <p>
            <strong>Email:</strong> {selectedRequest.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {selectedRequest.phoneNumber}
          </p>
          <p>
            <strong>Fecha de Solicitud:</strong> {new Date(selectedRequest.requestDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Fecha de Respuesta:</strong> {selectedRequest.responseDate ? new Date(selectedRequest.responseDate).toLocaleDateString() : 'Sin respuesta'}
          </p>
          <p>
            <strong>Estado:</strong> {getStatusText(selectedRequest.status)}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default CertificationRequestsTable;
