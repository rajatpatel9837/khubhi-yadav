import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Soft romantic chord progression in D Major / B Minor pentatonic (warm, peaceful, ethereal)
  const chordFrequencies = [
    [146.83, 220.00, 277.18, 369.99], // Dmaj7 (D3, A3, C#4, F#4)
    [123.47, 185.00, 246.94, 293.66], // Bm7 (B2, F#3, B3, D4)
    [98.00, 146.83, 196.00, 246.94],  // Gmaj7 (G2, D3, G3, B3)
    [110.00, 164.81, 220.00, 277.18], // A sus (A2, E3, A3, C#4)
  ];

  const playChord = (ctx: AudioContext, frequencies: number[], masterGain: GainNode) => {
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      // Warm sine + subtle triangle overtone
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Soft attack & gentle release
      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.06 / frequencies.length, now + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 6.0);
    });
  };

  const startAmbientMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      gainNodeRef.current = masterGain;

      let chordIndex = 0;
      playChord(ctx, chordFrequencies[chordIndex], masterGain);

      intervalRef.current = window.setInterval(() => {
        chordIndex = (chordIndex + 1) % chordFrequencies.length;
        if (ctx.state === 'running') {
          playChord(ctx, chordFrequencies[chordIndex], masterGain);
        }
      }, 5000);

      setIsPlaying(true);
    } catch {
      console.warn('Web Audio API not supported or user blocked audio');
    }
  };

  const stopAmbientMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
    }
    audioCtxRef.current = null;
    gainNodeRef.current = null;
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbientMusic();
    } else {
      startAmbientMusic();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-light/70 border border-champagne/20 backdrop-blur-md text-xs text-ivory/80 shadow-lg">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause ambient melody" : "Play ambient melody"}
        className="flex items-center gap-1.5 hover:text-champagne transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne rounded"
        title={isPlaying ? "Mute ambient music" : "Play gentle ambient soundtrack"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-rose-dusty animate-pulse" />
            <span className="hidden sm:inline font-sans text-[11px] tracking-wide text-champagne">Playing Melody</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-ivory/50" />
            <span className="hidden sm:inline font-sans text-[11px] tracking-wide">Sound Muted</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/10">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Soundtrack Volume"
            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-champagne"
          />
        </div>
      )}

      <Music className={`w-3 h-3 text-champagne/60 ${isPlaying ? 'animate-bounce' : 'opacity-40'}`} />
    </div>
  );
};
