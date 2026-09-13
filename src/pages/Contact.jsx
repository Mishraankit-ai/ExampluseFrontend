import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate AJAX form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="hero-gradient min-vh-100 d-flex flex-column">
      <Navbar />

      <section className="container py-5 my-md-4 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <span className="badge px-3 py-2 bg-gradient text-white mb-3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)' }}>
                Get In Touch
              </span>
              <h1 className="display-6 fw-bold text-white font-heading">Contact Exam Pulse</h1>
              <p className="text-secondary">Have questions or want to provide suggestions? Send us a message.</p>
            </div>

            <div className="row g-4 align-items-stretch">
              {/* Form info column */}
              <div className="col-lg-5">
                <div className="glow-card p-4 h-100 d-flex flex-column justify-content-between text-start" style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  <div>
                    <h4 className="text-white fw-bold font-heading mb-4">Contact Information</h4>
                    <p className="text-secondary small mb-5">
                      Our administrative team is available to assist you with account verification, question adjustments, or database resets.
                    </p>

                    <div className="d-flex flex-column gap-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-3 bg-purple rounded-3 d-inline-flex text-white" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                          <Mail className="text-glow-purple" size={20} />
                        </div>
                        <div>
                          <small className="text-secondary d-block">Email Support</small>
                          <span className="text-white fw-semibold small">support@exampulse.com</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <div className="p-3 bg-cyan rounded-3 d-inline-flex text-white" style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                          <Phone className="text-glow-cyan" size={20} />
                        </div>
                        <div>
                          <small className="text-secondary d-block">Phone Support</small>
                          <span className="text-white fw-semibold small">+1 (555) 019-2834</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <div className="p-3 bg-purple rounded-3 d-inline-flex text-white" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                          <MapPin className="text-glow-purple" size={20} />
                        </div>
                        <div>
                          <small className="text-secondary d-block">Headquarters</small>
                          <span className="text-white fw-semibold small">Silicon Valley, CA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input column */}
              <div className="col-lg-7">
                <div className="glow-card p-4 text-start">
                  <h4 className="text-white fw-bold font-heading mb-4">Send a Message</h4>

                  {isSubmitted && (
                    <div className="alert alert-success border-0 text-white p-3 mb-4 d-flex align-items-center gap-2" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                      <i className="fa-solid fa-circle-check fs-5 text-success"></i>
                      <span>Thank you! Your message was submitted successfully. (Demo alert)</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Your Name</label>
                        <input 
                          type="text" 
                          className="form-control bg-dark border-secondary text-white p-2.5" 
                          style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Email Address</label>
                        <input 
                          type="email" 
                          className="form-control bg-dark border-secondary text-white p-2.5" 
                          style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label text-secondary small">Subject</label>
                        <input 
                          type="text" 
                          className="form-control bg-dark border-secondary text-white p-2.5" 
                          style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label text-secondary small">Message</label>
                        <textarea 
                          className="form-control bg-dark border-secondary text-white p-2.5" 
                          rows="4" 
                          style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2">
                          <Send size={18} /> Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
