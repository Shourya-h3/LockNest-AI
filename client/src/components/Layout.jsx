import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-background text-text overflow-hidden relative">
      {/* Global 3D Grid Background */}
      <div className="bg-3d-grid opacity-10 pointer-events-none"></div>
      
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-10 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
