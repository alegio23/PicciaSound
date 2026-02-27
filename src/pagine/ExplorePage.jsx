import React from 'react';
import { Play, Pause } from 'lucide-react';
import songsData from '../songs.json';

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

export default ExplorePage;
