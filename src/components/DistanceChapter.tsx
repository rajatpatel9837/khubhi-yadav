import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '../types';
import { MessageSquareHeart, HeartHandshake, Sparkles, X, BookOpen, Compass } from 'lucide-react';

interface DistanceChapterProps {
  config: SiteConfig;
}

export const DistanceChapter: React.FC<DistanceChapterProps> = ({ config }) => {
  const { distanceChapter } = config;
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <section id="distance" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Chapter Tag */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4 font-sans"
        >
          <Compass className="w-3.5 h-3.5 text-rose-dusty" />
          <span>Long-Distance Understanding</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-light"
        >
          {distanceChapter.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif italic text-base sm:text-lg text-champagne-light mt-4 max-w-xl mx-auto"
        >
          “{distanceChapter.quote1}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans text-xs sm:text-sm text-ivory/60 mt-2 max-w-lg mx-auto leading-relaxed"
        >
          {distanceChapter.quote2}
        </motion.p>
      </div>

      {/* Three Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {distanceChapter.cards.map((card, idx) => {
          const icons = [MessageSquareHeart, Sparkles, HeartHandshake];
          const Icon = icons[idx % icons.length];

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="luxury-card rounded-3xl p-8 flex flex-col justify-between group hover:border-champagne/40 transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-aubergine border border-champagne/25 flex items-center justify-center text-champagne mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-rose-dusty" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-champagne/80 block mb-1">
                  {card.tag}
                </span>
                <h3 className="font-serif text-2xl text-ivory font-normal mb-3 group-hover:text-champagne transition-colors">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] uppercase font-mono text-ivory/40 tracking-wider">
                Mutual respect & rhythm
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button: "Read a Little Note" */}
      <div className="text-center">
        <button
          onClick={() => setIsNoteOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-midnight-light border border-champagne/30 text-champagne font-sans text-xs uppercase tracking-widest font-medium hover:border-champagne hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          <BookOpen className="w-4 h-4 text-rose-dusty" />
          <span>{distanceChapter.noteButtonText}</span>
        </button>
      </div>

      {/* Personalized Note Modal */}
      <AnimatePresence>
        {isNoteOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="A gentle perspective on distance"
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-xl w-full letter-paper-texture rounded-3xl p-8 sm:p-12 text-charcoal shadow-2xl border border-champagne/40"
            >
              <button
                onClick={() => setIsNoteOpen(false)}
                aria-label="Close note"
                className="absolute top-6 right-6 p-2 rounded-full bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-deep block mb-1">
                Personal Reflection
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-aubergine-dark mb-6">
                {distanceChapter.noteModal.title}
              </h3>

              <div className="space-y-4 font-serif text-lg sm:text-xl text-charcoal/90 leading-relaxed">
                {distanceChapter.noteModal.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-charcoal/15 text-right font-handwriting text-2xl sm:text-3xl text-rose-deep">
                {distanceChapter.noteModal.signature}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
