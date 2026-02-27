import React from 'react';
import { Heart } from 'lucide-react';

const WelcomePage = ({ onEnter }) => (
  <div className="page-container welcome-page" onClick={onEnter} style={{ cursor: 'pointer' }}>
    <div className="floating-notes">
      <div className="note" style={{ left: '15%', animationDuration: '12s', animationDelay: '0s' }}>♪</div>
      <div className="note" style={{ left: '85%', animationDuration: '16s', animationDelay: '3s' }}>♫</div>
      <div className="note" style={{ left: '55%', animationDuration: '10s', animationDelay: '4s', fontSize: '2.5rem' }}>♪</div>
      <div className="note" style={{ left: '35%', animationDuration: '15s', animationDelay: '2s', fontSize: '1.2rem' }}>♫</div>
      <div className="note" style={{ left: '75%', animationDuration: '13s', animationDelay: '1s', fontSize: '1.8rem' }}>♬</div>
    </div>

    <div className="welcome-content">
      <div className="welcome-visual"></div>

      <h1 className="welcome-title">
        Per la mia <span className="text-accent">Picciola</span>
      </h1>

      <div className="waveform">
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
      </div>

      <button
        className="start-btn"
        onClick={(e) => { e.stopPropagation(); onEnter(); }}
        aria-label="Entra"
        style={{ width: '72px', height: '72px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}
      >
        <Heart fill="currentColor" size={32} />
      </button>
    </div>
  </div>
);

export default WelcomePage;
