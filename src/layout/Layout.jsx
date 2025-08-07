import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* <div style={{ padding: '20px', alignSelf: 'flex-end' }}>
            <Button />
          </div> */}
          <main style={{ padding: '20px' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
