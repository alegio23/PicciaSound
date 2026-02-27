import React, { useState, useContext } from 'react';
import { Home, Compass, Bookmark } from 'lucide-react';
import './App.css';
import { AudioContext } from './AudioContext.jsx';

// --- Pagine (ogni schermata è in src/pagine/) ---
import WelcomePage from './pagine/WelcomePage.jsx';
import ExplorePage from './pagine/ExplorePage.jsx';
import PlayerPage from './pagine/PlayerPage.jsx';
import ComingSoonPage from './pagine/ComingSoonPage.jsx';

// --- Main App: gestisce solo la navigazione tra le pagine ---
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
