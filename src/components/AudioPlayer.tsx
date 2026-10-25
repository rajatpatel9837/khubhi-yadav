import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'oafxkMv4xnc';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(85);
  const [showUnmuteHint, setShowUnmuteHint] = useState(true);
  const playerRef = useRef<any>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const playerReadyRef = useRef(false);
  const unmuteListenerRef = useRef<(() => void) | null>(null);

  // Unmute on first user interaction anywhere on page
  const setupUnmuteOnInteraction = () => {
    const unmute = () => {
      if (playerRef.current && playerReadyRef.current) {
        playerRef.current.unMute();
        playerRef.current.setVolume(85);
        setIsMuted(false);
        setShowUnmuteHint(false);
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', unmute);
      document.removeEventListener('touchstart', unmute);
      document.removeEventListener('keydown', unmute);
      document.removeEventListener('scroll', unmute);
    };
    unmuteListenerRef.current = unmute;
    document.addEventListener('click', unmute);
    document.addEventListener('touchstart', unmute);
    document.addEventListener('keydown', unmute);
    document.addEventListener('scroll', unmute);
  };

  const initPlayer = () => {
    if (!iframeContainerRef.current) return;

    playerRef.current = new window.YT.Player(iframeContainerRef.current, {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        mute: 1, // Start muted for autoplay to work
      },
      events: {
        onReady: (event: any) => {
          playerReadyRef.current = true;
          event.target.mute();
          event.target.setVolume(85);
          event.target.playVideo();
          setIsPlaying(true);
          setIsMuted(true);
          // Setup unmute on first interaction
          setupUnmuteOnInteraction();
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (
            event.data === window.YT.PlayerState.PAUSED ||
            event.data === window.YT.PlayerState.ENDED
          ) {
            setIsPlaying(false);
          }
        },
      },
    });
  };

  // Load YouTube IFrame API and auto-init player
  useEffect(() => {
    const loadAndInit = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    };

    // Small delay so DOM is ready
    const timer = setTimeout(loadAndInit, 800);

    return () => {
      clearTimeout(timer);
      // Cleanup interaction listeners
      if (unmuteListenerRef.current) {
        document.removeEventListener('click', unmuteListenerRef.current);
        document.removeEventListener('touchstart', unmuteListenerRef.current);
        document.removeEventListener('keydown', unmuteListenerRef.current);
        document.removeEventListener('scroll', unmuteListenerRef.current);
      }
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !playerReadyRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playerRef.current && playerReadyRef.current) {
      playerRef.current.unMute();
      playerRef.current.setVolume(85);
      setIsMuted(false);
      setShowUnmuteHint(false);
      // Remove global listeners since we're handling it here
      if (unmuteListenerRef.current) {
        document.removeEventListener('click', unmuteListenerRef.current);
        document.removeEventListener('touchstart', unmuteListenerRef.current);
        document.removeEventListener('keydown', unmuteListenerRef.current);
        document.removeEventListener('scroll', unmuteListenerRef.current);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    if (playerRef.current) {
      playerRef.current.setVolume(newVol);
      if (newVol === 0) {
        playerRef.current.mute();
        setIsMuted(true);
      } else if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
        setShowUnmuteHint(false);
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube iframe */}
      <div style={{ position: 'fixed', bottom: '-9999px', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden', pointerEvents: 'none' }}>
        <div ref={iframeContainerRef} />
      </div>

      {/* Unmute hint — shown until first interaction */}
      {showUnmuteHint && isPlaying && (
        <button
          onClick={handleUnmute}
          className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-champagne text-midnight text-[10px] sm:text-[11px] font-sans font-semibold tracking-wide shadow-lg animate-pulse hover:animate-none hover:bg-champagne-light transition-all whitespace-nowrap"
          title="Click to unmute Bairan"
        >
          <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden xs:inline sm:inline">Tap to unmute ♪</span>
          <span className="xs:hidden sm:hidden">Unmute ♪</span>
        </button>
      )}

      {/* Main Player UI */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-midnight-light/80 border border-champagne/20 backdrop-blur-md text-xs text-ivory/80 shadow-lg">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Bairan' : 'Play Bairan'}
          className="flex items-center gap-1 sm:gap-1.5 hover:text-champagne transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne rounded"
        >
          {isPlaying ? (
            <>
              <Volume2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isMuted ? 'text-ivory/50' : 'text-rose-dusty animate-pulse'}`} />
              <span className="hidden md:inline font-sans text-[11px] tracking-wide text-champagne">
                Bairan {isMuted ? '(muted)' : '♪'}
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ivory/50" />
              <span className="hidden md:inline font-sans text-[11px] tracking-wide">Play Bairan</span>
            </>
          )}
        </button>

        {isPlaying && !isMuted && (
          <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-white/10">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Song Volume"
              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-champagne"
            />
          </div>
        )}

        <Music className={`w-3 h-3 text-champagne/60 ${isPlaying && !isMuted ? 'animate-bounce' : 'opacity-40'}`} />
      </div>
    </>
  );
};
