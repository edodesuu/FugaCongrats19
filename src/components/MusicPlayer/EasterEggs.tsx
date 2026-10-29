import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { clsx } from 'clsx';
import { devConsoleCommands } from '../../data/easterEggs';

export function EasterEggs({ titleClicks = 0 }: { titleClicks?: number }) {
  const [showDevConsole, setShowDevConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState('');
  const [creativeMode, setCreativeMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const achievementTriggered = useRef<Set<string>>(new Set());

  const addConsoleLine = (text: string, type: 'info' | 'success' | 'error' | 'system' = 'info') => {
    const prefix = {
      info: '[INFO]',
      success: '[OK]',
      error: '[ERROR]',
      system: '[SYS]',
    }[type];
    setConsoleOutput(prev => [...prev, `${prefix} ${text}`].slice(-50));
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addConsoleLine(`> ${cmd}`, 'system');

    if (trimmed === 'help()' || trimmed === 'help') {
      addConsoleLine('Доступные команды:', 'info');
      devConsoleCommands.forEach(c => {
        addConsoleLine(`  ${c.cmd.padEnd(20)} - ${c.desc}`, 'info');
      });
    } else if (trimmed === 'konami()') {
      addConsoleLine('Открываю секретное письмо...', 'success');
      (window as any).openKonamiLetter?.();
    } else if (trimmed === 'creative_mode()') {
      setCreativeMode(prev => !prev);
      addConsoleLine(`Creative Mode: ${!creativeMode ? 'ON' : 'OFF'}`, 'success');
    } else if (trimmed === 'spawn_diamond()') {
      addConsoleLine('💎 Алмаз заспавнен!', 'success');
      (window as any).spawnDiamond?.();
    } else if (trimmed === 'spawn_gold()') {
      addConsoleLine('💰 Золотой слиток заспавнен!', 'success');
      (window as any).spawnGold?.();
    } else if (trimmed === 'party_mode()') {
      setPartyMode(prev => !prev);
      addConsoleLine(`🎉 Party Mode: ${!partyMode ? 'ON' : 'OFF'}`, 'success');
    } else if (trimmed === 'credits()') {
      addConsoleLine('=== CREDITS ===', 'info');
      addConsoleLine('Concept & Code: Твой напарник по играм', 'info');
      addConsoleLine('Stack: React + Vite + Tailwind + Framer Motion', 'info');
      addConsoleLine('Music: Toby Fox, Серега Пират, KSB Music, Ария', 'info');
      addConsoleLine('Inspiration: Лучшая подруга на свете ❤️', 'info');
      addConsoleLine('================', 'info');
    } else if (trimmed === 'clear()' || trimmed === 'clear') {
      setConsoleOutput([]);
    } else if (trimmed) {
      addConsoleLine(`Неизвестная команда: ${cmd}. Введи help() для списка.`, 'error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(consoleInput);
      setConsoleInput('');
    }
  };

  // 50 кликов по заголовку секции → Creative Mode
  useEffect(() => {
    if (titleClicks === 50 && !achievementTriggered.current.has('creative_mode')) {
      achievementTriggered.current.add('creative_mode');
      setCreativeMode(true);
      addConsoleLine('Creative Mode активирован! (50 кликов по заголовку)', 'success');
    }
  }, [titleClicks]);

  // Expose functions globally
  useEffect(() => {
    (window as any).openKonamiLetter = () => {
      // Triggered by konami code
    };
    (window as any).spawnDiamond = () => {
      // Could trigger particle effect
    };
    (window as any).spawnGold = () => {
      // Could trigger particle effect
    };
  }, []);

  return (
    <>
      {/* Dev Console Toggle */}
      <motion.button
        className="fixed bottom-6 right-6 z-30 p-2 bg-pixel-card/90 border-2 border-pixel-border/50 hover:border-pixel-accent/50 backdrop-blur-sm rounded-[4px]"
        onClick={() => setShowDevConsole(!showDevConsole)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={showDevConsole ? 'Закрыть консоль' : 'Открыть консоль разработчика'}
        title="Dev Console (F12)"
      >
        <Terminal className={clsx('w-5 h-5 text-pixel-text-dim/50', showDevConsole && 'text-pixel-accent')} aria-hidden="true" />
      </motion.button>

      {/* Dev Console */}
      <AnimatePresence>
        {showDevConsole && (
          <motion.div
            className="fixed bottom-16 right-6 z-40 w-96 max-h-[50vh] bg-pixel-bg border-4 border-pixel-accent"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            role="dialog"
            aria-label="Консоль разработчика"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-pixel-card border-b-2 border-pixel-accent">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-pixel-accent" aria-hidden="true" />
                <span className="font-pixel text-sm text-pixel-accent">DEV CONSOLE</span>
                <span className="font-mono text-[10px] text-pixel-text-dim">v1.0.0</span>
              </div>
              <button
                className="p-1 text-pixel-text-dim hover:text-pixel-text transition-colors"
                onClick={() => setShowDevConsole(false)}
                aria-label="Закрыть консоль"
              >
                ✕
              </button>
            </div>

            {/* Output */}
            <div className="h-[35vh] overflow-y-auto p-3 font-mono text-[11px] text-pixel-text">
              {consoleOutput.length === 0 && (
                <div className="text-pixel-text-dim/50">
                  <p>С ДНЕМ РОЖДЕНИЯ ФУГАА. • Dev Console v1.0.0</p>
                  <p className="mt-2">Введи <span className="text-pixel-accent">help()</span> для списка команд</p>
                  <p className="mt-1">Клавиша <kbd className="px-1 bg-pixel-card border border-pixel-border">Tab</kbd> для автозаполнения</p>
                </div>
              )}
              {consoleOutput.map((line, index) => (
                <div key={index} className="select-none">
                  <span className={clsx(
                    line.startsWith('[OK]') ? 'text-vw-pink' :
                    line.startsWith('[ERROR]') ? 'text-vw-pink' :
                    line.startsWith('[SYS]') ? 'text-pixel-accent' :
                    'text-pixel-text-dim'
                  )}>
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t-2 border-pixel-accent p-3">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] text-pixel-accent">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={consoleInput}
                  onChange={e => setConsoleInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-pixel-text caret-pixel-accent"
                  placeholder="Введи команду..."
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Creative Mode Indicator */}
      {creativeMode && (
        <motion.div
          className="fixed top-20 left-6 z-30 px-3 py-1 bg-pixel-accent text-pixel-bg font-pixel text-[8px] border-2 border-pixel-accent shadow-glow-cyan"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎨 CREATIVE MODE
        </motion.div>
      )}

      {/* Party Mode Overlay */}
      {partyMode && (
        <motion.div
          className="fixed inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pixel-accent/10 via-transparent to-vw-sun2/10 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-pixel text-6xl md:text-8xl animate-bounce-pixel">🎉 PARTY MODE 🎉</span>
          </div>
        </motion.div>
      )}
    </>
  );
}