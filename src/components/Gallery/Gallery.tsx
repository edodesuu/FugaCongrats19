import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { galleryItems } from '../../data/gallery';
import { GalleryItem } from './GalleryItem';
import { Lightbox } from './Lightbox';

export function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleItemClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    setLightboxIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : galleryItems.length - 1;
      } else {
        return prev < galleryItems.length - 1 ? prev + 1 : 0;
      }
    });
  }, []);

  return (
    <section id="gallery" className="section-container">
      {/* Header */}
      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title font-pixel text-2xl md:text-3xl lg:text-4xl">
          ГАЛЕРЕЯ ВОСПОМИНАНИЙ
        </h2>
        <p className="text-center font-mono text-pixel-text-dim mt-4 max-w-2xl mx-auto">
          Каждый ДР потерянный год, усеянный воспоминаниями.
          Это те из них которые я успел запечатлить.
        </p>
      </motion.header>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        role="list"
        aria-label="Галерея воспоминаний"
      >
        {galleryItems.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            index={index}
            onClick={handleItemClick}
          />
        ))}
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        items={galleryItems}
        onClose={() => setLightboxOpen(false)}
        onNavigate={navigateLightbox}
      />

      {/* Hint */}
      <motion.p
        className="text-center mt-10 font-pixel text-[10px] text-pixel-text-dim/40 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Кликни на фото, чтобы увеличить • Стрелки для навигации • Esc для закрытия
      </motion.p>
    </section>
  );
}
