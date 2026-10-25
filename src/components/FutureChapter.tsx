import React from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../types';
import { Sparkles, Sun, Compass, HeartHandshake, Eye } from 'lucide-react';

interface FutureChapterProps {
  config: SiteConfig;
  onOpenFutureMarriage: () => void;
}

export const FutureChapter: React.FC<FutureChapterProps> = ({ config, onOpenFutureMarriage }) => {
  const { futureChapter } = config;

  return (
    <section id="future" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4 font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-dusty" />
          <span>A Gentle Horizon</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-light"
        >
          {futureChapter.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif italic text-base sm:text-xl text-champagne-light mt-4 max-w-xl mx-auto"
        >
          “{futureChapter.quote1}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-sans text-xs sm:text-sm text-ivory/70 mt-3 max-w-lg mx-auto leading-relaxed font-light"
        >
          {futureChapter.quote2}
        </motion.p>
      </div>

      {/* Three Grounded Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {futureChapter.pillars.map((pillar, idx) => {
          const icons = [Sun, Compass, HeartHandshake];
          const Icon = icons[idx % icons.length];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="luxury-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-aubergine-dark border border-champagne/30 flex items-center justify-center text-champagne mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-rose-dusty" />
                </div>

                <span className="text-[11px] font-mono uppercase tracking-widest text-champagne/70 block mb-1">
                  Pillar 0{idx + 1}
                </span>

                <h3 className="font-serif text-2xl text-ivory font-light mb-1 group-hover:text-champagne transition-colors">
                  {pillar.title}
                </h3>

                <h4 className="font-sans text-xs uppercase tracking-wider text-rose-blush mb-4 font-medium">
                  {pillar.subtitle}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] uppercase font-mono text-ivory/40">
                Grounding & Freedom
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Discreet Option for Someday Marriage Thought (Stage Two Optional) */}
      <div className="text-center p-8 rounded-3xl bg-midnight-light/40 border border-white/10 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase tracking-widest text-ivory/40 font-mono block mb-2">
          An Optional Distant Concept
        </span>
        <h4 className="font-serif text-xl sm:text-2xl text-ivory/90 mb-3 font-light">
          A Glimpse Into A Distant Chapter
        </h4>
        <p className="text-xs text-ivory/60 max-w-md mx-auto leading-relaxed mb-6 font-sans">
          A separate, unpressured thought meant only for a time when two people have journeyed far enough together to dream of forever.
        </p>
        <button
          onClick={onOpenFutureMarriage}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-aubergine-dark border border-champagne/30 text-champagne hover:border-champagne hover:text-champagne-light text-xs uppercase tracking-widest font-sans transition-all active:scale-95"
        >
          <Eye className="w-3.5 h-3.5 text-rose-dusty" />
          <span>View Someday Concept</span>
        </button>
      </div>
    </section>
  );
};
