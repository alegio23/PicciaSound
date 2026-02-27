import React, { useState, useContext } from 'react';
import { Heart, Pause, Play, SkipBack, SkipForward, ChevronDown, Mic2 } from 'lucide-react';
import { AudioContext } from '../AudioContext.jsx';
import LyricsOverlay from '../componenti/LyricsOverlay.jsx';

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

export default PlayerPage;
