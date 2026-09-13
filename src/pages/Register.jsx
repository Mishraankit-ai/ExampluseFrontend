import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserPlus, Mail, KeyRound, User, CircleCheck } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    const result = await register(name, email, password);
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
          
          {/* Header */}
          <div className="text-center mb-4">
            <span className="p-3 bg-gradient rounded-3 d-inline-flex text-white mb-3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)' }}>
              <UserPlus size={28} />
            </span>
            <h3 className="fw-bold text-white font-heading m-0">Student Registration</h3>
            <p className="text-secondary small">Sign up to access dashboards, quizzes, and focus timers</p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger border-0 text-white p-2.5 mb-3 small d-flex align-items-center gap-2" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-secondary small d-flex align-items-center gap-2">
                <User size={14} /> Full Name
              </label>
              <input 
                type="text" 
                className="form-control bg-dark border-secondary text-white p-2.5" 
                style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small d-flex align-items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input 
                type="email" 
                className="form-control bg-dark border-secondary text-white p-2.5" 
                style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                placeholder="student@exampulse.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small d-flex align-items-center gap-2">
                <KeyRound size={14} /> Password
              </label>
              <input 
                type="password" 
                className="form-control bg-dark border-secondary text-white p-2.5" 
                style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-secondary small d-flex align-items-center gap-2">
                <CircleCheck size={14} /> Confirm Password
              </label>
              <input 
                type="password" 
                className="form-control bg-dark border-secondary text-white p-2.5" 
                style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              <UserPlus size={18} /> {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Login link */}
          <div className="text-center mt-4 border-top pt-3" style={{ borderColor: 'var(--border-color) !important' }}>
            <p className="small text-secondary m-0">
              Already have an account? <Link to="/login" className="text-glow-cyan fw-semibold text-decoration-none">Sign In</Link>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
