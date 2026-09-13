import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5 mt-auto border-top" style={{ background: '#090D1A', borderColor: 'rgba(139, 92, 246, 0.15)' }}>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <h5 className="fw-bold text-white font-heading mb-3">
              EXAM <span style={{ color: '#38BDF8' }}>PULSE 2.0</span>
            </h5>
            <p className="text-secondary small">
              AI-Powered smart exam preparation system tailored to helping students master Java, DBMS, Computer Networks, and Aptitude.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-secondary hover-white"><i className="fa-brands fa-github fs-5"></i></a>
              <a href="#" className="text-secondary hover-white"><i className="fa-brands fa-linkedin fs-5"></i></a>
              <a href="#" className="text-secondary hover-white"><i className="fa-brands fa-twitter fs-5"></i></a>
            </div>
          </div>
          <div className="col-6 col-lg-2 offset-lg-2">
            <h6 className="text-white fw-bold font-heading mb-3">Navigation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-secondary text-decoration-none hover-white">Home</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none hover-white">About Project</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-white">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="text-white fw-bold font-heading mb-3">Subjects</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
              <li>Java Programming</li>
              <li>Database Management</li>
              <li>Computer Networks</li>
              <li>Quantitative Aptitude</li>
            </ul>
          </div>
          <div className="col-lg-2">
            <h6 className="text-white fw-bold font-heading mb-3">Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
              <li><i className="fa-solid fa-envelope me-2 text-glow-cyan"></i>support@exampulse.com</li>
              <li><i className="fa-solid fa-phone me-2 text-glow-cyan"></i>+1 (555) 019-2834</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-secondary small m-0">
            &copy; 2026 Exam Pulse 2.0. All rights reserved.
          </p>
          <p className="text-secondary small m-0 d-flex gap-3">
            <a href="#" className="text-secondary text-decoration-none">Privacy Policy</a>
            <a href="#" className="text-secondary text-decoration-none">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
