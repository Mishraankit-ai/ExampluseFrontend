import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Sidebar from './components/Sidebar';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentQuizzes from './pages/student/StudentQuizzes';
import StudentPlanner from './pages/student/StudentPlanner';
import StudentNotes from './pages/student/StudentNotes';
import StudentAnalytics from './pages/student/StudentAnalytics';
import StudentTimer from './pages/student/StudentTimer';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageQuizzes from './pages/admin/ManageQuizzes';
import ManageNotes from './pages/admin/ManageNotes';

// Protected Route Wrapper for Students
const ProtectedRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="spinner-border text-purple" role="status"></div>
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Admin Route Wrapper
const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="spinner-border text-purple" role="status"></div>
      </div>
    );
  }

  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

// Dashboard Layout wrapper containing Sidebar and Header
const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main dashboard content container */}
      <main className="dashboard-content">
        <div className="container-fluid p-0">
          {/* Outlet renders matched sub-routes */}
          <Outlet context={{ toggleMobileSidebar }} />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Visitor Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Student Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/quizzes" element={<StudentQuizzes />} />
                <Route path="/planner" element={<StudentPlanner />} />
                <Route path="/notes" element={<StudentNotes />} />
                <Route path="/analytics" element={<StudentAnalytics />} />
                <Route path="/timer" element={<StudentTimer />} />
              </Route>
            </Route>

            {/* Protected Admin Command Panel Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<ManageStudents />} />
                  <Route path="/admin/quizzes" element={<ManageQuizzes />} />
                  <Route path="/admin/notes" element={<ManageNotes />} />
                </Route>
              </Route>
            </Route>

            {/* Fallback Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
