import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '../types';
import { Sparkles, ArrowDown } from 'lucide-react';

interface CinematicIntroProps {
  config: SiteConfig;
  isOpen: boolean;
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ config, isOpen, onEnter }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight overflow-hidden px-6"
        >
          {/* Subtle champagne radial spotlight */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-champagne/10 blur-[130px]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-rose-dusty/15 blur-[100px]" />
          </div>

          {/* Drifting luminous dust particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${(i * 19) % 100}vw`,
                  y: `${(i * 27) % 100}vh`,
                  opacity: 0.2 + (i % 5) * 0.12,
                  scale: 0.8 + (i % 3) * 0.4
                }}
                animate={{
                  y: ["-10px", "10px", "-10px"],
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 5 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-champagne-light shadow-[0_0_8px_rgba(208,181,138,0.8)]"
              />
            ))}
          </div>

          {/* Central Editorial Content */}
          <div className="relative max-w-3xl w-full mx-auto text-center flex flex-col items-center">
            {/* Small uppercase label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine/40 text-[11px] sm:text-xs tracking-[0.28em] uppercase text-champagne mb-8 font-sans"
            >
              <Sparkles className="w-3 h-3 text-rose-dusty animate-pulse" />
              <span>{config.opening.label}</span>
            </motion.div>

            {/* Two Names Reveal */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory tracking-wide font-normal"
              >
                {config.names.herFull}
              </motion.h2>

              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="font-serif italic text-2xl sm:text-3xl text-rose-dusty font-light"
              >
                ×
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory tracking-wide font-normal"
              >
                {config.names.himFull}
              </motion.h2>
            </div>

            {/* Central Title */}
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight sm:leading-none tracking-tight text-gold-gradient font-light uppercase">
                MILES APART,<br />
                <span className="italic tracking-normal text-rose-blush">HEART TO HEART</span>
              </h1>
            </motion.div>

            {/* Poetic Lines */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.8 }}
              className="space-y-2 mb-10 max-w-xl text-ivory/80 font-sans text-sm sm:text-base leading-relaxed"
            >
              <p className="font-serif italic text-lg sm:text-xl text-champagne/90">
                “{config.opening.quote1}”
              </p>
              <p className="text-ivory/70 text-xs sm:text-sm font-light">
                {config.opening.quote2}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onEnter}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-champagne via-rose-blush to-champagne text-midnight font-sans font-medium text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(208,181,138,0.25)] hover:shadow-[0_15px_35px_rgba(208,181,138,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>{config.opening.primaryCta}</span>
                <ArrowDown className="w-4 h-4 text-midnight group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onEnter}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-ivory/60 hover:text-champagne font-sans text-xs tracking-wider uppercase transition-colors"
              >
                {config.opening.secondaryCta}
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
