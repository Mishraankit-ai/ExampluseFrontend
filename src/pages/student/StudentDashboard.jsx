import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Header from '../../components/Header';
import { 
  BookOpen, 
  Flame, 
  LineChart, 
  CheckSquare, 
  Brain, 
  ArrowRight,
  Clock, 
  Download
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    tasksCount: 0,
    streak: user?.streak || 0
  });
  const [aiRecs, setAiRecs] = useState([]);
  const [recentAttempts, setRecentAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Get analytics & AI recs
        const analyticsRes = await axios.get('/api/analytics/student');
        if (analyticsRes.data.success) {
          setAiRecs(analyticsRes.data.recommendations || []);
          setStats(prev => ({
            ...prev,
            totalQuizzes: analyticsRes.data.totalAttempts || 0,
            averageScore: analyticsRes.data.averagePercentage || 0
          }));
        }

        // Get recent tasks count
        const tasksRes = await axios.get('/api/tasks');
        if (tasksRes.data.success) {
          const incompleteTasks = tasksRes.data.tasks.filter(t => !t.isCompleted).length;
          setStats(prev => ({
            ...prev,
            tasksCount: incompleteTasks
          }));
        }

        // Get recent quiz attempts history
        const attemptsRes = await axios.get('/api/quizzes/results/history');
        if (attemptsRes.data.success) {
          setRecentAttempts(attemptsRes.data.results.slice(0, 3) || []);
        }
      } catch (error) {
        console.error('Error fetching student dashboard details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <div className="text-start">
      <Header />

      {/* Welcome Card */}
      <div className="glow-card p-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%)' }}>
        <h2 className="fw-bold text-white mb-2 font-heading">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-secondary mb-0">
          Ready for another productive prep session? The system recommends reviewing your weak subject concepts today.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-4">
        {/* Streak card */}
        <div className="col-sm-6 col-lg-3">
          <div className="glow-card p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Study Streak</span>
              <span className="p-2 bg-warning bg-opacity-10 text-warning rounded-3">
                <Flame size={20} />
              </span>
            </div>
            <h3 className="fw-bold text-white m-0 font-heading">{stats.streak} Days</h3>
            <small className="text-success text-xs mt-1 d-block">🔥 Keep it up!</small>
          </div>
        </div>

        {/* Quizzes Attempted card */}
        <div className="col-sm-6 col-lg-3">
          <div className="glow-card p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Quizzes Completed</span>
              <span className="p-2 bg-purple bg-opacity-10 text-purple rounded-3">
                <BookOpen size={20} />
              </span>
            </div>
            <h3 className="fw-bold text-white m-0 font-heading">{stats.totalQuizzes}</h3>
            <small className="text-secondary text-xs mt-1 d-block">Java, DBMS, CN & Aptitude</small>
          </div>
        </div>

        {/* Average Score card */}
        <div className="col-sm-6 col-lg-3">
          <div className="glow-card p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Average Score</span>
              <span className="p-2 bg-info bg-opacity-10 text-info rounded-3">
                <LineChart size={20} />
              </span>
            </div>
            <h3 className="fw-bold text-white m-0 font-heading">{stats.averageScore}%</h3>
            <small className="text-secondary text-xs mt-1 d-block">Overall accuracy percentage</small>
          </div>
        </div>

        {/* Tasks Pending card */}
        <div className="col-sm-6 col-lg-3">
          <div className="glow-card p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Planned Tasks</span>
              <span className="p-2 bg-pink bg-opacity-10 text-pink rounded-3">
                <CheckSquare size={20} />
              </span>
            </div>
            <h3 className="fw-bold text-white m-0 font-heading">{stats.tasksCount} Pending</h3>
            <small className="text-secondary text-xs mt-1 d-block">Schedule in Study Planner</small>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* AI Recommendations */}
        <div className="col-lg-7">
          <div className="glow-card p-4 h-100 d-flex flex-column">
            <h4 className="text-white fw-bold font-heading mb-3 d-flex align-items-center gap-2">
              <Brain className="text-glow-purple text-purple" size={24} /> 
              <span>AI Pulse Recommendations</span>
            </h4>
            <hr className="my-2 border-secondary" style={{ opacity: 0.15 }} />
            
            {loading ? (
              <div className="my-auto py-5 text-center text-secondary">
                <div className="spinner-border text-purple mb-2" role="status"></div>
                <p className="small m-0">Analyzing recent quiz scores...</p>
              </div>
            ) : aiRecs.length > 0 ? (
              <div className="flex-grow-1 d-flex flex-column gap-3 mt-2">
                {aiRecs.map((rec, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-3 d-flex align-items-start gap-3"
                    style={{ background: 'rgba(255, 255, 255, 0.02)', borderLeft: '3px solid var(--secondary-color)' }}
                  >
                    <div className="small text-white opacity-85 flex-grow-1" dangerouslySetInnerHTML={{ __html: rec }}></div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary my-auto py-4 text-center">No recommendations available yet. Try a quiz!</p>
            )}
          </div>
        </div>

        {/* Quick Shortcuts & Recent Activity */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-4 h-100">
            {/* Quick Actions */}
            <div className="glow-card p-4">
              <h5 className="text-white fw-bold font-heading mb-3">Quick Study Shortcuts</h5>
              <div className="d-grid gap-2">
                <Link to="/quizzes" className="btn btn-primary-custom py-2.5 d-flex align-items-center justify-content-center gap-2">
                  <BookOpen size={18} />
                  Attempt a Practice Quiz
                </Link>
                <Link to="/timer" className="btn btn-secondary-custom py-2.5 d-flex align-items-center justify-content-center gap-2">
                  <Clock size={18} />
                  Launch Focus Pomodoro
                </Link>
              </div>
            </div>

            {/* Recent Quizzes */}
            <div className="glow-card p-4 flex-grow-1">
              <h5 className="text-white fw-bold font-heading mb-3">Recent Activity</h5>
              {recentAttempts.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {recentAttempts.map((attempt) => (
                    <div 
                      key={attempt._id} 
                      className="d-flex align-items-center justify-content-between p-2 rounded-3"
                      style={{ background: 'rgba(0,0,0,0.1)' }}
                    >
                      <div>
                        <span className="fw-semibold text-white d-block">{attempt.category}</span>
                        <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          {new Date(attempt.attemptedAt).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="text-end">
                        <span className={`badge px-2.5 py-1.5 ${attempt.percentage >= 60 ? 'bg-success' : 'bg-danger'}`} style={{ fontSize: '0.8rem' }}>
                          {attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-secondary small">
                  No quiz logs found. Try attempting your first quiz!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
