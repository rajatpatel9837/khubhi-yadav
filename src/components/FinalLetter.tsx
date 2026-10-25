import React from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../types';
import { RotateCcw, Heart, Feather } from 'lucide-react';

interface FinalLetterProps {
  config: SiteConfig;
  onReplay: () => void;
}

export const FinalLetter: React.FC<FinalLetterProps> = ({ config, onReplay }) => {
  const { finalLetter } = config;

  return (
    <section id="closing" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Chapter Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4 font-sans"
      >
        <Feather className="w-3.5 h-3.5 text-rose-dusty" />
        <span>Closing Words</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-light mb-12"
      >
        {finalLetter.title}
      </motion.h2>

      {/* Warm Parchment Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="letter-paper-texture rounded-3xl p-8 sm:p-14 md:p-16 text-charcoal shadow-2xl border border-champagne/40 max-w-2xl mx-auto text-left relative"
      >
        <div className="space-y-5 font-serif text-lg sm:text-xl md:text-2xl text-aubergine-dark/95 leading-relaxed tracking-wide">
          {finalLetter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-10 pt-6 border-t border-charcoal/15 flex flex-col items-end">
          <span className="font-sans text-xs uppercase tracking-widest text-charcoal/50">
            Always sincerely,
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-rose-deep font-normal mt-1">
            {finalLetter.signature}
          </span>
        </div>
      </motion.div>

      {/* Footer Note & Replay */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-16 flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-serif italic text-champagne-light">
          <span>{finalLetter.footerNote}</span>
          <Heart className="w-3.5 h-3.5 text-rose-dusty fill-current" />
        </div>

        <button
          onClick={onReplay}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-midnight-light border border-champagne/30 text-champagne hover:border-champagne hover:scale-105 active:scale-95 text-xs font-sans uppercase tracking-widest transition-all shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-dusty group-hover:-rotate-90 transition-transform duration-300" />
          <span>{finalLetter.replayText}</span>
        </button>

        <p className="text-[11px] font-sans text-ivory/30 max-w-xs text-center">
          Created with utmost respect and admiration. Private link for Khubi Yadav.
        </p>
      </motion.div>
    </section>
  );
};
