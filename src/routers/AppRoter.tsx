import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SpecialitiesPage from '../components/SpecialitiesPage';
import UsPage from '../components/UsPage';
import Events from '../components/Events';
import WorkshopsPage from '../components/WorkshopsPage';
import CertificatesPage from '../pages/CertificatesPage';
import Login from '../components/Login';
import Register from '../components/Register';
import VerificationForm from '../components/VerificationForm';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/specialties" element={<SpecialitiesPage />} />  
        <Route path="/Workshops" element={<WorkshopsPage />} />   
        <Route path="/Uspage" element={<UsPage />} /> 
        <Route path="/Events" element={<Events />} /> 
        <Route path="/Certificate" element={<CertificatesPage />}   />   
        <Route path='/login' element={<Login/>} /> 
        <Route path='/register' element={<Register/>} />
        <Route path="/verify-email" element={<VerificationForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
