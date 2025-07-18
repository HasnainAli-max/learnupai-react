import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    label: 'Organization Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <rect x="3" y="15" width="6" height="6" rx="1" />
      </svg>
    ),
    to: '/orgnization-analytics'
  },
  {
    label: 'Team Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="4" />
        <circle cx="17" cy="7" r="3" />
        <path d="M2 21v-2a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v2" />
        <path d="M17 21v-2a4 4 0 0 0-2-3.46" />
      </svg>
    ),
    to: '/team-analytics'
  },
  {
    label: 'Employee Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
    to: '/employee-analytics'
  },
  {
    label: 'Learning Plan Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 3h14a2 2 0 0 1 2 2v16l-7-4-7 4V5a2 2 0 0 1 2-2z" />
      </svg>
    ),
    to: '/learning-plan'
  },
  {
    label: 'Feedback Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    to: '/feedback'
  },
  {
    label: 'Reports List',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 10h8M8 14h6" />
      </svg>
    ),
    to: '/reports'
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="sidebar-toggle-btn">
        {isOpen ? '✖' : '☰'}
      </button>

      <aside style={{ ...styles.sidebar, transform: isOpen ? 'translateX(0)' : '', }} className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul style={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                onClick={() => setIsOpen(false)} // close sidebar on click
                className={({ isActive }) => isActive ? 'nav-link-active' : ''}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.active : {})
                })}
              >
                <span style={styles.icon}>{item.icon}</span>
                <span className="label" style={styles.label}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Responsive styles */}
      <style>{`
        .sidebar-toggle-btn {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          background-color: #0047ff;
          color: white;
          border: none;
          padding: 10px 12px;
          font-size: 20px;
          border-radius: 6px;
          z-index: 1001;
        }

        @media (max-width: 700px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            z-index: 1000;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .sidebar-toggle-btn {
            display: block;
          }

          .label {
            display: inline-block;
          }
        }

        .nav-link-active {
          color: white !important;
          background-color: #0047ff !important;
        }

        .nav-link-active svg {
          stroke: white !important;
        }
      `}</style>
    </>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#f9f9fb',
    padding: '20px 12px',
    minHeight: '100vh',
    boxSizing: 'border-box',
    borderRight: '1px solid #e0e0e0',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    borderRadius: '6px',
    padding: '10px 12px',
    fontWeight: '500',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '12px',
    transition: 'background 0.2s ease-in-out',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '20px',
    color: '#7795FF',
  },
  label: {
    fontSize: '14px',
  },
  active: {
    backgroundColor: '#0047ff',
    color: '#fff',
  }
};

export default Sidebar;
