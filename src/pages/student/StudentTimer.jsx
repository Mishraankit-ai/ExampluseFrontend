import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import { Timer, Play, Pause, RotateCcw, AlertTriangle, Coffee } from 'lucide-react';

const StudentTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCount, setSessionsCount] = useState(() => {
    return parseInt(localStorage.getItem('pomodoro_sessions') || '0', 10);
  });

  const totalSeconds = useRef(25 * 60);
  const currentSeconds = useRef(25 * 60);

  // Reference for the interval
  const intervalRef = useRef(null);

  // Web Audio API beep sound generator
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // 600Hz beep
      gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

      oscillator.start();
      // stop oscillation after 0.5 seconds
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (error) {
      console.warn('Web Audio API not supported/blocked:', error);
    }
  };

  useEffect(() => {
    // Sync refs on initial load
    currentSeconds.current = (isBreak ? 5 : 25) * 60;
    totalSeconds.current = (isBreak ? 5 : 25) * 60;
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  }, [isBreak]);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (currentSeconds.current > 0) {
          currentSeconds.current -= 1;
          setMinutes(Math.floor(currentSeconds.current / 60));
          setSeconds(currentSeconds.current % 60);
        } else {
          // Timer finished
          playBeep();
          setIsActive(false);
          clearInterval(intervalRef.current);

          if (!isBreak) {
            // Completed focus session
            const newCount = sessionsCount + 1;
            setSessionsCount(newCount);
            localStorage.setItem('pomodoro_sessions', newCount.toString());
            alert('Focus session completed! Time for a short 5-minute break.');
            setIsBreak(true);
          } else {
            alert('Break over! Ready to focus again?');
            setIsBreak(false);
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isBreak, sessionsCount]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    currentSeconds.current = 25 * 60;
    totalSeconds.current = 25 * 60;
    setMinutes(25);
    setSeconds(0);
  };

  const handleCustomMode = (mode) => {
    setIsActive(false);
    if (mode === 'focus') {
      setIsBreak(false);
      currentSeconds.current = 25 * 60;
      totalSeconds.current = 25 * 60;
      setMinutes(25);
      setSeconds(0);
    } else {
      setIsBreak(true);
      currentSeconds.current = 5 * 60;
      totalSeconds.current = 5 * 60;
      setMinutes(5);
      setSeconds(0);
    }
  };

  // SVG parameters
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  // Calculate percentage remaining
  const percentRemaining = totalSeconds.current > 0 
    ? currentSeconds.current / totalSeconds.current 
    : 1;
  const strokeDashoffset = circumference - percentRemaining * circumference;

  return (
    <div className="text-start">
      <Header />

      <div className="glow-card p-4 mb-4">
        <h3 className="fw-bold text-white font-heading mb-2">Focus Timer (Pomodoro)</h3>
        <p className="text-secondary mb-0">
          Maximize concentration. Work intensely for 25 minutes without distractions, then take a short 5-minute break.
        </p>
      </div>

      <div className="row g-4 align-items-center justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="glow-card p-4 text-center d-flex flex-column align-items-center justify-content-center">
            
            {/* Mode selection buttons */}
            <div className="d-flex p-1 rounded-3 bg-dark mb-4" style={{ background: 'rgba(0,0,0,0.2) !important' }}>
              <button 
                onClick={() => handleCustomMode('focus')}
                className={`btn py-1.5 px-3 border-0 font-heading small fw-semibold text-white ${!isBreak ? 'btn-primary-custom' : 'opacity-50'}`}
                style={{ borderRadius: '6px' }}
              >
                Focus Session (25m)
              </button>
              <button 
                onClick={() => handleCustomMode('break')}
                className={`btn py-1.5 px-3 border-0 font-heading small fw-semibold text-white ${isBreak ? 'btn-primary-custom' : 'opacity-50'}`}
                style={{ borderRadius: '6px' }}
              >
                Short Break (5m)
              </button>
            </div>

            {/* Circular Timer representation */}
            <div className="timer-circle-svg mb-4">
              <svg width="220" height="220" className="d-block mx-auto">
                <defs>
                  <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                <circle 
                  cx="110" 
                  cy="110" 
                  r={radius} 
                  className="timer-bg-circle" 
                />
                <circle 
                  cx="110" 
                  cy="110" 
                  r={radius} 
                  className="timer-progress-circle" 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="timer-text">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>

            {/* Controls */}
            <div className="d-flex gap-3 mb-3">
              <button 
                onClick={toggleTimer}
                className="btn btn-primary-custom px-4 py-2.5 d-flex align-items-center gap-2"
                style={{ fontSize: '1rem' }}
              >
                {isActive ? <Pause size={18} /> : <Play size={18} />}
                {isActive ? 'Pause' : 'Start Focus'}
              </button>
              
              <button 
                onClick={resetTimer}
                className="btn btn-secondary-custom px-4 py-2.5 d-flex align-items-center gap-2"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>

            {/* Break vs focus labels */}
            <div className="d-flex align-items-center gap-2 text-secondary small">
              {isBreak ? (
                <>
                  <Coffee size={16} className="text-glow-cyan text-cyan" />
                  <span>Break active. Relax, refresh, hydrate.</span>
                </>
              ) : (
                <>
                  <Timer size={16} className="text-glow-purple text-purple" />
                  <span>Focus session active. Avoid all external notifications.</span>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Info card & logs */}
        <div className="col-md-6 col-lg-5">
          <div className="glow-card p-4 h-100 text-start">
            <h4 className="fw-bold text-white font-heading mb-3">Productivity Stats</h4>
            <p className="text-secondary small mb-4">
              Maintaining focused intervals increases neuro-retention. Complete 4 focus sessions (100 minutes) to reach your daily smart target.
            </p>
            
            <div className="p-3 rounded-3 bg-dark mb-3" style={{ background: 'rgba(0,0,0,0.2) !important', border: '1px solid var(--border-color)' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="small text-white">Focus Sessions Done Today</span>
                <span className="badge bg-purple font-heading fs-6 px-2.5 py-1">{sessionsCount}</span>
              </div>
            </div>

            <div className="progress mb-4" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
              <div 
                className="progress-bar bg-purple" 
                style={{ width: `${Math.min((sessionsCount / 4) * 100, 100)}%`, background: 'linear-gradient(to right, #8B5CF6, #EC4899)' }}
              ></div>
            </div>

            <div className="d-flex align-items-start gap-2.5 small text-secondary">
              <AlertTriangle className="text-warning flex-shrink-0" size={16} />
              <span>Resetting this page resets the ticking timer, but your completed sessions counts will remain logged locally.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTimer;
