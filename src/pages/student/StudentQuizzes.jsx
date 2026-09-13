import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { BookOpen, AlertTriangle, ArrowRight, CheckCircle2, XCircle, Timer, RotateCcw } from 'lucide-react';

const StudentQuizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizState, setQuizState] = useState('select'); // 'select', 'loading', 'playing', 'result'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // { questionIndex: optionIndex }
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [score, setScore] = useState(0);
  const [resultHistory, setResultHistory] = useState([]);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  // Load result history
  useEffect(() => {
    if (quizState === 'select') {
      fetchHistory();
    }
  }, [quizState]);

  // Handle active countdown timer during playing
  useEffect(() => {
    if (quizState !== 'playing') return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, quizState]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/quizzes/results/history');
      if (response.data.success) {
        setResultHistory(response.data.results);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const startQuiz = async (category) => {
    setSelectedCategory(category);
    setQuizState('loading');
    
    try {
      const response = await axios.get(`/api/quizzes/questions/${category}`);
      if (response.data.success && response.data.questions.length > 0) {
        setQuestions(response.data.questions);
        setCurrentIndex(0);
        setSelectedOptions({});
        setScore(0);
        setQuizState('playing');
        setTimeLeft(30); // 30 seconds for first question
      } else {
        alert('No questions found for this category.');
        setQuizState('select');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to load quiz questions. Try again later.');
      setQuizState('select');
    }
  };

  const handleOptionSelect = (optionIndex) => {
    if (selectedOptions[currentIndex] !== undefined) return; // Prevent changing answer once selected
    setSelectedOptions({
      ...selectedOptions,
      [currentIndex]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    // Check if correct option is selected before moving
    const isCorrect = selectedOptions[currentIndex] === questions[currentIndex].correctOption;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(30); // reset timer for next question
    } else {
      // Last question completed, submit quiz
      submitQuizResults();
    }
  };

  const submitQuizResults = async () => {
    setSubmittingQuiz(true);
    
    // Calculate final score since state update might be async
    let finalScore = score;
    const isLastCorrect = selectedOptions[questions.length - 1] === questions[questions.length - 1].correctOption;
    if (isLastCorrect) {
      finalScore += 1;
    }

    try {
      await axios.post('/api/quizzes/results', {
        category: selectedCategory,
        score: finalScore,
        totalQuestions: questions.length
      });
      setScore(finalScore);
      setQuizState('result');
    } catch (error) {
      console.error('Failed to save quiz results:', error);
      alert('Failed to save score, showing results locally.');
      setScore(finalScore);
      setQuizState('result');
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOptions({});
    setScore(0);
    setQuizState('select');
  };

  return (
    <div className="text-start">
      <Header />

      {/* SELECT STATE */}
      {quizState === 'select' && (
        <div>
          <div className="glow-card p-4 mb-4">
            <h3 className="fw-bold text-white font-heading mb-2">Practice Quizzes</h3>
            <p className="text-secondary mb-0">
              Practice makes perfect. Choose a subject below to attempt a random 10-question MCQ practice test. 30 seconds limit per question.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="row g-4 mb-5">
            {['Java', 'DBMS', 'CN', 'Aptitude'].map((cat, i) => (
              <div key={cat} className="col-md-6 col-lg-3">
                <div className="glow-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <span className="p-2.5 bg-purple bg-opacity-10 text-purple rounded-3 d-inline-flex mb-3">
                      <BookOpen size={24} />
                    </span>
                    <h4 className="fw-bold text-white font-heading mb-2">{cat}</h4>
                    <p className="text-secondary small mb-4">
                      {cat === 'Java' && 'Oops, Inheritance, and Core programming structures.'}
                      {cat === 'DBMS' && 'Normalizations, SQL queries, Indexing, and ACID properties.'}
                      {cat === 'CN' && 'OSI models, Network layers, Routing, and Transport protocols.'}
                      {cat === 'Aptitude' && 'Time, Work, Speed, Probabilities, and Logic math reasoning.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => startQuiz(cat)} 
                    className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    Start Quiz <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Score History */}
          <div className="glow-card p-4">
            <h4 className="fw-bold text-white font-heading mb-4">Attempt History</h4>
            {resultHistory.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle m-0" style={{ background: 'transparent' }}>
                  <thead>
                    <tr style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
                      <th>Category</th>
                      <th>Attempt Date</th>
                      <th>Score</th>
                      <th>Percentage</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultHistory.map((row) => (
                      <tr key={row._id} style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <td className="fw-semibold text-white">{row.category}</td>
                        <td className="text-secondary small">{new Date(row.attemptedAt).toLocaleString()}</td>
                        <td className="text-white">{row.score}/{row.totalQuestions}</td>
                        <td>
                          <span className={`fw-bold ${row.percentage >= 60 ? 'text-success' : 'text-danger'}`}>
                            {row.percentage}%
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${row.percentage >= 60 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                            {row.percentage >= 60 ? 'Passed' : 'Needs Review'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-secondary text-center py-3 m-0 small">No previous attempts found. Start a quiz to log scores.</p>
            )}
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {quizState === 'loading' && (
        <div className="glow-card p-5 text-center my-5">
          <div className="spinner-border text-purple mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <h4 className="text-white fw-bold font-heading">Generating Quiz...</h4>
          <p className="text-secondary small m-0">Retrieving questions from the {selectedCategory} question bank.</p>
        </div>
      )}

      {/* PLAYING STATE */}
      {quizState === 'playing' && questions.length > 0 && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glow-card p-4">
              
              {/* Header metrics */}
              <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div>
                  <span className="badge bg-purple px-3 py-1.5 fw-semibold text-uppercase" style={{ fontSize: '0.8rem' }}>
                    {selectedCategory}
                  </span>
                  <span className="text-secondary small ms-3">Question {currentIndex + 1} of {questions.length}</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-warning fw-bold fs-5">
                  <Timer size={20} className={timeLeft <= 10 ? 'text-danger float-el' : ''} />
                  <span className={timeLeft <= 10 ? 'text-danger' : ''}>{timeLeft}s</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress mb-4" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                <div 
                  className="progress-bar bg-purple" 
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, background: 'linear-gradient(to right, #8B5CF6, #38BDF8)' }}
                ></div>
              </div>

              {/* Question Text */}
              <h4 className="text-white fw-bold font-heading mb-4 leading-normal">
                {questions[currentIndex].questionText}
              </h4>

              {/* Options */}
              <div className="d-flex flex-column gap-2 mb-4">
                {questions[currentIndex].options.map((option, idx) => {
                  const isSelected = selectedOptions[currentIndex] === idx;
                  let optionClass = 'quiz-option-card';
                  if (isSelected) optionClass += ' selected';

                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleOptionSelect(idx)}
                      className={optionClass}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="text-white">{option}</span>
                        {isSelected && <span className="p-1 rounded-circle bg-purple bg-opacity-20 d-inline-flex"><CheckCircle2 size={16} className="text-purple" /></span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="text-end">
                <button 
                  onClick={handleNextQuestion}
                  className="btn btn-primary-custom px-4 py-2.5 d-flex align-items-center gap-2 ms-auto"
                  disabled={selectedOptions[currentIndex] === undefined && timeLeft > 0}
                >
                  {currentIndex < questions.length - 1 ? 'Next Question' : submittingQuiz ? 'Submitting...' : 'Submit Answers'}
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* RESULT STATE */}
      {quizState === 'result' && (
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {/* Score Card */}
            <div className="glow-card p-4 text-center mb-4">
              <span className="fs-1 mb-2 d-block">
                {Math.round((score / questions.length) * 100) >= 60 ? '🎉' : '📚'}
              </span>
              <h2 className="fw-bold text-white font-heading mb-2">Quiz Completed!</h2>
              <p className="text-secondary">Here is your performance breakdown for {selectedCategory}.</p>

              <div className="d-inline-flex align-items-center justify-content-center p-4 rounded-circle my-3 bg-opacity-10 bg-purple" style={{ border: '3px solid var(--secondary-color)', width: '130px', height: '130px' }}>
                <div>
                  <h2 className="fw-bold text-white m-0 font-heading" style={{ fontSize: '2.5rem' }}>{score}</h2>
                  <small className="text-secondary small">/ {questions.length}</small>
                </div>
              </div>

              <h4 className="fw-bold font-heading mb-4" style={{ color: Math.round((score / questions.length) * 100) >= 60 ? '#10B981' : '#EF4444' }}>
                {Math.round((score / questions.length) * 100)}% - {Math.round((score / questions.length) * 100) >= 60 ? 'Passed!' : 'Needs Revision'}
              </h4>

              <div className="d-flex justify-content-center gap-3">
                <button onClick={resetQuiz} className="btn btn-primary-custom d-flex align-items-center gap-2">
                  <RotateCcw size={16} /> Another Practice
                </button>
              </div>
            </div>

            {/* Answer Key Review */}
            <h4 className="fw-bold text-white font-heading mb-3">Review Answer Explanations</h4>
            <div className="d-flex flex-column gap-3 mb-5">
              {questions.map((question, i) => {
                const userSelected = selectedOptions[i];
                const correct = question.correctOption;
                const isCorrect = userSelected === correct;

                return (
                  <div key={question._id} className="glow-card p-4 text-start">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="badge bg-secondary px-2.5 py-1 text-white">Q{i + 1}</span>
                      {isCorrect ? (
                        <span className="text-success small d-flex align-items-center gap-1.5"><CheckCircle2 size={16} /> Correct</span>
                      ) : (
                        <span className="text-danger small d-flex align-items-center gap-1.5"><XCircle size={16} /> Incorrect</span>
                      )}
                    </div>

                    <h5 className="text-white fw-bold font-heading mb-3">{question.questionText}</h5>

                    {/* Show option breakdown */}
                    <div className="d-flex flex-column gap-2 mb-3">
                      {question.options.map((option, idx) => {
                        let optClass = 'p-2.5 rounded-3 d-flex align-items-center justify-content-between small ';
                        if (idx === correct) {
                          optClass += 'bg-success bg-opacity-10 text-success border border-success';
                        } else if (idx === userSelected && !isCorrect) {
                          optClass += 'bg-danger bg-opacity-10 text-danger border border-danger';
                        } else {
                          optClass += 'text-secondary';
                        }

                        return (
                          <div key={idx} className={optClass} style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span>{option}</span>
                            {idx === correct && <span className="small text-success">Correct Answer</span>}
                            {idx === userSelected && !isCorrect && <span className="small text-danger">Your Selection</span>}
                          </div>
                        );
                      })}
                    </div>

                    {question.explanation && (
                      <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid #38BDF8' }}>
                        <span className="text-glow-cyan small fw-bold d-block mb-1">Explanation:</span>
                        <p className="text-secondary small m-0">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentQuizzes;
