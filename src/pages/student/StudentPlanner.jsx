import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { CalendarDays, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

const StudentPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/tasks');
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle || !dueDate || !dueTime) return;

    try {
      setSubmitting(true);
      const response = await axios.post('/api/tasks', {
        taskTitle,
        dueDate,
        dueTime
      });

      if (response.data.success) {
        setTasks([response.data.task, ...tasks].sort((a, b) => new Date(a.dueDate + 'T' + a.dueTime) - new Date(b.dueDate + 'T' + b.dueTime)));
        setTaskTitle('');
        setDueDate('');
        setDueTime('');
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Error creating task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`);
      if (response.data.success) {
        setTasks(prevTasks => 
          prevTasks.map(t => 
            t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      if (response.data.success) {
        setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Study Planner</h3>
        <p className="text-secondary mb-0">
          Structure your day. Schedule specific revision targets, notes reading, or mock tests, and check them off when completed.
        </p>
      </div>

      <div className="row g-4">
        {/* Scheduler Task Input Form */}
        <div className="col-lg-4">
          <div className="glow-card p-4">
            <h4 className="fw-bold text-white font-heading mb-3 d-flex align-items-center gap-2">
              <CalendarDays className="text-purple text-glow-purple" size={20} />
              <span>Create Task</span>
            </h4>

            <form onSubmit={handleAddTask}>
              <div className="mb-3">
                <label className="form-label text-secondary small">Task Description</label>
                <input 
                  type="text" 
                  className="form-control bg-dark border-secondary text-white p-2.5" 
                  placeholder="e.g. Read normal forms note"
                  style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Due Date</label>
                <input 
                  type="date" 
                  className="form-control bg-dark border-secondary text-white p-2.5" 
                  style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small">Due Time</label>
                <input 
                  type="time" 
                  className="form-control bg-dark border-secondary text-white p-2.5" 
                  style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                disabled={submitting}
              >
                <Plus size={18} /> {submitting ? 'Adding...' : 'Add Task'}
              </button>
            </form>
          </div>
        </div>

        {/* Task List directory */}
        <div className="col-lg-8">
          <div className="glow-card p-4 h-100">
            <h4 className="fw-bold text-white font-heading mb-4">Daily Schedule Checklist</h4>
            
            {loading ? (
              <div className="text-center py-5 text-secondary">
                <div className="spinner-border text-purple mb-2" role="status"></div>
                <p className="small m-0">Loading study schedule...</p>
              </div>
            ) : tasks.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <div 
                    key={task._id} 
                    className="p-3 rounded-3 d-flex align-items-center justify-content-between"
                    style={{ 
                      background: task.isCompleted ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid',
                      borderColor: task.isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 text-start">
                      {/* Checkbox trigger toggle */}
                      <button 
                        onClick={() => handleToggleTask(task._id)}
                        className="btn border-0 p-0 text-secondary"
                        title={task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 size={22} className="text-success" />
                        ) : (
                          <Circle size={22} className="text-secondary opacity-60" />
                        )}
                      </button>

                      <div>
                        <span 
                          className={`fw-semibold text-white d-block ${task.isCompleted ? 'text-decoration-line-through text-opacity-50' : ''}`}
                          style={{ fontSize: '0.95rem' }}
                        >
                          {task.taskTitle}
                        </span>
                        <small className="text-secondary small">
                          Due: {new Date(task.dueDate).toLocaleDateString()} at {task.dueTime}
                        </small>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn border-0 text-danger opacity-75 hover-opacity-100 p-2"
                      title="Remove Task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary text-center py-5 m-0 small">No tasks scheduled. Create one on the left to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPlanner;
