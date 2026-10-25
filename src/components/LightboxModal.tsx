import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  items: MemoryItem[];
  onSelectIndex: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  currentIndex,
  items,
  onSelectIndex,
}) => {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={currentItem.title}
        className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95 backdrop-blur-2xl p-4 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close photo lightbox"
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-midnight-light/80 border border-champagne/30 text-ivory hover:text-champagne hover:scale-105 active:scale-95 transition-all shadow-xl focus-visible:ring-2 focus-visible:ring-champagne"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-midnight-light/80 border border-champagne/30 text-ivory hover:text-champagne hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-midnight-light/80 border border-champagne/30 text-ivory hover:text-champagne hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Main Lightbox Frame */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl max-h-[88vh] flex flex-col items-center justify-center"
        >
          <div className="relative rounded-2xl overflow-hidden border border-champagne/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-h-[65vh] w-auto">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              onError={(e) => {
                // Graceful fallback if external link fails
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80";
              }}
              className="max-h-[65vh] max-w-full w-auto object-contain"
            />
            {/* Fine grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
          </div>

          {/* Editorial Caption Area */}
          <div className="mt-5 text-center max-w-lg px-4">
            <div className="flex items-center justify-center gap-3 text-xs font-mono text-champagne/80 mb-1.5">
              {currentItem.locationTag && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-dusty" />
                  {currentItem.locationTag}
                </span>
              )}
              {currentItem.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-rose-dusty" />
                  {currentItem.date}
                </span>
              )}
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-ivory font-light">
              {currentItem.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-ivory/70 mt-2 leading-relaxed">
              {currentItem.caption}
            </p>

            <div className="text-[11px] text-ivory/40 font-mono mt-3">
              {currentIndex + 1} of {items.length}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
