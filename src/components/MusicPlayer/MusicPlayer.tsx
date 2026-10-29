import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { Howl } from 'howler';
import { clsx } from 'clsx';
import { useAudio } from '../../hooks/useAudio';
import { playlist, mainTheme } from '../../data/playlist';
import type { Track } from '../../data/playlist';
import { Visualizer } from './Visualizer';
import { TrackList } from './TrackList';
import { EasterEggs } from './EasterEggs';

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    currentTime,
    play,
    togglePlay,
    next,
    prev,
    setVolume,
    setProgress,
  } = useAudio(playlist);

  // === Главная тема сайта: играет на повторе, пока плеер не активен ===
  const themeRef = useRef<Howl | null>(null);
  const themeStartedRef = useRef(false);

  useEffect(() => {
    const startTheme = () => {
      if (themeStartedRef.current) return;
      themeStartedRef.current = true;
      const theme = new Howl({ src: [mainTheme.src], loop: true, volume: 0.4 });
      themeRef.current = theme;
      theme.play();
    };
    // Пробуем включить сразу при загрузке страницы
    startTheme();
    // Если браузер заблокировал автоплей — включится при первом взаимодействии
    const unlock = () => {
      startTheme();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      themeRef.current?.unload();
      themeRef.current = null;
      themeStartedRef.current = false;
    };
  }, []);

  // Как только пользователь включает трек в плеере — тема замолкает навсегда
  useEffect(() => {
    if (currentTrack && themeRef.current) {
      themeRef.current.stop();
      themeRef.current.unload();
      themeRef.current = null;
    }
  }, [currentTrack]);

  const handlePlay = useCallback((track: Track) => {
    play(track);
  }, [play]);

  const [titleClicks, setTitleClicks] = useState(0);
  const handleTitleClick = useCallback(() => {
    setTitleClicks(prev => prev + 1);
  }, []);

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="music" className="section-container">
      {/* Header */}
      <motion.header
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className="section-title font-pixel text-2xl md:text-3xl lg:text-4xl cursor-pointer select-none"
          onClick={handleTitleClick}
          title={titleClicks > 10 ? `Кликов: ${titleClicks}... продолжай 👀` : undefined}
        >
          А ТЕПЕРЬ ДАВАЙТЕ ЗАТУСИМ!
        </h2>
        <p className="font-mono text-pixel-text-dim mt-4 max-w-2xl mx-auto">
          Главная тема сайта уже играет на фоне. Хочешь другое — врубай любой трек. 🎧
        </p>
      </motion.header>

      <div className="max-w-4xl mx-auto">
        {/* Player panel */}
        <motion.div
          className="relative p-6 md:p-8 bg-pixel-card border-4 border-vw-pink/60 shadow-vw-inset mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Уголки-пиксели */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-vw-pink" aria-hidden="true" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-vw-blue" aria-hidden="true" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-vw-blue" aria-hidden="true" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-vw-pink" aria-hidden="true" />

          {/* Now playing */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className={clsx(
                'w-16 h-16 flex items-center justify-center bg-vw-panel border-2 border-vw-blue',
                isPlaying && 'animate-sun-pulse'
              )}
              aria-hidden="true"
            >
              <Music className="w-8 h-8 text-vw-blue" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="font-pixel text-sm text-vw-blue truncate">
                {currentTrack?.title ?? 'Выбери трек'}
              </div>
              <div className="font-mono text-sm text-pixel-text-dim truncate">
                {currentTrack?.artist ?? '—'}
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="mb-6 h-24">
            <Visualizer barCount={32} isPlaying={isPlaying} className="w-full h-full" />
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <input
              type="range"
              className="w-full h-2 bg-pixel-bg border border-pixel-border cursor-pointer appearance-none accent-vw-pink"
              min={0}
              max={100}
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              aria-label="Прогресс трека"
            />
            <div className="flex justify-between font-mono text-xs text-pixel-text-dim mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              className="p-3 bg-pixel-bg border-2 border-pixel-border text-pixel-text-dim hover:text-vw-blue hover:border-vw-blue transition-colors"
              onClick={prev}
              whileTap={{ scale: 0.9 }}
              aria-label="Предыдущий трек"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              className="p-5 bg-vw-pink text-pixel-bg border-2 border-vw-pink shadow-glow-pink hover:bg-pink-500 transition-colors"
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              aria-label={isPlaying ? 'Пауза' : 'Играть'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </motion.button>

            <motion.button
              className="p-3 bg-pixel-bg border-2 border-pixel-border text-pixel-text-dim hover:text-vw-blue hover:border-vw-blue transition-colors"
              onClick={next}
              whileTap={{ scale: 0.9 }}
              aria-label="Следующий трек"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>

            {/* Volume */}
            <div className="flex items-center gap-2 ml-4">
              <button
                className="text-pixel-text-dim hover:text-vw-blue transition-colors"
                onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
                aria-label={volume > 0 ? 'Выключить звук' : 'Включить звук'}
              >
                {volume > 0 ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                className="w-20 h-2 bg-pixel-bg border border-pixel-border cursor-pointer appearance-none accent-vw-blue"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                aria-label="Громкость"
              />
            </div>
          </div>
        </motion.div>

        {/* Track list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TrackList
            playlist={playlist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlay={handlePlay}
          />
        </motion.div>
      </div>

      {/* Easter eggs (dev console) */}
      <EasterEggs titleClicks={titleClicks} />
    </section>
  );
}
