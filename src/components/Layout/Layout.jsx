import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import BottomNav from '../BottomNav';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-black text-brand-text-primary overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:py-2 lg:pr-2">


        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-zinc-900 lg:rounded-md md:rounded-md">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet onMenuClick={toggleSidebar} />
          </div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Layout;
