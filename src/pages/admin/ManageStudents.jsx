import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { Users, Trash2, Calendar } from 'lucide-react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/students');
      if (response.data.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error('Failed to load students list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('WARNING: Deleting this student account will permanently remove all their study checklists, logs, and quiz results. Do you want to proceed?')) return;

    try {
      const response = await axios.delete(`/api/admin/students/${studentId}`);
      if (response.data.success) {
        setStudents(prev => prev.filter(s => s._id !== studentId));
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student account. Try again.');
    }
  };

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Manage Students</h3>
        <p className="text-secondary mb-0">
          Search and administer registered student profiles. Suspend or remove active student directory entries.
        </p>
      </div>

      <div className="glow-card p-4">
        <h4 className="fw-bold text-white font-heading mb-4 d-flex align-items-center gap-2">
          <Users size={22} className="text-purple text-glow-purple" />
          <span>Registered Student Directory</span>
        </h4>

        {loading ? (
          <div className="text-center py-5 text-secondary">
            <div className="spinner-border text-purple mb-2" role="status"></div>
            <p className="small m-0">Retrieving users directory...</p>
          </div>
        ) : students.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle m-0" style={{ background: 'transparent' }}>
              <thead>
                <tr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered Date</th>
                  <th>Active Streak</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <td className="fw-semibold text-white">{student.name}</td>
                    <td className="text-secondary small">{student.email}</td>
                    <td className="text-secondary small">
                      <div className="d-flex align-items-center gap-1.5">
                        <Calendar size={14} className="opacity-60" />
                        <span>{new Date(student.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="text-white">🔥 {student.streak} Days</td>
                    <td className="text-end">
                      <button 
                        onClick={() => handleDeleteStudent(student._id)}
                        className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1.5 px-3 py-1.5"
                        style={{ borderRadius: '8px' }}
                      >
                        <Trash2 size={14} /> Remove Account
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-secondary text-center py-5 m-0 small">No registered students found on database.</p>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
