import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants/tracks';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
      });
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setProgress(0);
    setCurrentTime(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(total);
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center gap-8 px-2 md:px-0">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        loop={false}
      />

      <div className="flex flex-col gap-2 min-w-[200px] text-center md:text-left">
        <p className="text-[10px] uppercase text-cyan-400 font-bold tracking-widest">Now Playing</p>
        <p className="text-xl font-bold truncate">{currentTrack.title}</p>
        <p className="text-xs text-white/40">Progress: {formatTime(currentTime)} / {formatTime(duration)}</p>
      </div>
      
      <div className="flex-1 flex flex-col gap-4 items-center w-full">
        <div className="flex items-center gap-6">
          <button onClick={handlePrev} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-6 h-6 rotate-180" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18V6l12 6-12 6z"></path></svg>
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            ) : (
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
            )}
          </button>
          
          <button onClick={handleNext} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18V6l12 6-12 6z"></path></svg>
          </button>
        </div>
        
        <div className="w-full max-w-xl h-1.5 bg-white/10 rounded-full relative">
          <div 
            className="absolute left-0 top-0 h-full bg-white rounded-full shadow-[0_0_10px_white] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-white/40 px-6 min-w-[180px] justify-end">
        <button onClick={toggleMute} className="hover:text-white transition-colors">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="w-24 h-1 bg-white/10 rounded-full flex-shrink-0">
          <div className="h-full bg-white/40 rounded-full transition-all" style={{ width: isMuted ? '0%' : '70%' }}></div>
        </div>
      </div>
    </div>
  );
};
