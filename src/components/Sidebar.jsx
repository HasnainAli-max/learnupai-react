import React, { useState, useRef, useEffect } from 'react';
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
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* ☰ Open Icon - shown only on small screens and when sidebar is closed */}
      {!isOpen && (
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          ☰
        </button>
      )}

      {/* ✖ Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          ...styles.sidebar,
          transform: isOpen ? 'translateX(0)' : '',
        }}
      >
        {/* ✖ Close Icon */}
        {isOpen && (
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            ✖
          </button>
        )}

        <ul style={styles.menu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={index === 0 && isOpen ? { marginTop: '36px' } : {}}
            >
              <NavLink
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? 'nav-link-active' : '')}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.active : {}),
                })}
              >
                <span style={styles.icon}>{item.icon}</span>
                <span className="label" style={styles.label}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* CSS */}
      <style>{`
        .sidebar-toggle-btn {
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
          display: none;
        }

        @media (max-width: 700px) {
          .sidebar-toggle-btn {
            display: block;
          }

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

          .label {
            display: inline-block;
          }
        }

        .sidebar-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #333;
          z-index: 1002;
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 999;
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
    transition: 'transform 0.3s ease-in-out',
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
