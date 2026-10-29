import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, Gamepad2, Music, Star } from 'lucide-react';
import { clsx } from 'clsx';
import type { Wish } from '../../data/greetings';

interface GiftBoxProps {
  wish: Wish;
  index: number;
  onOpen: (wish: Wish) => void;
  isOpened: boolean;
}

const giftIcons = [Gift, Sparkles, Heart, Gamepad2, Music, Star];
const wishEmojis = ['💪', '😊', '💰', '✨', '💞', '🎉'];

export function GiftBox({ wish, index, onOpen, isOpened }: GiftBoxProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = giftIcons[index % giftIcons.length];

  const handleClick = () => {
    if (!isOpened) {
      onOpen(wish);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isOpened) {
      onOpen(wish);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={!isOpened ? { y: -8, scale: 1.02 } : {}}
      className="group relative"
    >
      <div
        className={clsx(
          'relative aspect-square bg-pixel-card border-4 border-pixel-border',
          'flex flex-col items-center justify-center p-6 text-center cursor-pointer',
          'transition-all duration-200',
          isOpened
            ? 'opacity-50 cursor-default bg-pixel-card/50'
            : 'hover:border-pixel-accent hover:shadow-glow-cyan hover:-translate-y-1 hover:-translate-x-1'
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        tabIndex={isOpened ? -1 : 0}
        role="button"
        aria-label={isOpened ? `Открыто: ${wish.text.substring(0, 50)}...` : `Подарок ${index + 1}. Нажми, чтобы открыть`}
        aria-pressed={isOpened}
      >
        {/* Ribbon */}
        <div className={clsx(
          'absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-16',
          isOpened ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        )} aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-vw-sun" />
          <div className="absolute top-0 left-0 w-full h-2 bg-vw-sun" />
          <div className="absolute top-0 right-0 w-2 h-full bg-vw-sun" />
        </div>

        {/* Box lid */}
        <AnimatePresence mode="wait">
          {!isOpened && (
            <motion.div
              key="lid"
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-vw-sun border-2 border-vw-sun2 rounded-t"
              initial={{ rotateX: 0, y: 0 }}
              exit={{ rotateX: -90, y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              animate={hovered && !isOpened ? { y: -6, rotateX: -10 } : { y: 0, rotateX: 0 }}
              style={{ transformOrigin: 'bottom center' }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Box body */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <motion.div
            className="text-5xl mb-3"
            animate={!isOpened ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            aria-hidden="true"
          >
            🎁
          </motion.div>

          <motion.div
            className="text-3xl mb-2"
            initial={false}
            animate={isOpened ? { scale: [0, 1.2, 1], rotate: [0, 360] } : {}}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          >
            <Icon className="w-10 h-10 text-pixel-accent" />
          </motion.div>

          <motion.p
            className="font-pixel text-xs text-pixel-text-dim max-w-xs"
            initial={false}
            animate={isOpened ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          >
            {isOpened ? 'ОТКРЫТО!' : 'НАЖМИ ЧТОБЫ ОТКРЫТЬ'}
          </motion.p>

          {isOpened && (
            <motion.div
              key="opened-content"
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pixel-card to-pixel-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-4xl mb-3 animate-bounce-pixel"
                aria-hidden="true"
              >
                {wishEmojis[index % wishEmojis.length]}
              </motion.div>
              <motion.p
                className="font-mono text-sm text-pixel-text text-center leading-relaxed max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {wish.text}
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Glow effect when hovered */}
        {!isOpened && hovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pixel-accent/20 to-transparent rounded-[4px]"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-hidden="true"
          />
        )}

        {/* Particle effects on open */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              key="particles"
              className="absolute inset-0 pointer-events-none"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: ['#ff71ce', '#ff9a3c', '#05d9e8', '#b16eff', '#ffd700', '#01cdfe'][i % 6],
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                  aria-hidden="true"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Opened badge */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            key="opened-badge"
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pixel-accent text-pixel-bg font-pixel text-[8px] border-2 border-pixel-accent shadow-glow-cyan"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✨ ОТКРЫТО
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}