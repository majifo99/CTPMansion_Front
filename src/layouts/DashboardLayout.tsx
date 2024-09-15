
import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';


const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-4">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas del Dashboard */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;