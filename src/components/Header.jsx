import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon, Flame, Menu, Bell, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-transparent p-0 mb-4 dashboard-header">
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        
        {/* Mobile menu toggle */}
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn menu-toggle-btn border-0 text-white p-2"
            onClick={onMenuClick}
            style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h4 className="m-0 fw-bold font-heading">
              {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
            </h4>
            <small className="text-secondary">{todayStr}</small>
          </div>
        </div>

        {/* Right Section actions */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Study streak (students only) */}
          {user.role === 'student' && (
            <div 
              className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-pill text-white fw-bold shadow-sm"
              style={{ 
                background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                fontSize: '0.85rem'
              }}
              title="Maintain your daily preparation streak!"
            >
              <Flame size={16} className="text-white float-el" />
              <span>{user.streak || 0} Day Streak</span>
            </div>
          )}

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme} 
            className="btn border-0 text-white p-2 d-flex align-items-center justify-content-center"
            style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', width: '38px', height: '38px' }}
            title="Toggle theme mode"
          >
            {isDarkMode ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
          </button>

          {/* User profile identifier */}
          <div className="d-flex align-items-center gap-2 ps-3 border-start" style={{ borderColor: 'var(--border-color) !important' }}>
            <div 
              className="d-flex align-items-center justify-content-center bg-purple text-white font-heading fw-bold rounded-circle"
              style={{ 
                width: '38px', 
                height: '38px', 
                background: 'linear-gradient(135deg, #8B5CF6, #EC4899)'
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
            </div>
            <div className="d-none d-md-block text-start">
              <p className="m-0 fw-semibold text-truncate" style={{ maxWidth: '120px', fontSize: '0.9rem' }}>
                {user.name}
              </p>
              <small className="text-secondary text-capitalize" style={{ fontSize: '0.75rem' }}>
                {user.role}
              </small>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
