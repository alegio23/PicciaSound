import React, { useState, useContext } from 'react';
import { Home, Compass, Bookmark, Play, Pause, SkipForward, SkipBack, Heart, Mic2, ChevronDown, X } from 'lucide-react';
import './App.css';
import songsData from './songs.json';
import { AudioContext } from './AudioContext.jsx';

// --- Welcome Page (Impact) ---
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

// --- Explore Page (Dark Playlist) ---
const ExplorePage = ({ onPlay, currentSongId, isPlaying }) => (
  <div className="page-container" style={{ padding: '40px 16px' }}>
    <h2 className="section-title">La Tua <span className="text-accent">Musica</span></h2>

    <div className="songs-list">
      {songsData.map((song) => {
        const isCurrent = currentSongId === song.id;
        return (
          <div key={song.id} className={`song-card ${isCurrent ? 'playing-now-card' : ''}`} onClick={() => onPlay(song)}>
            <img src={song.cover} alt="cover" className="song-cover-small" />

            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-message">{song.message}</p>
            </div>

            <button className="play-btn-small" aria-label={`Riproduci ${song.title}`}>
              {(isCurrent && isPlaying) ? (
                <Pause size={20} fill="currentColor" className="text-accent" />
              ) : (
                <Play size={20} fill="currentColor" className={isCurrent ? "text-accent" : ""} />
              )}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

// --- Lyrics Overlay ---
const LyricsOverlay = ({ song, onClose }) => (
  <div className="lyrics-overlay">
    <div className="lyrics-bg" style={{ backgroundImage: `url(${song.cover})` }} />

    <div className="lyrics-header">
      <button className="icon-btn" onClick={onClose}>
        <ChevronDown size={28} />
      </button>
      <span className="lyrics-label">Testo</span>
      <div style={{ width: 44 }} />
    </div>

    <div className="lyrics-scroll">
      <h3 className="lyrics-song-title">{song.title}</h3>
      <div className="lyrics-text">
        {song.lyrics
          ? song.lyrics.split('\n').map((line, i) =>
              line === ''
                ? <br key={i} />
                : <p key={i}>{line}</p>
            )
          : <p className="lyrics-empty">Testo non disponibile</p>
        }
      </div>
    </div>
  </div>
);

// --- Coming Soon Page (Bookmark) ---
const ComingSoonPage = () => (
  <div className="page-container coming-soon-page">
    <div className="coming-soon-content">
      <div className="coming-soon-icon">🎤</div>
      <h2 className="coming-soon-title">Prossimamente<span className="text-accent">...</span></h2>
      <p className="coming-soon-subtitle">Tour<span className="text-accent">?</span></p>
      <div className="coming-soon-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className="coming-soon-hint">Resta sintonizzata</p>
    </div>
  </div>
);

// --- Player Page (Full Screen Spotify Style) ---
const PlayerPage = ({ onClose }) => {
  const { currentSong, isPlaying, progress, duration, togglePlay, setAudioProgress, skipNext, skipPrev } = useContext(AudioContext);
  const [showOptions, setShowOptions] = useState(false);

  if (!currentSong) {
    return (
      <div className="page-container player-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p className="text-light">Seleziona una canzone da esplorare.</p>
      </div>
    );
  }

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  const handleSeek = (e) => {
    const bars = e.currentTarget.getBoundingClientRect();
    const clickPos = e.clientX - bars.left;
    const newProgress = (clickPos / bars.width) * duration;
    setAudioProgress(newProgress);
  };

  return (
    <div className="player-page" style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div className="player-background" style={{ backgroundImage: `url(${currentSong.cover})` }} />

      <div className="player-header">
        <button className="icon-btn" onClick={onClose} aria-label="Chiudi Player">
          <ChevronDown size={32} />
        </button>
        <span className="playing-now-text">In Riproduzione</span>
        <button className="icon-btn" onClick={() => setShowOptions(true)} aria-label="Testo">
          <Mic2 size={24} />
        </button>
      </div>

      <div className="cover-container">
        <img
          src={currentSong.cover}
          alt="Copertina brano"
          className={`large-cover ${!isPlaying ? 'paused' : ''}`}
        />
      </div>

      <div className="player-bottom-sheet">
        <div className="player-song-info">
          <div className="song-texts">
            <h2 className="player-title">{currentSong.title}</h2>
            <p className="player-artist">{currentSong.artist}</p>
          </div>
          <Heart size={28} fill="currentColor" stroke="none" className="like-btn" />
        </div>

        <div className="progress-container">
          <div className="progress-bar-bg" onClick={handleSeek}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-time">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-controls">
          <button className="control-btn" onClick={skipPrev} aria-label="Precedente">
            <SkipBack size={32} fill="currentColor" stroke="none" />
          </button>

          <button className="play-pause-btn" onClick={togglePlay} aria-label={isPlaying ? "Pausa" : "Play"}>
            {isPlaying ? (
              <Pause size={32} fill="currentColor" stroke="none" />
            ) : (
              <Play size={32} fill="currentColor" stroke="none" style={{ marginLeft: '4px' }} />
            )}
          </button>

          <button className="control-btn" onClick={skipNext} aria-label="Successiva">
            <SkipForward size={32} fill="currentColor" stroke="none" />
          </button>
        </div>
      </div>

      {showOptions && <LyricsOverlay song={currentSong} onClose={() => setShowOptions(false)} />}
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const { currentSong, isPlaying, playSong } = useContext(AudioContext);

  const handlePlaySongList = (song) => {
    playSong(song);
    setCurrentPage('player');
  };

  const closePlayer = () => setCurrentPage('explore');

  if (currentPage === 'welcome') {
    return <WelcomePage onEnter={() => setCurrentPage('explore')} />;
  }

  return (
    <div className="app-layout">
      <main className="main-content" style={{ paddingBottom: currentPage === 'player' ? '0' : '90px' }}>
        {currentPage === 'explore' && (
          <ExplorePage
            onPlay={handlePlaySongList}
            currentSongId={currentSong?.id}
            isPlaying={isPlaying}
          />
        )}
        {currentPage === 'player' && <PlayerPage onClose={closePlayer} />}
        {currentPage === 'coming-soon' && <ComingSoonPage />}
      </main>

      {currentPage !== 'player' && (
        <nav className="bottom-nav glass-panel">
          <button
            className={`nav-btn ${currentPage === 'welcome' ? 'active' : ''}`}
            onClick={() => setCurrentPage('welcome')}
          >
            <Home size={28} strokeWidth={currentPage === 'welcome' ? 2.5 : 2} />
          </button>
          <button
            className={`nav-btn ${currentPage === 'explore' ? 'active' : ''}`}
            onClick={() => setCurrentPage('explore')}
          >
            <Compass size={28} strokeWidth={currentPage === 'explore' ? 2.5 : 2} />
          </button>

          {currentSong && (
            <button className="nav-btn" onClick={() => setCurrentPage('player')}>
              <div style={{
                borderRadius: '50%',
                padding: '2px',
                border: isPlaying ? '2px solid var(--accent-primary)' : '2px solid transparent',
                background: 'none'
              }}>
                <img
                  src={currentSong.cover}
                  alt="Current"
                  style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            </button>
          )}

          <button
            className={`nav-btn ${currentPage === 'coming-soon' ? 'active' : ''}`}
            onClick={() => setCurrentPage('coming-soon')}
          >
            <Bookmark size={28} strokeWidth={currentPage === 'coming-soon' ? 2.5 : 2} />
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
