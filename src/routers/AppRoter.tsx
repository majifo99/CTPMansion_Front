import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import SpecialitiesPage from '../components/SpecialitiesPage';
import UsPage from '../components/UsPage';
import AboutUs from '../components/AboutUs';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/specialties" element={<SpecialitiesPage />} />   
        <Route path="/Uspage" element={<UsPage />} />       
      </Routes>
    </Router>
  );
};

export default AppRouter;
