import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { Users, BookOpen, FileText, BarChart3, Clock, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalQuestions: 0,
    totalQuizAttempts: 0,
    totalNotes: 0,
    avgScore: 0
  });
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/analytics');
      if (response.data.success) {
        setMetrics(response.data.metrics);
        setRecentAttempts(response.data.recentAttempts || []);
      }
    } catch (error) {
      console.error('Failed to load admin dashboard statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-start">
      <Header />

      {/* Intro banner */}
      <div className="glow-card p-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)' }}>
        <h3 className="fw-bold text-white font-heading mb-2">Welcome to Administrative Command Hub</h3>
        <p className="text-secondary mb-0">
          Manage system questions bank, notes repository, user accounts, and track overall platform metrics.
        </p>
      </div>

      {loading ? (
        <div className="glow-card p-5 text-center my-5">
          <div className="spinner-border text-purple mb-2" role="status"></div>
          <p className="small m-0">Compiling platform metrics...</p>
        </div>
      ) : (
        <div>
          {/* Metrics Rows */}
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-lg-3">
              <div className="glow-card p-3 d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-secondary d-block">Active Students</small>
                  <h3 className="fw-bold text-white m-0 font-heading mt-1">{metrics.totalStudents}</h3>
                </div>
                <span className="p-3 bg-purple bg-opacity-10 text-purple rounded-3"><Users size={20} /></span>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="glow-card p-3 d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-secondary d-block">MCQ Questions</small>
                  <h3 className="fw-bold text-white m-0 font-heading mt-1">{metrics.totalQuestions}</h3>
                </div>
                <span className="p-3 bg-info bg-opacity-10 text-info rounded-3"><BookOpen size={20} /></span>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="glow-card p-3 d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-secondary d-block">Completed Quizzes</small>
                  <h3 className="fw-bold text-white m-0 font-heading mt-1">{metrics.totalQuizAttempts}</h3>
                </div>
                <span className="p-3 bg-pink bg-opacity-10 text-pink rounded-3"><BarChart3 size={20} /></span>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="glow-card p-3 d-flex align-items-center justify-content-between">
                <div>
                  <small className="text-secondary d-block">Uploaded Notes</small>
                  <h3 className="fw-bold text-white m-0 font-heading mt-1">{metrics.totalNotes}</h3>
                </div>
                <span className="p-3 bg-warning bg-opacity-10 text-warning rounded-3"><FileText size={20} /></span>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* System Performance Status */}
            <div className="col-lg-5">
              <div className="glow-card p-4 h-100 text-center d-flex flex-column align-items-center justify-content-center">
                <span className="fs-1 mb-2 d-block">📈</span>
                <h4 className="text-white fw-bold font-heading mb-2">System Accuracy Level</h4>
                <p className="text-secondary small mb-4">Average score achieved by all student quiz attempts</p>
                <div className="d-inline-flex align-items-center justify-content-center p-4 rounded-circle bg-opacity-10 bg-purple mb-3" style={{ border: '3px solid var(--secondary-color)', width: '130px', height: '130px' }}>
                  <h2 className="fw-bold text-white m-0 font-heading" style={{ fontSize: '2.2rem' }}>{metrics.avgScore}%</h2>
                </div>
                <span className="text-success small fw-semibold">Healthy performance levels</span>
              </div>
            </div>

            {/* Recent attempts activity logs */}
            <div className="col-lg-7">
              <div className="glow-card p-4 h-100">
                <h5 className="text-white fw-bold font-heading mb-4">Recent Quiz Attempts</h5>
                
                {recentAttempts.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {recentAttempts.map((attempt) => (
                      <div 
                        key={attempt._id} 
                        className="d-flex align-items-center justify-content-between p-3 rounded-3"
                        style={{ background: 'rgba(0,0,0,0.1)' }}
                      >
                        <div className="text-start">
                          <span className="fw-semibold text-white d-block">{attempt.user?.name || 'Deleted student'}</span>
                          <small className="text-secondary small d-block">Subject: {attempt.category}</small>
                        </div>
                        <div className="text-end">
                          <span className={`badge px-2.5 py-1.5 ${attempt.percentage >= 60 ? 'bg-success' : 'bg-danger'}`}>
                            {attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)
                          </span>
                          <small className="text-secondary d-block mt-1" style={{ fontSize: '0.7rem' }}>
                            {new Date(attempt.attemptedAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5 text-secondary small">
                    No quiz logs found on database.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
