import React from 'react';
import { ChevronDown } from 'lucide-react';

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

export default LyricsOverlay;
