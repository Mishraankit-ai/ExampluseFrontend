import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon, LogIn, LayoutDashboard, Menu } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="p-2 bg-gradient rounded-3 d-inline-flex text-white" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)' }}>
            <i className="fa-solid fa-square-poll-vertical fs-5"></i>
          </span>
          <span className="fw-bold tracking-tight text-white font-heading">
            EXAM <span style={{ color: '#38BDF8' }}>PULSE 2.0</span>
          </span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <Menu size={24} className="text-white" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link text-white opacity-${isActive ? '100 fw-semibold' : '75'}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link text-white opacity-${isActive ? '100 fw-semibold' : '75'}`} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link text-white opacity-${isActive ? '100 fw-semibold' : '75'}`} to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="btn border-0 text-white p-2 d-flex align-items-center justify-content-center"
              style={{ borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
            </button>

            {user ? (
              <button 
                onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}
                className="btn btn-primary-custom d-flex align-items-center gap-2"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary-custom d-flex align-items-center gap-2">
                <LogIn size={18} />
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
