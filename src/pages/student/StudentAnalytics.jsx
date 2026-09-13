import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { LineChart, Trophy, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StudentAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [dataSummary, setDataSummary] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    weakSubject: 'None',
    categoryPerformance: {}
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/analytics/student');
      if (response.data.success) {
        setDataSummary({
          totalQuizzes: response.data.totalAttempts,
          averageScore: response.data.averagePercentage,
          weakSubject: response.data.weakSubject,
          categoryPerformance: response.data.categoryPerformance || {}
        });
      }

      const historyResponse = await axios.get('/api/quizzes/results/history');
      if (historyResponse.data.success) {
        // Reverse array to show chronological order (oldest to newest) in the graph
        setHistory([...historyResponse.data.results].reverse());
      }
    } catch (error) {
      console.error('Failed to load student performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Line Chart Config (Scores over time)
  const lineChartData = {
    labels: history.map((item, idx) => `Quiz #${idx + 1}`),
    datasets: [
      {
        label: 'Accuracy (%)',
        data: history.map(item => item.percentage),
        borderColor: '#38BDF8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#8B5CF6',
        pointBorderColor: '#fff',
        pointRadius: 5
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const attempt = history[context.dataIndex];
            return `Score: ${attempt.percentage}% (${attempt.category})`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8' }
      }
    }
  };

  // Bar Chart Config (Subject Comparison)
  const categories = ['Java', 'DBMS', 'CN', 'Aptitude'];
  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Subject Average (%)',
        data: categories.map(cat => dataSummary.categoryPerformance[cat] || 0),
        backgroundColor: [
          'rgba(139, 92, 246, 0.6)', // Java
          'rgba(56, 189, 248, 0.6)', // DBMS
          'rgba(236, 72, 153, 0.6)', // CN
          'rgba(245, 158, 11, 0.6)'  // Aptitude
        ],
        borderColor: [
          '#8B5CF6',
          '#38BDF8',
          '#EC4899',
          '#F59E0B'
        ],
        borderWidth: 1,
        borderRadius: 8
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8' }
      }
    }
  };

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Performance Analytics</h3>
        <p className="text-secondary mb-0">
          Visualize your exam readiness metrics. Track your practice scores over time and study your subject accuracy graphs.
        </p>
      </div>

      {loading ? (
        <div className="glow-card p-5 text-center my-5">
          <div className="spinner-border text-purple mb-3" role="status"></div>
          <h5 className="text-white">Calculating performance logs...</h5>
        </div>
      ) : dataSummary.totalQuizzes === 0 ? (
        <div className="glow-card p-5 text-center my-5">
          <AlertCircle size={48} className="text-warning mb-3 float-el" />
          <h4 className="text-white fw-bold font-heading">No Analytics Logs Found</h4>
          <p className="text-secondary small mb-4">You must attempt at least one practice quiz to generate graphs.</p>
          <a href="/quizzes" className="btn btn-primary-custom">Go to Quizzes</a>
        </div>
      ) : (
        <div>
          {/* Performance summary row */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="glow-card p-3 d-flex align-items-center gap-3">
                <div className="p-3 bg-purple bg-opacity-10 text-purple rounded-3">
                  <Trophy size={24} />
                </div>
                <div>
                  <small className="text-secondary d-block">Overall Level</small>
                  <span className="fw-bold text-white fs-5 font-heading">
                    {dataSummary.averageScore >= 80 ? 'Expert 🌟' : dataSummary.averageScore >= 60 ? 'Competent 👍' : 'Novice 📚'}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glow-card p-3 d-flex align-items-center gap-3">
                <div className="p-3 bg-info bg-opacity-10 text-info rounded-3">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <small className="text-secondary d-block">Accuracy average</small>
                  <span className="fw-bold text-white fs-5 font-heading">{dataSummary.averageScore}%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glow-card p-3 d-flex align-items-center gap-3" style={{ borderLeft: '3px solid #EF4444' }}>
                <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-3">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <small className="text-secondary d-block">Weak Subject</small>
                  <span className="fw-bold text-danger fs-5 font-heading">{dataSummary.weakSubject}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Graphs Grid */}
          <div className="row g-4 mb-4">
            {/* Line Graph */}
            <div className="col-lg-6">
              <div className="glow-card p-4" style={{ height: '350px' }}>
                <h5 className="text-white fw-bold font-heading mb-3 d-flex align-items-center gap-2">
                  <LineChart size={18} className="text-cyan" /> Progress Tracking (Scores Over Time)
                </h5>
                <div className="w-100 h-75 position-relative mt-2">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </div>
            </div>

            {/* Bar Graph */}
            <div className="col-lg-6">
              <div className="glow-card p-4" style={{ height: '350px' }}>
                <h5 className="text-white fw-bold font-heading mb-3 d-flex align-items-center gap-2">
                  <Trophy size={18} className="text-purple" /> Subject-wise Accuracy Comparison
                </h5>
                <div className="w-100 h-75 position-relative mt-2">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Performance breakdown logs */}
          <div className="glow-card p-4">
            <h5 className="text-white fw-bold font-heading mb-4">Detailed Performance Log</h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle m-0" style={{ background: 'transparent' }}>
                <thead>
                  <tr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                    <th>Quiz Attempt</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...history].reverse().map((attempt, idx) => (
                    <tr key={attempt._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <td className="text-secondary small">Attempt #{history.length - idx}</td>
                      <td className="fw-semibold text-white">{attempt.category}</td>
                      <td className="text-white">{attempt.score}/{attempt.totalQuestions}</td>
                      <td>
                        <span className={`fw-bold ${attempt.percentage >= 60 ? 'text-success' : 'text-danger'}`}>
                          {attempt.percentage}%
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${attempt.percentage >= 60 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                          {attempt.percentage >= 60 ? 'Passed' : 'Needs Review'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default StudentAnalytics;
