import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem as GalleryItemType } from '../../data/gallery';

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItemType[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function Lightbox({ isOpen, currentIndex, items, onClose, onNavigate }: LightboxProps) {
  const currentItem = items[currentIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
    }
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Фото ${currentIndex + 1} из ${items.length}`}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            className="absolute -top-12 right-0 z-10 p-2 bg-pixel-card border-2 border-pixel-border hover:bg-pixel-border transition-colors rounded-[4px]"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Закрыть (Esc)"
          >
            <X className="w-6 h-6 text-pixel-text" aria-hidden="true" />
          </motion.button>

          {/* Navigation - Previous */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-pixel-card/90 border-2 border-pixel-border hover:bg-pixel-border transition-colors rounded-[4px] md:p-4"
            onClick={() => onNavigate('prev')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Предыдущее"
          >
            <ChevronLeft className="w-8 h-8 text-pixel-text" aria-hidden="true" />
          </motion.button>

          {/* Navigation - Next */}
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-pixel-card/90 border-2 border-pixel-border hover:bg-pixel-border transition-colors rounded-[4px] md:p-4"
            onClick={() => onNavigate('next')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Следующее"
          >
            <ChevronRight className="w-8 h-8 text-pixel-text" aria-hidden="true" />
          </motion.button>

          {/* Image */}
          <img
            src={currentItem.src}
            alt={`Воспоминание ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain border-4 border-vw-pink/60 shadow-vw-inset"
          />

          {/* Counter */}
          <div className="mt-4 text-center">
            <span className="font-pixel text-xs text-pixel-text-dim">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
