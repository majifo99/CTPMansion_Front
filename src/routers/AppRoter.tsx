import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';


// Lazy loading for pages
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
const SalasPage = React.lazy(() => import('../pages/DashboardPages/SalasPage'));
const CertificacionesPage = React.lazy(() => import('../pages/DashboardPages/CertificacionesPage'));
const RoomsPage =React.lazy(()=> import('../DashboardPages/RoomsPage'));
const LaboratoriosPage = React.lazy(() => import('../pages/DashboardPages/LaboratoriosPage'));
const EventosPage = React.lazy(() => import('../DashboardPages/EventosPage'));
const UDPsPage = React.lazy(() => import('../pages/DashboardPages/UDPsPage'));
const SpecialitiesPageD = React.lazy(() => import('../DashboardPages/SpecialitiesPageD'));
const TalleresPage = React.lazy(() => import('../DashboardPages/WorkshopsPageD'));
const ElaborarSalasPage = React.lazy(() => import('../pages/DashboardPages/ElaborarSalasPage'));
const ElaborarLaboratoriosPage = React.lazy(() => import('../DashboardPages/LaboratoriesPage'));
const RolesManagement = React.lazy(() => import('../DashboardPages/Rolesmanagement'));
const SolicitarSala = React.lazy(() => import('../DashboardPages/RoomRequestPage')); // Add this import
const SolicitarLaboratorio = React.lazy(() => import('../DashboardPages/RoomRequest')); // Add this import


const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#3b82f6" size={100} />
        </div>
      }>
        <Routes>
          {/* Main Page Routes */}
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
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="certificaciones" element={<CertificacionesPage />} />
            <Route path="salas" element={<SalasPage />} />

          <Route path="/verify" element={<VerificationForm />} />
          {/* Rutas del Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="certificaciones" element={<CertificacionesPage />} />
            {/* Rutas de Gestiones */}
            <Route path="salas" element={<RoomsPage />} />

            <Route path="laboratorios" element={<LaboratoriosPage />} />
            <Route path="roles" element={<RolesManagement />} />
            <Route path="eventos" element={<EventosPage />} />
            <Route path="udps" element={<UDPsPage />} />
            <Route path="especialidades" element={<SpecialitiesPageD />} />
            <Route path="talleres" element={<TalleresPage />} />
            <Route path="elaborar-salas" element={<ElaborarSalasPage />} />
            <Route path="elaborar-laboratorios" element={<ElaborarLaboratoriosPage />} />
            {/* New Routes for Solicitudes */}
            <Route path="solicitar-sala" element={<SolicitarSala />} />
            <Route path="solicitar-laboratorio" element={<SolicitarLaboratorio />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
