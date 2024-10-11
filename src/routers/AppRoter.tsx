import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import ProtectedRoute from './ProtectedRoute';  // Componente de rutas protegidas
import { AuthProvider } from '../contexts/AuthContext';
import UserProfile from '../DashboardPages/UserProfile';


// Lazy loading para páginas
const HomePage = React.lazy(() => import('../pages/HomePage'));
const SpecialitiesPage = React.lazy(() => import('../components/SpecialitiesPage'));
const UsPage = React.lazy(() => import('../components/UsPage'));
const Events = React.lazy(() => import('../components/Events'));
const WorkshopsPage = React.lazy(() => import('../components/WorkshopsPage'));
const CertificatesPage = React.lazy(() => import('../pages/CertificatesPage'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));
const CertificacionesPage = React.lazy(() => import('../DashboardPages/CertificationRequestsTable'));
const Register = React.lazy(() => import('../components/RegisterForm'));
const VerificationForm = React.lazy(() => import('../components/VerificationForm'));
const LoginForm = React.lazy(() => import('../components/LoginForm'));
const RequestPasswordReset = React.lazy(() => import('../components/RequestPasswordReset'));
const ResetPasswordForm = React.lazy(() => import('../components/ResetPasswordForm'));
const SalasPage = React.lazy(() => import('../DashboardPages/ManageRoomRequests'));
const RoomsPage = React.lazy(() => import('../DashboardPages/RoomsPage'));
const LabRequestPage = React.lazy(() => import('../DashboardPages/ManageLabRequests'));
const EventosPage = React.lazy(() => import('../DashboardPages/EventosPage'));
const UDPsPage = React.lazy(() => import('../pages/DashboardPages/UDPsPage'));
const SpecialitiesPageD = React.lazy(() => import('../DashboardPages/SpecialitiesPageD'));
const TalleresPage = React.lazy(() => import('../DashboardPages/WorkshopsPageD'));
const ElaborarLaboratoriosPage = React.lazy(() => import('../DashboardPages/LaboratoriesPage'));
const RolesManagement = React.lazy(() => import('../DashboardPages/Rolesmanagement'));
const SolicitarSala = React.lazy(() => import('../DashboardPages/RoomRequestPage'));
const SolicitarLaboratorio = React.lazy(() => import('../DashboardPages/LabRequestPage'));
const Unauthorized = React.lazy(() => import('../pages/UnauthorizedPage')); // Página de no autorizado

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#3b82f6" size={100} />
          </div>
        }>
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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="perfil" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              {/* Rutas específicas dentro del dashboard con roles */}
              <Route path="certificaciones" element={
                <ProtectedRoute requiredRoles={['Admin', 'CertificationManager']}>
                  <CertificacionesPage />
                </ProtectedRoute>
              } />
              <Route path="salas" element={
                <ProtectedRoute requiredRoles={['Admin', 'RoomManager', 'ConferenceRoomManager']}>
                  <SalasPage />
                </ProtectedRoute>
              } />
              <Route path="laboratorios" element={
                <ProtectedRoute requiredRoles={['Admin', 'LabManager']}>
                  <LabRequestPage />
                </ProtectedRoute>
              } />
              <Route path="roles" element={
                <ProtectedRoute requiredRoles={['Admin']}>
                  <RolesManagement />
                </ProtectedRoute>
              } />
              <Route path="eventos" element={
                <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                  <EventosPage />
                </ProtectedRoute>
              } />
              <Route path="udps" element={
                <ProtectedRoute requiredRoles={['Admin', 'UDPManager']}>
                  <UDPsPage />
                </ProtectedRoute>
              } />
              <Route path="especialidades" element={
                <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                  <SpecialitiesPageD />
                </ProtectedRoute>
              } />
              <Route path="talleres" element={
                <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                  <TalleresPage />
                </ProtectedRoute>
              } />
              <Route path="elaborar-salas" element={
                <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                  <RoomsPage />
                </ProtectedRoute>
              } />
              <Route path="elaborar-laboratorios" element={
                <ProtectedRoute requiredRoles={['Admin', 'ContentEditor']}>
                  <ElaborarLaboratoriosPage />
                </ProtectedRoute>
              } />
              <Route path="solicitar-sala" element={
                <ProtectedRoute requiredRoles={['RoomandLabRequester']}>
                  <SolicitarSala />
                </ProtectedRoute>
              } />
              <Route path="solicitar-laboratorio" element={
                <ProtectedRoute requiredRoles={['RoomandLabRequester']}>
                  <SolicitarLaboratorio />
                </ProtectedRoute>
              } />

           
              
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
