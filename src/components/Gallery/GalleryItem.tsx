import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { GalleryItem as GalleryItemType } from '../../data/gallery';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  onClick: (index: number) => void;
}

export function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => onClick(index)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(index)}
      tabIndex={0}
      role="button"
      aria-label={`Фото ${index + 1}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-pixel-bg border-4 border-vw-pink/40 shadow-glow-pink">
        <img
          src={item.src}
          alt={`Воспоминание ${index + 1}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 p-4 bg-pixel-card border-2 border-pixel-border">
            <Search className="w-6 h-6 text-pixel-accent" aria-hidden="true" />
            <span className="font-pixel text-xs text-pixel-text">ПОСМОТРЕТЬ</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
