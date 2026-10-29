import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    // -mt компенсирует pt у main в Layout, чтобы entry-экран занимал
    // весь viewport от самого верха; height:100svh точен на мобильных,
    // min-h-screen остаётся фолбэком для браузеров без svh
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 md:-mt-24"
      style={{ height: '100svh' }}
    >
      {/* Vaporwave sun (полоски через overlay-градиент вместо CSS-маски —
          маска на большом элементе дорого перерисовывается) */}
      <motion.div
        className="absolute top-[14%] left-1/2 -translate-x-1/2 w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full bg-vw-sun animate-sun-pulse overflow-hidden"
        style={{
          boxShadow: '0 0 90px rgba(255,46,136,0.55), 0 0 180px rgba(255,179,92,0.25)',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 12px, #150a26 12px, #150a26 18px)',
          }}
        />
      </motion.div>

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45%] bg-vw-grid animate-grid-pulse"
        style={{
          transform: 'perspective(400px) rotateX(55deg)',
          transformOrigin: 'bottom',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Horizon glow */}
      <div
        className="absolute bottom-[40%] left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #ff71ce, #05d9e8, #ff71ce, transparent)',
          boxShadow: '0 0 30px rgba(255,113,206,0.8)',
        }}
        aria-hidden="true"
      />

      {/* Floating pixel decorations */}
      {['💖', '🎮', '⭐', '🎂', '🌴', '📼'].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl md:text-4xl select-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 20}%`,
          }}
          animate={{ y: [0, -15, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          aria-hidden="true"
        >
          {emoji}
        </motion.span>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="font-pixel text-[10px] md:text-xs text-vw-blue mb-12 tracking-widest animate-pulse">
            ★ ★ ★ 31.10.2026 ★ ★ ★
          </div>
        </motion.div>

        <motion.h1
          className="font-pixel text-3xl md:text-5xl lg:text-6xl leading-tight mb-14"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <span className="block text-vw-pink" style={{ textShadow: '4px 4px 0 #7a2c8e, 0 0 40px rgba(255,113,206,0.6)' }}>
            С ДНЁМ РОЖДЕНИЯ
          </span>
          <motion.span
            className="block mt-8 text-vw-blue"
            style={{ textShadow: '4px 4px 0 #24143a, 0 0 40px rgba(5,217,232,0.6)' }}
            animate={{ opacity: [1, 0.85, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FUGA!
          </motion.span>
        </motion.h1>

        <motion.p
          className="font-mono text-xl md:text-2xl text-pixel-text leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          С 19-летием, подруня! Желаю всего наилучшего в жизни,
          счастья, здоровья, деняг,{' '}
          <span className="text-vw-sun">петь реп в Ямайке</span>{' '}
          и <span className="text-vw-pink">курить шмаль</span>! 🇯🇲
        </motion.p>
      </div>

      {/* Scroll hint — прижат к самому низу экрана */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="font-pixel text-[10px] text-pixel-text-dim">
          ЛИСТАЙ ВНИЗ
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-vw-pink" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
