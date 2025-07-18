import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Button from '../components/Button';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Move Button inside flow */}
          <div style={{ padding: '20px', alignSelf: 'flex-end' }}>
            <Button />
          </div>
          {/* Main content goes below the button */}
          <main style={{ padding: '20px' }}>
            <Outlet />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
