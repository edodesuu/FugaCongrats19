import { motion } from 'framer-motion';
import { Heart, Gamepad2, Music, Coffee } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const easterEggItems = [
    { icon: Heart, label: 'Сделано с любовью', delay: 0 },
    { icon: Gamepad2, label: 'И вдохновлено играми', delay: 0.1 },
    { icon: Music, label: 'Toby Fox • Серега Пират • KSB • Ария', delay: 0.2 },
    { icon: Coffee, label: 'И большим количеством кофе', delay: 0.3 },
  ];

  return (
    <footer className="relative px-4 py-12 md:px-8 border-t border-pixel-border">
      <div className="max-w-7xl mx-auto">
        {/* Easter egg clickable area - hidden in footer */}
        <motion.div
          className="absolute bottom-4 right-4 w-8 h-8 cursor-help opacity-0 hover:opacity-100 transition-opacity"
          whileHover={{ rotate: 360, scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          title="Ты нашел секрет! 🎮"
          aria-label="Секретная область"
        >
          <Gamepad2 className="w-full h-full text-pixel-accent/30" aria-hidden="true" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <motion.p
            className="font-mono text-xs text-pixel-text-dim text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} С ДНЕМ РОЖДЕНИЯ ФУГАА. • Не коммерческий проект • Для лучшей подруги
          </motion.p>

          {/* Center: Easter egg hints */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {easterEggItems.map((item) => (
              <motion.span
                key={item.label}
                className="flex items-center gap-1 font-mono text-xs text-pixel-text-dim/60"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + item.delay }}
              >
                <item.icon className="w-3 h-3" aria-hidden="true" />
                {item.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Right: Tech stack */}
          <motion.div
            className="flex items-center gap-3 text-center md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className="font-pixel text-xs text-pixel-text-dim">СТЕК:</span>
            <span className="font-mono text-xs text-pixel-text-dim/60">React + Vite + Tailwind</span>
            <span className="font-pixel text-xs text-pixel-accent">+ Framer Motion</span>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-pixel-border to-transparent mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          aria-hidden="true"
        />

        {/* Konami code hint - very subtle */}
        <motion.p
          className="absolute bottom-2 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-pixel-text-dim/20 text-center pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
          aria-hidden="true"
        >
          ↑ ↑ ↓ ↓ ← → ← → B A
        </motion.p>
      </div>
    </footer>
  );
}