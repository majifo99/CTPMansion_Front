import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Lazy loading para las páginas
const HomePage = React.lazy(() => import('../pages/HomePage'));
const SpecialitiesPage = React.lazy(() => import('../components/SpecialitiesPage'));
const UsPage = React.lazy(() => import('../components/UsPage'));
const Events = React.lazy(() => import('../components/Events'));
const WorkshopsPage = React.lazy(() => import('../components/WorkshopsPage'));
const CertificatesPage = React.lazy(() => import('../pages/CertificatesPage'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/specialities" element={<SpecialitiesPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/us" element={<UsPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
