import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const MusicToggle = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (!isPlaying) {
      soundManager.startMelody();
      setIsPlaying(true);
      setIsMuted(false);
      soundManager.setMuted(false);
    } else {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      soundManager.setMuted(nextMuted);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`music-toggle-btn ${isPlaying && !isMuted ? 'music-playing' : ''}`}
      aria-label={isMuted ? "Unmute music & sound" : "Mute music & sound"}
      title={isMuted ? "Play Music & Audio" : "Mute Sound"}
    >
      {isMuted ? (
        <span className="toggle-inner">
          <VolumeX size={16} className="toggle-icon" />
          <span className="toggle-label">Muted</span>
        </span>
      ) : isPlaying ? (
        <span className="toggle-inner">
          <Volume2 size={16} className="toggle-icon text-rose-500" />
          <span className="sound-wave">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="toggle-label">Playing</span>
        </span>
      ) : (
        <span className="toggle-inner">
          <Music size={16} className="toggle-icon" />
          <span className="toggle-label">Sound</span>
        </span>
      )}
    </button>
  );
};
