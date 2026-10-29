import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Mail } from 'lucide-react';
import { wishes, personalMessage } from '../../data/greetings';
import type { Wish } from '../../data/greetings';
import { GiftBox } from './GiftBox';
import { BeatTheEx } from './Minigames/BeatTheEx';
import { SteamGift } from './SteamGift';

export function Greetings() {
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());

  const handleGiftOpen = useCallback((wish: Wish) => {
    const wishIndex = wishes.findIndex(w => w.id === wish.id);
    if (wishIndex !== -1) {
      setOpenedGifts(prev => new Set(prev).add(wishIndex));
    }
  }, []);

  return (
    <section id="greetings" className="section-container">
      {/* Header */}
      <motion.header
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title font-pixel text-2xl md:text-3xl lg:text-4xl">
          ПОЗДРАВЛЕНИЯ
        </h2>
        <p className="font-mono text-pixel-text-dim mt-4 max-w-2xl mx-auto">
          Любимая часть каждой девачки подарочки, поздравления. Но сначала мини игра!
        </p>
      </motion.header>

      {/* === 1. Мини-игра-сюрприз === */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-pixel text-xl text-center mb-8 flex items-center justify-center gap-2">
          <span className="text-2xl" aria-hidden="true">🎮</span>
          <span className="text-vw-pink">МИНИ-ИГРА</span>
          <span className="text-2xl" aria-hidden="true">🎮</span>
        </h3>
        <BeatTheEx />
      </motion.div>

      {/* === 2. Пожелания === */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-pixel text-xl text-center mb-10 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-vw-sun" aria-hidden="true" />
          <span className="text-vw-sun">ПОЖЕЛАНИЯ</span>
          <Sparkles className="w-6 h-6 text-vw-sun" aria-hidden="true" />
        </h3>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Пожелания"
        >
          {wishes.map((wish, index) => (
            <GiftBox
              key={wish.id}
              wish={wish}
              index={index}
              onOpen={handleGiftOpen}
              isOpened={openedGifts.has(index)}
            />
          ))}
        </div>

        {openedGifts.size === wishes.length && wishes.length > 0 && (
          <motion.div
            className="mt-10 p-6 bg-gradient-to-r from-vw-sun/20 to-vw-blue/20 border-2 border-vw-sun/50 text-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-pixel text-xl text-vw-sun mb-2">ВСЕ ПОЖЕЛАНИЯ ОТКРЫТЫ!</div>
            <div className="font-mono text-sm text-pixel-text-dim">
              Ты — лучшая. Это официально. ✨
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* === 3. От меня лично === */}
      <motion.div
        className="mb-20 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-pixel text-xl text-center mb-10 flex items-center justify-center gap-2">
          <Mail className="w-6 h-6 text-vw-blue" aria-hidden="true" />
          <span className="text-vw-blue">{personalMessage.title}</span>
          <Mail className="w-6 h-6 text-vw-blue" aria-hidden="true" />
        </h3>

        <div className="relative p-8 bg-pixel-card border-4 border-vw-blue/60 shadow-glow-cyan">
          {/* Уголки-пиксели */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-vw-pink" aria-hidden="true" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-vw-blue" aria-hidden="true" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-vw-blue" aria-hidden="true" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-vw-pink" aria-hidden="true" />

          <pre className="font-mono text-lg text-pixel-text leading-relaxed whitespace-pre-wrap">
            {personalMessage.content}
          </pre>
          <div className="mt-6 text-right font-mono text-xl text-vw-pink">
            {personalMessage.signature}
          </div>
        </div>
      </motion.div>

      {/* === 4. Подарочки === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-pixel text-xl text-center mb-10 flex items-center justify-center gap-2">
          <Gift className="w-6 h-6 text-vw-purple" aria-hidden="true" />
          <span className="text-vw-purple">ПОДАРОЧКИ</span>
          <Gift className="w-6 h-6 text-vw-purple" aria-hidden="true" />
        </h3>

        <SteamGift />
      </motion.div>
    </section>
  );
}
