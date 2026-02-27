import React, { createContext, useState, useRef, useEffect } from 'react';
import songsData from './songs.json';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(new Audio());

    // Setup eventi audio
    useEffect(() => {
        const audio = audioRef.current;

        const setAudioData = () => setDuration(audio.duration);
        const setAudioTime = () => setProgress(audio.currentTime);
        const setAudioEnded = () => {
            // Auto-play canzone successiva
            skipNext();
        };

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', setAudioEnded);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', setAudioEnded);
        };
    }, [currentSong]);

    // Gestione cambio canzone
    useEffect(() => {
        if (currentSong) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log("Autoplay preventito o file mancante: ", err));
        }
    }, [currentSong]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (currentSong) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(err => console.log("Errore play: ", err));
            }
        }
    };

    const playSong = (song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            setCurrentSong(song);
        }
    };

    const skipNext = () => {
        if (!currentSong) return;
        const idx = songsData.findIndex(s => s.id === currentSong.id);
        const nextSong = songsData[(idx + 1) % songsData.length];
        setCurrentSong(nextSong);
    };

    const skipPrev = () => {
        if (!currentSong) return;
        // Se siamo oltre 3 secondi, ricomincia la canzone
        if (audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
            return;
        }
        const idx = songsData.findIndex(s => s.id === currentSong.id);
        const prevSong = songsData[(idx - 1 + songsData.length) % songsData.length];
        setCurrentSong(prevSong);
    };

    const setAudioProgress = (time) => {
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    return (
        <AudioContext.Provider value={{
            currentSong,
            isPlaying,
            progress,
            duration,
            togglePlay,
            playSong,
            skipNext,
            skipPrev,
            setAudioProgress
        }}>
            {children}
        </AudioContext.Provider>
    );
};
