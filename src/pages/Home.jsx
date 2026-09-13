import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, LineChart, CalendarDays, FileText, Timer, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="hero-gradient min-vh-100 d-flex flex-column">
      <Navbar />

      {/* Hero Section */}
      <section className="container py-5 my-md-5">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6 text-start fade-in-el">
            <span className="badge px-3 py-2 bg-gradient text-white mb-3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)', fontSize: '0.85rem' }}>
              🚀 Unleash the Power of AI Prep
            </span>
            <h1 className="display-4 fw-extrabold text-white mb-3 font-heading leading-tight" style={{ fontWeight: 800 }}>
              Smart Exam Preparation <br />
              <span className="gradient-text-purple-cyan text-glow-purple">Platform 2.0</span>
            </h1>
            <p className="lead text-secondary mb-4" style={{ fontSize: '1.15rem' }}>
              Master Java, DBMS, Computer Networks, and Aptitude with real-time analytics, daily study planning, Pomodoro focus timers, and intelligent AI-powered notes recommendation.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/login" className="btn btn-primary-custom px-4 py-3 d-flex align-items-center gap-2">
                Get Started Now <ArrowRight size={18} />
              </Link>
              <a href="#features" className="btn btn-secondary-custom px-4 py-3">
                Explore Features
              </a>
            </div>
          </div>
          
          <div className="col-lg-6 text-center float-el">
            {/* Interactive Mock Dashboard Illustration */}
            <div className="glow-card p-4 mx-auto" style={{ maxWidth: '520px', border: '1px solid rgba(139, 92, 246, 0.4)' }}>
              <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex gap-2">
                  <span className="p-1.5 rounded-circle bg-danger d-inline-block"></span>
                  <span className="p-1.5 rounded-circle bg-warning d-inline-block"></span>
                  <span className="p-1.5 rounded-circle bg-success d-inline-block"></span>
                </div>
                <div className="text-secondary small fw-bold font-heading">Exam Pulse Analytics</div>
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 rounded-3 text-start" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <small className="text-secondary d-block">Overall Progress</small>
                    <h3 className="fw-bold m-0 text-white mt-1">87%</h3>
                    <div className="progress mt-2" style={{ height: '6px', background: 'rgba(255,255,255,0.08)' }}>
                      <div className="progress-bar" style={{ width: '87%', background: 'linear-gradient(to right, #8B5CF6, #38BDF8)' }}></div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded-3 text-start" style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <small className="text-secondary d-block">Weekly Streak</small>
                    <h3 className="fw-bold m-0 text-white mt-1">🔥 6 Days</h3>
                    <small className="text-success small mt-1 d-block">Daily goal met!</small>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 rounded-3 text-start" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-white fw-bold">AI Recommended Note</span>
                      <span className="badge bg-purple px-2 py-1" style={{ fontSize: '0.65rem' }}>DBMS</span>
                    </div>
                    <p className="small text-secondary m-0">"SQL Normal Forms Complete Master Guide.pdf" is ready to download.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-5" style={{ background: 'rgba(9, 13, 26, 0.6)' }}>
        <div className="container text-center">
          <div className="row gy-4 justify-content-center">
            <div className="col-md-4">
              <h2 className="display-5 fw-bold text-glow-cyan text-white font-heading">500+</h2>
              <p className="text-secondary uppercase small tracking-wider m-0">Active Students</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-5 fw-bold text-glow-purple text-white font-heading">1000+</h2>
              <p className="text-secondary uppercase small tracking-wider m-0">Quizzes Handled</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-5 fw-bold text-glow-cyan text-white font-heading">95%</h2>
              <p className="text-secondary uppercase small tracking-wider m-0">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-5 my-md-5 text-center">
        <h2 className="display-6 fw-bold text-white mb-2 font-heading">Complete Study Toolkit</h2>
        <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: '600px' }}>
          Explore key components specifically integrated into Exam Pulse 2.0 to enhance retention and structured revision.
        </p>

        <div className="row g-4 text-start">
          {/* Quiz System */}
          <div className="col-md-4">
            <div className="glow-card p-4 h-100 d-flex flex-column">
              <div className="p-3 bg-purple rounded-3 d-inline-flex text-white mb-4" style={{ width: 'fit-content', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <BookOpen size={24} className="text-glow-purple" />
              </div>
              <h4 className="text-white fw-bold font-heading mb-2">Adaptive MCQ Quizzes</h4>
              <p className="text-secondary small mb-4">
                Test your knowledge across Java, DBMS, Computer Networks, and Aptitude with timers and instant detailed explanations.
              </p>
            </div>
          </div>

          {/* Analytics */}
          <div className="col-md-4">
            <div className="glow-card p-4 h-100 d-flex flex-column">
              <div className="p-3 bg-cyan rounded-3 d-inline-flex text-white mb-4" style={{ width: 'fit-content', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <LineChart size={24} className="text-glow-cyan" />
              </div>
              <h4 className="text-white fw-bold font-heading mb-2">Performance Analytics</h4>
              <p className="text-secondary small mb-4">
                Track score charts, identify weak subjects, and view detailed logs using responsive Chart.js visual graphics.
              </p>
            </div>
          </div>

          {/* Study Planner */}
          <div className="col-md-4">
            <div className="glow-card p-4 h-100 d-flex flex-column">
              <div className="p-3 bg-purple rounded-3 d-inline-flex text-white mb-4" style={{ width: 'fit-content', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <CalendarDays size={24} className="text-glow-purple" />
              </div>
              <h4 className="text-white fw-bold font-heading mb-2">Smart Daily Planner</h4>
              <p className="text-secondary small mb-4">
                Schedule study tasks with exact dates and deadlines. Check off tasks as you finish them to maintain momentum.
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="col-md-4 col-offset-md-2">
            <div className="glow-card p-4 h-100 d-flex flex-column">
              <div className="p-3 bg-cyan rounded-3 d-inline-flex text-white mb-4" style={{ width: 'fit-content', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <FileText size={24} className="text-glow-cyan" />
              </div>
              <h4 className="text-white fw-bold font-heading mb-2">Notes & Material Search</h4>
              <p className="text-secondary small mb-4">
                Instantly search and download PDFs uploaded directly by system administrators to reinforce weak subject areas.
              </p>
            </div>
          </div>

          {/* Focus Timer */}
          <div className="col-md-4">
            <div className="glow-card p-4 h-100 d-flex flex-column">
              <div className="p-3 bg-purple rounded-3 d-inline-flex text-white mb-4" style={{ width: 'fit-content', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <Timer size={24} className="text-glow-purple" />
              </div>
              <h4 className="text-white fw-bold font-heading mb-2">Pomodoro Focus Timer</h4>
              <p className="text-secondary small mb-4">
                Leverage the Pomodoro technique with a 25-minute focus clock and sound-effect alerts to manage study intervals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-5 my-md-5 text-center">
        <h2 className="display-6 fw-bold text-white mb-2 font-heading">What Students Say</h2>
        <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: '600px' }}>
          Real feedback from students who leveled up their study schedules with Exam Pulse.
        </p>
        
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="glow-card p-5 mx-auto" style={{ maxWidth: '650px' }}>
                <p className="lead text-white font-italic mb-4">
                  "The Pomodoro Focus Timer coupled with instant MCQ quiz logs completely transformed my DBMS preparation. The interface feels highly premium."
                </p>
                <h6 className="fw-bold text-white m-0">Aarav Mehta</h6>
                <small className="text-glow-cyan" style={{ fontSize: '0.8rem' }}>Computer Science Student</small>
              </div>
            </div>
            <div className="carousel-item">
              <div className="glow-card p-5 mx-auto" style={{ maxWidth: '650px' }}>
                <p className="lead text-white font-italic mb-4">
                  "The AI recommendations pointed me directly to notes I skipped in my classes. My quiz accuracy increased from 55% to 88% in Java!"
                </p>
                <h6 className="fw-bold text-white m-0">Priya Sharma</h6>
                <small className="text-glow-cyan" style={{ fontSize: '0.8rem' }}>Engineering Undergraduate</small>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
