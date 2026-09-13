import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Cpu, Code, Database, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="hero-gradient min-vh-100 d-flex flex-column">
      <Navbar />

      <section className="container py-5 my-md-4 text-start flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <span className="badge px-3 py-2 bg-gradient text-white mb-3" style={{ background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)' }}>
              Project Overview
            </span>
            <h1 className="display-5 fw-extrabold text-white mb-4 font-heading">
              About Exam Pulse 2.0
            </h1>
            
            <div className="glow-card p-4 mb-4">
              <h4 className="text-white fw-bold font-heading mb-3 d-flex align-items-center gap-2">
                <ShieldCheck className="text-glow-cyan" /> Project Objectives
              </h4>
              <p className="text-secondary">
                Exam Pulse 2.0 is designed to bridge the gap between traditional learning and structured exam revision. By combining targeted MCQ testing with cognitive helper systems like the Pomodoro technique and active scheduling, the platform aims to provide a centralized hub for students to organize, track, and complete their preparations.
              </p>
              <p className="text-secondary m-0">
                The core target subjects include <strong>Java Programming</strong>, <strong>Database Management Systems (DBMS)</strong>, <strong>Computer Networks (CN)</strong>, and <strong>Quantitative Aptitude</strong>.
              </p>
            </div>

            <div className="glow-card p-4 mb-4">
              <h4 className="text-white fw-bold font-heading mb-3 d-flex align-items-center gap-2">
                <Cpu className="text-glow-purple" /> "AI Smart Pulse" Feature
              </h4>
              <p className="text-secondary m-0">
                Our lightweight heuristics model analyzes your recent quiz scores. If your accuracy falls in a specific category (e.g., Computer Networks), the system flags it as your "weak subject" and dynamically updates your study recommendation feeds to offer relevant lecture materials, notes, or specific tests to improve your retention.
              </p>
            </div>

            <h3 className="fw-bold text-white font-heading mt-5 mb-4">Technologies Used</h3>
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="glow-card p-3 text-center">
                  <div className="fs-1 mb-2 text-primary text-glow-cyan"><i className="fa-brands fa-react"></i></div>
                  <h6 className="text-white fw-bold">React & Vite</h6>
                  <small className="text-secondary">Responsive Frontend SPA</small>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="glow-card p-3 text-center">
                  <div className="fs-1 mb-2 text-success text-glow-purple"><i className="fa-brands fa-node-js"></i></div>
                  <h6 className="text-white fw-bold">Node & Express</h6>
                  <small className="text-secondary">REST API Services</small>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="glow-card p-3 text-center">
                  <div className="fs-1 mb-2 text-success text-glow-cyan"><i className="fa-solid fa-leaf"></i></div>
                  <h6 className="text-white fw-bold">MongoDB</h6>
                  <small className="text-secondary">Document Database</small>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="glow-card p-3 text-center">
                  <div className="fs-1 mb-2 text-warning text-glow-purple"><i className="fa-brands fa-bootstrap"></i></div>
                  <h6 className="text-white fw-bold">Bootstrap 5 & CSS</h6>
                  <small className="text-secondary">Layout & Fluid Styling</small>
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

export default About;
