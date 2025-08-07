import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo (1).png';
import logosm from '../assets/logosm.png';
import './Navbar.css';

const Navbar = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // 👈 Ref to detect outside click
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/users/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const users = await response.json();
          setMemberCount(users.length || 0);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="left">
        <div className="logo">
          <img className="logoIcon" src={logo} alt="Logo" />
          <img className="logosm" src={logosm} alt="Logo" />
        </div>

        <div className="navItem">
          <span className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11Z" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 19V17C2 15.3431 3.34315 14 5 14H11C12.6569 14 14 15.3431 14 17V19" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 14H19C20.6569 14 22 15.3431 22 17V19" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>Teams</span>
        </div>

        <div className="navItem">
          <span className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 20V18C4 15.7909 5.79086 14 8 14H16C18.2091 14 20 15.7909 20 18V20" stroke="#0047FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>Users</span>
        </div>

        <div className="org-block">
          <div className="orgTitle"><strong>Organization Name</strong></div>
          <div className="orgMembers">
            Members: <span className="highlight">{memberCount}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right">
        <div className="avatar">N</div>
        <div className="nameBlock" ref={dropdownRef}>
          <div>Name</div>
          <div>Surname</div>

          <div style={{ position: 'relative' }}>
            <div
              className="roleBadge"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: 'pointer' }}
            >
              SuperAdmin
              <span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'rotate(180deg)' }}
                >
                  <path
                    d="M6 15L12 9L18 15"
                    stroke="#f9f9f9ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 999,
                  width: '100px',
                  fontSize: '14px',
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#000',
                  }}
                >
                  Logout
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 17L21 12L16 7" stroke="#000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 12H9" stroke="#000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H12"
                      stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
