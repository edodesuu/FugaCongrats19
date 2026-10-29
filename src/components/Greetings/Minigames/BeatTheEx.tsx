import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { PixelButton } from '../../UI/PixelButton';
import { surpriseGame } from '../../../data/greetings';

type Phase = 'intro' | 'playing' | 'result';

const GRID_SIZE = 9; // 3x3 норы
const MOLE_INTERVAL = 750; // мс между появлениями

export function BeatTheEx() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [timeLeft, setTimeLeft] = useState(surpriseGame.duration);
  const [hits, setHits] = useState(0);
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const [hitFx, setHitFx] = useState<Array<{ id: number; hole: number }>>([]);
  const fxId = useRef(0);

  // Таймер обратного отсчёта
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      setPhase('result');
      setActiveHole(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  // Крот прыгает по норам
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setActiveHole(Math.floor(Math.random() * GRID_SIZE));
    }, MOLE_INTERVAL);
    return () => clearInterval(interval);
  }, [phase]);

  const startGame = useCallback(() => {
    setHits(0);
    setTimeLeft(surpriseGame.duration);
    setActiveHole(null);
    setPhase('playing');
  }, []);

  const whack = useCallback((hole: number) => {
    if (phase !== 'playing' || activeHole !== hole) return;
    setHits(prev => prev + 1);
    setActiveHole(null);
    setShake(true);
    setTimeout(() => setShake(false), 200);
    const id = ++fxId.current;
    setHitFx(prev => [...prev, { id, hole }]);
    setTimeout(() => setHitFx(prev => prev.filter(f => f.id !== id)), 500);
  }, [phase, activeHole]);

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {/* === INTRO: сюрприз, ничего не спойлерим === */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="text-center p-8 bg-pixel-card border-4 border-vw-pink shadow-glow-pink"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="text-6xl mb-4 animate-bounce-pixel" aria-hidden="true">
              {surpriseGame.introEmoji}
            </div>
            <h3 className="font-pixel text-xl text-vw-pink mb-4">{surpriseGame.introTitle}</h3>
            <p className="font-mono text-lg text-pixel-text-dim mb-2">{surpriseGame.introDescription}</p>
            <p className="font-mono text-sm text-pixel-text-dim/60 mb-8">
              {surpriseGame.duration} секунд. Дальше — увидишь сама. 👀
            </p>
            <PixelButton variant="red" size="lg" onClick={startGame}>
              <Zap className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              ИГРАТЬ
            </PixelButton>
          </motion.div>
        )}

        {/* === PLAYING: бьём бывшего === */}
        {phase === 'playing' && (
          <motion.div
            key="playing"
            className={clsx('p-6 bg-pixel-card border-4 border-vw-blue', shake && 'animate-flicker')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* HUD */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-pixel text-sm text-vw-blue">
                <Timer className="w-5 h-5" aria-hidden="true" />
                <span className={clsx(timeLeft <= 5 && 'text-vw-sun animate-pulse')}>
                  {timeLeft}с
                </span>
              </div>
              <div className="font-pixel text-sm text-vw-pink">
                ПОПАДАНИЙ: {hits}
              </div>
            </div>

            {/* Игровое поле 3x3 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {Array.from({ length: GRID_SIZE }, (_, hole) => (
                <button
                  key={hole}
                  className={clsx(
                    'relative aspect-square bg-pixel-bg border-2 border-pixel-border',
                    'flex items-center justify-center overflow-hidden',
                    'hover:border-vw-pink transition-colors cursor-pointer',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-vw-pink'
                  )}
                  onClick={() => whack(hole)}
                  aria-label={`Нора ${hole + 1}`}
                >
                  {/* Нора */}
                  <div className="absolute bottom-2 w-3/4 h-3 bg-pixel-border rounded-full" aria-hidden="true" />

                  {/* Бывший */}
                  <AnimatePresence>
                    {activeHole === hole && (
                      <motion.div
                        className="relative z-10"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ duration: 0.12 }}
                      >
                        <img
                          src={surpriseGame.exImage}
                          alt=""
                          draggable={false}
                          className="w-20 h-20 object-contain pointer-events-none select-none"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Эффект попадания */}
                  <AnimatePresence>
                    {hitFx.filter(f => f.hole === hole).map(f => (
                      <motion.div
                        key={f.id}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="font-pixel text-2xl text-vw-sun">💥</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            <p className="text-center font-mono text-sm text-pixel-text-dim/60">
              Лупи его, когда вылезает! 👊
            </p>
          </motion.div>
        )}

        {/* === RESULT: пожелание + бывший + Кайн === */}
        {phase === 'result' && (
          <motion.div
            key="result"
            className="text-center p-8 bg-pixel-card border-4 border-vw-purple shadow-glow-purple"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="font-pixel text-sm text-vw-blue mb-6">
              ПОПАДАНИЙ: {hits}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <h3 className="font-pixel text-lg md:text-xl text-vw-pink mb-6 leading-relaxed">
                {surpriseGame.winMessage}
              </h3>
            </motion.div>

            {/* Фото бывшего под пожеланием */}
            <motion.div
              className="inline-block p-3 bg-pixel-bg border-2 border-vw-sun/60"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <img
                src={surpriseGame.exImage}
                alt="Бывший"
                className="w-40 h-40 object-contain mx-auto"
              />
            </motion.div>

            {/* Кайн — таких побольше) */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h4 className="font-pixel text-base md:text-lg text-vw-blue mb-6 leading-relaxed">
                {surpriseGame.goodText}
              </h4>
              <div className="inline-block p-3 bg-pixel-bg border-2 border-vw-blue/60">
                <img
                  src={surpriseGame.goodImage}
                  alt="Кайн"
                  className="w-40 h-40 object-contain mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
