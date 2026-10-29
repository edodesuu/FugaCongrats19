import { motion } from 'framer-motion';
import { Music, Gamepad2, Heart } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'gallery', label: 'ГАЛЕРЕЯ', icon: Gamepad2 },
    { id: 'greetings', label: 'ПОЗДРАВЛЕНИЯ', icon: Heart },
    { id: 'music', label: 'МУЗЫКА', icon: Music },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-8 bg-pixel-bg/95 backdrop-blur-md border-b border-vw-purple/25 shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate?.('home')}
          whileTap={{ scale: 0.95 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate?.('home')}
          aria-label="На главную"
        >
          <span className="text-3xl md:text-4xl" aria-hidden="true">
            🎂
          </span>
          <span className="font-pixel text-sm md:text-base text-pixel-text hidden md:block">
            С ДНЕМ РОЖДЕНИЯ ФУГАА.
          </span>
          <span className="font-pixel text-xs md:hidden text-pixel-text">
            ФУГАА 🎂
          </span>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Основная навигация">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className="flex items-center gap-2 font-pixel text-xs text-pixel-text-dim hover:text-pixel-accent transition-colors px-3 py-2 rounded-[4px] hover:bg-pixel-card border border-transparent hover:border-pixel-border"
              onClick={() => onNavigate?.(item.id)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              aria-label={item.label}
            >
              <item.icon className="w-4 h-4" aria-hidden="true" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 btn-pixel-ghost"
          aria-label="Открыть меню"
          aria-expanded="false"
        >
          <Gamepad2 className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}