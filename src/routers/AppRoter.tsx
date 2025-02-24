import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import ProtectedRoute from './ProtectedRoute'; // Componente de rutas protegidas
import { AuthProvider } from '../contexts/AuthContext';
import UserProfile from '../DashboardPages/Main/UserProfile';
import DashboardHome from '../DashboardPages/Main/DashboardHome';
import AcceptedRejectedChart from '../DashboardPages/AcceptedRejectedChart';
import NotFound from '../pages/NotFound'; // Importar la página 404

const HomePage = React.lazy(() => import('../pages/HomePage'));
const SpecialitiesPage = React.lazy(() => import('../components/SpecialitiesPage'));
const UsPage = React.lazy(() => import('../components/UsPage'));
const Events = React.lazy(() => import('../components/Events'));
const WorkshopsPage = React.lazy(() => import('../components/WorkshopsPage'));
const CertificatesPage = React.lazy(() => import('../pages/CertificatesPage'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));
const CertificacionesPage = React.lazy(() => import('../DashboardPages/Managing/CertificationRequestsTable'));
const Register = React.lazy(() => import('../components/RegisterForm'));
const VerificationForm = React.lazy(() => import('../components/VerificationForm'));
const LoginForm = React.lazy(() => import('../components/LoginForm'));
const RequestPasswordReset = React.lazy(() => import('../components/RequestPasswordReset'));
const ResetPasswordForm = React.lazy(() => import('../components/ResetPasswordForm'));
const SalasPage = React.lazy(() => import('../DashboardPages/Managing/ManageRoomRequests'));
const RoomsPage = React.lazy(() => import('../DashboardPages/CRUD/Rooms/RoomsPage'));
const LabRequestPage = React.lazy(() => import('../DashboardPages/Managing/ManageLabRequests'));
const EventosPage = React.lazy(() => import('../DashboardPages/CRUD/Eventos/EventosPage'));
const UDPsPage = React.lazy(() => import('../DashboardPages/CRUD/UDPs/UDPsPage'));
const SpecialitiesPageD = React.lazy(() => import('../DashboardPages/CRUD/Specialities/SpecialitiesPageD'));
const TalleresPage = React.lazy(() => import('../DashboardPages/CRUD/Workshops/WorkshopsPageD'));
const ElaborarLaboratoriosPage = React.lazy(() => import('../DashboardPages/CRUD/Labs/LaboratoriesPage'));
const RolesManagement = React.lazy(() => import('../DashboardPages/Managing/Rolesmanagement'));
const SolicitarSala = React.lazy(() => import('../DashboardPages/Requests/RoomRequestPage'));
const SolicitarLaboratorio = React.lazy(() => import('../DashboardPages/Requests/LabRequestPage'));
const Unauthorized = React.lazy(() => import('../pages/UnauthorizedPage')); // Página de no autorizado
const OrderComponent = React.lazy(() => import('../DashboardPages/Requests/OrderComponent'));
const UpdateUDPBalanceComponent = React.lazy(() => import('../DashboardPages/Managing/UpdateUDPBalanceComponent'));
const OrdenesDePedido = React.lazy(() => import('../DashboardPages/Managing/ManageOrders'));

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <ClipLoader color="#3b82f6" size={100} />
            </div>
          }
        >
          <Routes>
            {/* Rutas de Páginas Principales */}
            <Route path="/" element={<HomePage />} />
            <Route path="/specialities" element={<SpecialitiesPage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/us" element={<UsPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerificationForm />} />
            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Ruta de No Autorizado */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas del Dashboard protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route
                path="perfil"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="ordenesdepedido"
                element={
                  <ProtectedRoute requiredRoles={['Admin']}>
                    <OrdenesDePedido />
                  </ProtectedRoute>
                }
              />
              <Route
                path="udps"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'UDPManager']}>
                    <UDPsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="certificaciones"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'CertificationManager']}>
                    <CertificacionesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="salas"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'RoomManager', 'ConferenceRoomManager']}>
                    <SalasPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="laboratorios"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'LabManager']}>
                    <LabRequestPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin-udp-balance"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'UDPManager']}>
                    <UpdateUDPBalanceComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orden-de-pedido"
                element={
                  <ProtectedRoute requiredRoles={['RoomandLabRequester']}>
                    <OrderComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="roles"
                element={
                  <ProtectedRoute requiredRoles={['Admin']}>
                    <RolesManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="eventos"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                    <EventosPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="especialidades"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                    <SpecialitiesPageD />
                  </ProtectedRoute>
                }
              />
              <Route
                path="talleres"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                    <TalleresPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="elaborar-salas"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                    <RoomsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="elaborar-laboratorios"
                element={
                  <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                    <ElaborarLaboratoriosPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="solicitar-sala"
                element={
                  <ProtectedRoute requiredRoles={['RoomandLabRequester']}>
                    <SolicitarSala />
                  </ProtectedRoute>
                }
              />
              <Route
                path="GraficoSalas"
                element={
                  <ProtectedRoute requiredRoles={['Admin']}>
                    <AcceptedRejectedChart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="solicitar-laboratorio"
                element={
                  <ProtectedRoute requiredRoles={['RoomandLabRequester']}>
                    <SolicitarLaboratorio />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Ruta para Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
