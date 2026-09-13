import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { BookOpen, Plus, Trash2, HelpCircle } from 'lucide-react';

const ManageQuizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('Java');
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [category, setCategory] = useState('Java');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState(0); // index 0-3
  const [explanation, setExplanation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/questions');
      if (response.data.success) {
        setQuestions(response.data.questions);
      }
    } catch (error) {
      console.error('Failed to fetch questions bank:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!questionText || !optionA || !optionB || !optionC || !optionD) {
      alert('Please fill out the question and all four options.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post('/api/admin/questions', {
        category,
        questionText,
        options: [optionA, optionB, optionC, optionD],
        correctOption: parseInt(correctOption, 10),
        explanation
      });

      if (response.data.success) {
        setQuestions([response.data.question, ...questions]);
        setQuestionText('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrectOption(0);
        setExplanation('');
        alert('Question added successfully!');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Delete this question from repository?')) return;

    try {
      const response = await axios.delete(`/api/admin/questions/${questionId}`);
      if (response.data.success) {
        setQuestions(prev => prev.filter(q => q._id !== questionId));
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to remove question.');
    }
  };

  const filteredQuestions = questions.filter(q => q.category === categoryFilter);

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Manage Quiz Question Repository</h3>
        <p className="text-secondary mb-0">
          Extend the practice question banks. Create, update, or remove multiple choice questions for Java, DBMS, CN, and Aptitude.
        </p>
      </div>

      <div className="row g-4">
        {/* Form to Create/Add Question */}
        <div className="col-lg-5">
          <div className="glow-card p-4">
            <h4 className="fw-bold text-white font-heading mb-3 d-flex align-items-center gap-2">
              <Plus className="text-purple" />
              <span>Create MCQ Question</span>
            </h4>

            <form onSubmit={handleAddQuestion}>
              <div className="mb-3">
                <label className="form-label text-secondary small">Category Subject</label>
                <select 
                  className="form-select bg-dark border-secondary text-white p-2.5" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  <option value="Java">Java</option>
                  <option value="DBMS">DBMS</option>
                  <option value="CN">CN</option>
                  <option value="Aptitude">Aptitude</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Question Content</label>
                <textarea 
                  className="form-control bg-dark border-secondary text-white p-2.5" 
                  rows="3"
                  placeholder="Type question detail here..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                ></textarea>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label text-secondary small">Option A</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary text-white p-2.5" 
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    required
                    style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-secondary small">Option B</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary text-white p-2.5" 
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    required
                    style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-secondary small">Option C</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary text-white p-2.5" 
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    required
                    style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label text-secondary small">Option D</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary text-white p-2.5" 
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    required
                    style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small">Correct Answer Option</label>
                <select 
                  className="form-select bg-dark border-secondary text-white p-2.5"
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value)}
                  style={{ borderRadius: '8px' }}
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small">Concept Explanation</label>
                <textarea 
                  className="form-control bg-dark border-secondary text-white p-2.5" 
                  rows="2"
                  placeholder="Explain why the option is correct..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  style={{ borderRadius: '8px', background: 'rgba(0,0,0,0.2) !important' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary-custom w-100 py-2.5"
                disabled={submitting}
              >
                {submitting ? 'Creating...' : 'Create Question'}
              </button>
            </form>
          </div>
        </div>

        {/* List of existing questions under subject */}
        <div className="col-lg-7">
          <div className="glow-card p-4 h-100 d-flex flex-column">
            
            {/* Header Filter selection */}
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <h5 className="text-white fw-bold font-heading m-0">Questions Catalog</h5>
              <div>
                <select 
                  className="form-select bg-dark border-secondary text-white py-1.5 px-3" 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ borderRadius: '6px', fontSize: '0.85rem' }}
                >
                  <option value="Java">Java Bank</option>
                  <option value="DBMS">DBMS Bank</option>
                  <option value="CN">CN Bank</option>
                  <option value="Aptitude">Aptitude Bank</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5 text-secondary my-auto">
                <div className="spinner-border text-purple mb-2" role="status"></div>
                <p className="small m-0">Loading question list...</p>
              </div>
            ) : filteredQuestions.length > 0 ? (
              <div className="d-flex flex-column gap-3 overflow-y-auto flex-grow-1" style={{ maxHeight: '600px' }}>
                {filteredQuestions.map((q, idx) => (
                  <div 
                    key={q._id} 
                    className="p-3 rounded-3 text-start"
                    style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-2.5 mb-2.5">
                      <span className="fw-semibold text-white d-block" style={{ fontSize: '0.95rem' }}>
                        {idx + 1}. {q.questionText}
                      </span>
                      <button 
                        onClick={() => handleDeleteQuestion(q._id)}
                        className="btn border-0 text-danger opacity-75 hover-opacity-100 p-1"
                        title="Remove Question"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="row g-2 mb-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="col-6">
                          <small className={`d-block p-1.5 px-2 rounded-2 ${oIdx === q.correctOption ? 'bg-success bg-opacity-10 text-success border border-success' : 'text-secondary bg-dark bg-opacity-20 border border-secondary border-opacity-10'}`} style={{ fontSize: '0.75rem' }}>
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </small>
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <div className="mt-2.5 p-2 bg-dark bg-opacity-35 rounded-2" style={{ borderLeft: '3px solid #38BDF8' }}>
                        <small className="text-secondary text-xs d-block" style={{ fontSize: '0.75rem' }}>{q.explanation}</small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary text-center py-5 my-auto small">No questions registered under {categoryFilter} yet.</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuizzes;
