import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, MousePointerClick } from 'lucide-react';
import { steamGift } from '../../data/greetings';

export function SteamGift() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!opened ? (
          /* === Закрытый подарок === */
          <motion.button
            key="closed"
            className="w-full p-10 bg-pixel-card border-4 border-vw-purple shadow-glow-purple text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-vw-pink"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7, rotate: -5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpened(true)}
            aria-label="Открыть подарок"
          >
            <div className="text-7xl mb-6 animate-bounce-pixel" aria-hidden="true">
              🎁
            </div>
            <div className="font-pixel text-lg text-vw-purple mb-4">ТЕБЕ ПАРОЧКА</div>
            <div className="inline-flex items-center gap-2 font-pixel text-[10px] text-vw-sun animate-pulse">
              <MousePointerClick className="w-4 h-4" aria-hidden="true" />
              НАЖМИ, ЧТОБЫ ОТКРЫТЬ
            </div>
          </motion.button>
        ) : (
          /* === Открытый: пиксельный Steam + текст === */
          <motion.div
            key="opened"
            className="p-10 bg-pixel-card border-4 border-vw-blue shadow-glow-cyan text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.15 }}
            >
              <div
                className="p-5 rounded-full"
                style={{ boxShadow: '0 0 30px rgba(255,113,206,0.45), 0 0 60px rgba(255,179,92,0.2)' }}
              >
                <Gift className="text-vw-sun text-4xl" />
              </div>
            </motion.div>

            <motion.div
              className="font-mono text-2xl md:text-3xl text-pixel-text leading-snug"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {steamGift.text}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
