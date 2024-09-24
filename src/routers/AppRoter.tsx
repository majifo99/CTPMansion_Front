import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy loading for pages
const HomePage = React.lazy(() => import('../pages/HomePage'));
const SpecialitiesPage = React.lazy(() => import('../components/SpecialitiesPage'));
const UsPage = React.lazy(() => import('../components/UsPage'));
const Events = React.lazy(() => import('../components/Events'));
const WorkshopsPage = React.lazy(() => import('../components/WorkshopsPage'));
const CertificatesPage = React.lazy(() => import('../pages/CertificatesPage'));
const DashboardLayout = React.lazy(() => import('../layouts/DashboardLayout'));
const Register = React.lazy(() => import('../components/Register'));
const VerificationForm = React.lazy(() => import('../components/VerificationForm'));
const LoginForm = React.lazy(() => import('../components/LoginForm'));
const RequestPasswordReset = React.lazy(() => import('../components/RequestPasswordReset'));
const ResetPasswordForm = React.lazy(() => import('../components/ResetPasswordForm'));

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
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerificationForm />} />
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
