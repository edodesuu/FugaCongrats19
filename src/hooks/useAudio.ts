import { useState, useCallback, useRef, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import type { Track } from '../data/playlist';

interface UseAudioReturn {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  duration: number;
  currentTime: number;
  playlist: Track[];
  play: (track?: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setPlaylist: (tracks: Track[]) => void;
}

export function useAudio(initialPlaylist: Track[] = []): UseAudioReturn {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [progress, setProgressState] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>(initialPlaylist);

  const howlRef = useRef<Howl | null>(null);
  const currentIndexRef = useRef(0);

  // Initialize Howler
  useEffect(() => {
    Howler.volume(volume);
    return () => {
      if (howlRef.current) {
        howlRef.current.unload();
      }
    };
  }, []);

  const loadTrack = useCallback((track: Track) => {
    if (howlRef.current) {
      howlRef.current.unload();
    }

    const howl = new Howl({
      src: [track.src],
      html5: true,
      volume,
      onload: () => {
        setDuration(howl.duration());
      },
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onstop: () => {
        setIsPlaying(false);
        setProgressState(0);
        setCurrentTime(0);
      },
      onend: () => {
        next();
      },
      onseek: () => {
        const seek = howl.seek() as number;
        setCurrentTime(seek);
        setProgressState((seek / howl.duration()) * 100);
      },
    });

    howlRef.current = howl;
    setCurrentTrack(track);
    return howl;
  }, [volume]);

  const play = useCallback((track?: Track) => {
    if (track) {
      const index = playlist.findIndex(t => t.id === track.id);
      if (index !== -1) {
        currentIndexRef.current = index;
        loadTrack(track).play();
      }
    } else if (howlRef.current) {
      howlRef.current.play();
    } else if (playlist.length > 0) {
      currentIndexRef.current = 0;
      loadTrack(playlist[0]).play();
    }
  }, [playlist, loadTrack]);

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (playlist.length === 0) return;
    currentIndexRef.current = (currentIndexRef.current + 1) % playlist.length;
    loadTrack(playlist[currentIndexRef.current]).play();
  }, [playlist, loadTrack]);

  const prev = useCallback(() => {
    if (playlist.length === 0) return;
    currentIndexRef.current = (currentIndexRef.current - 1 + playlist.length) % playlist.length;
    loadTrack(playlist[currentIndexRef.current]).play();
  }, [playlist, loadTrack]);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    Howler.volume(clamped);
  }, []);

  const setProgress = useCallback((prog: number) => {
    if (howlRef.current) {
      const seek = (prog / 100) * howlRef.current.duration();
      howlRef.current.seek(seek);
    }
  }, []);

  return {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    currentTime,
    playlist,
    play,
    pause,
    togglePlay,
    next,
    prev,
    setVolume,
    setProgress,
    setPlaylist,
  };
}