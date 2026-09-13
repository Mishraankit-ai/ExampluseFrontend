import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LogIn, KeyRound, Mail, Shield, GraduationCap } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await login(email, password, role);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="hero-gradient min-vh-100 d-flex flex-column">
      <Navbar />

      <div className="container py-5 my-auto d-flex align-items-center justify-content-center flex-grow-1">
        <div className="glow-card p-4 w-100 text-start" style={{ maxWidth: '440px' }}>
          
          {/* Logo / Badge */}
          <div className="text-center mb-4">
            <span className="p-3 bg-gradient rounded-3 d-inline-flex text-white mb-3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)' }}>
              <KeyRound size={28} />
            </span>
            <h3 className="fw-bold text-white font-heading m-0">Welcome Back</h3>
            <p className="text-secondary small">Access your smart study metrics dashboard</p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="d-flex p-1 rounded-3 bg-dark mb-4" style={{ background: 'rgba(0,0,0,0.2) !important' }}>
            <button 
              onClick={() => { setRole('student'); setErrorMsg(''); }}
              className={`btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 small border-0 fw-semibold text-white ${role === 'student' ? 'btn-primary-custom shadow-none' : 'opacity-50'}`}
              style={{ borderRadius: '6px' }}
            >
              <GraduationCap size={18} /> Student Login
            </button>
            <button 
              onClick={() => { setRole('admin'); setErrorMsg(''); }}
              className={`btn w-50 py-2 d-flex align-items-center justify-content-center gap-2 small border-0 fw-semibold text-white ${role === 'admin' ? 'btn-primary-custom shadow-none' : 'opacity-50'}`}
              style={{ borderRadius: '6px' }}
            >
              <Shield size={18} /> Admin Login
            </button>
          </div>

          {errorMsg && (
            <div className="alert alert-danger border-0 text-white p-2.5 mb-3 small d-flex align-items-center gap-2" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-secondary small d-flex align-items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input 
                type="email" 
                className="form-control bg-dark border-secondary text-white p-2.5" 
                style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                placeholder={role === 'admin' ? 'admin@exampulse.com' : 'student@exampulse.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small d-flex align-items-center gap-2">
                <KeyRound size={14} /> Password
              </label>
              <input 
                type="password" 
                className="form-control bg-dark border-secondary text-white p-2.5" 
                style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              <LogIn size={18} /> {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Registration link (Students only) */}
          {role === 'student' && (
            <div className="text-center mt-4 border-top pt-3" style={{ borderColor: 'var(--border-color) !important' }}>
              <p className="small text-secondary m-0">
                New to Exam Pulse? <Link to="/register" className="text-glow-cyan fw-semibold text-decoration-none">Create a Student Account</Link>
              </p>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
