import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

// Lazy loading para las páginas
const HomePage = React.lazy(() => import('../pages/HomePage'));
const SpecialitiesPage = React.lazy(() => import('../components/SpecialitiesPage'));
const UsPage = React.lazy(() => import('../components/UsPage'));
const Events = React.lazy(() => import('../components/Events'));
const WorkshopsPage = React.lazy(() => import('../components/WorkshopsPage'));
const CertificatesPage = React.lazy(() => import('../pages/CertificatesPage'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));
const CertificacionesPage = React.lazy(() => import('../pages/DashboardPages/CertificacionesPage'));
const SalasPage = React.lazy(() => import('../pages/DashboardPages/SalasPage'));
const LaboratoriosPage = React.lazy(() => import('../pages/DashboardPages/LaboratoriosPage'));
const EventosPage = React.lazy(() => import('../DashboardPages/EventosPage'));
const UDPsPage = React.lazy(() => import('../pages/DashboardPages/UDPsPage'));
const SpecialitiesPageD = React.lazy(() => import('../DashboardPages/SpecialitiesPageD'));
const TalleresPage = React.lazy(() => import('../DashboardPages/WorkshopsPageD'));
const ElaborarSalasPage = React.lazy(() => import('../pages/DashboardPages/ElaborarSalasPage'));
const ElaborarLaboratoriosPage = React.lazy(() => import('../pages/DashboardPages/ElaborarLaboratoriosPage'));


const AppRouter: React.FC = () => {
  return (
    <Router>

      <Suspense fallback={ <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={100} /> {/* Spinner personalizado */}
      </div>}>
        <Routes>
          {/* Rutas de la página principal */}
          <Route path="/" element={<HomePage />} />
          <Route path="/specialities" element={<SpecialitiesPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/us" element={<UsPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/certificates" element={<CertificatesPage />} />

          {/* Rutas del Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="certificaciones" element={<CertificacionesPage />} />
            {/* Rutas de Gestiones */}
            <Route path="salas" element={<SalasPage />} />
            <Route path="laboratorios" element={<LaboratoriosPage />} />
            {/* Rutas de Creación */}
            <Route path="eventos" element={<EventosPage />} />
            <Route path="udps" element={<UDPsPage />} />
            <Route path="especialidades" element={<SpecialitiesPageD />} />
            <Route path="talleres" element={<TalleresPage />} />
            <Route path="elaborar-salas" element={<ElaborarSalasPage />} />
            <Route path="elaborar-laboratorios" element={<ElaborarLaboratoriosPage />} />
          </Route>
        </Routes>
      </Suspense>

    </Router>
  );
};

export default AppRouter;
