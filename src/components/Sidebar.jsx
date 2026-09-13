import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  FileText, 
  LineChart, 
  Timer, 
  Users, 
  Settings, 
  LogOut, 
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileSidebar = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  if (!user) return null;

  const isStudent = user.role === 'student';

  return (
    <aside className={`dashboard-sidebar ${isMobileOpen ? 'show' : ''}`}>
      {/* Brand Branding */}
      <div className="sidebar-brand d-flex align-items-center justify-content-between">
        <Link className="d-flex align-items-center gap-2 text-decoration-none" to="/" onClick={closeMobileSidebar}>
          <span className="p-2 bg-gradient rounded-3 d-inline-flex text-white" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)' }}>
            <GraduationCap size={20} />
          </span>
          <span className="fw-bold text-white font-heading">
            EXAM <span style={{ color: '#38BDF8' }}>PULSE</span>
          </span>
        </Link>
      </div>

      {/* Menu links list */}
      <ul className="sidebar-menu nav flex-column">
        {isStudent ? (
          <>
            <li className="sidebar-item">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/quizzes" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <BookOpen size={20} />
                <span>Quizzes</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/planner" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <CalendarDays size={20} />
                <span>Study Planner</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/notes" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <FileText size={20} />
                <span>Notes & PDFs</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <LineChart size={20} />
                <span>Performance</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/timer" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <Timer size={20} />
                <span>Focus Timer</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <NavLink 
                to="/admin" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
                end
              >
                <ShieldAlert size={20} />
                <span>Admin Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/admin/students" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <Users size={20} />
                <span>Manage Students</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/admin/quizzes" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <BookOpen size={20} />
                <span>Manage Quizzes</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink 
                to="/admin/notes" 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileSidebar}
              >
                <FileText size={20} />
                <span>Manage Notes</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Logout button at bottom */}
      <div className="p-3 border-top" style={{ borderColor: 'var(--border-color) !important' }}>
        <button 
          onClick={handleLogout}
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          style={{ borderRadius: '10px' }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
