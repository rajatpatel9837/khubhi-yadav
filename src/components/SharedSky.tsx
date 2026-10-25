import React from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../types';
import { Sparkles, ArrowDown } from 'lucide-react';

interface SharedSkyProps {
  config: SiteConfig;
  onContinue: () => void;
}

export const SharedSky: React.FC<SharedSkyProps> = ({ config, onContinue }) => {
  const { sharedSky } = config;

  return (
    <section id="sky" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Chapter Tag */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4 font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-dusty" />
          <span>Atmospheric Horizon</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight font-light"
        >
          {sharedSky.title}
        </motion.h2>
      </div>

      {/* Atmospheric Continuous Celestial Canvas */}
      <div className="relative luxury-card rounded-3xl p-8 sm:p-14 md:p-16 border border-champagne/30 overflow-hidden shadow-2xl">
        {/* Subtle SVG Star Sky & Light Path */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyLightGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#C58E98" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#D0B58A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E4C8C7" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Bhagalpur celestial field (Left) */}
            {[...Array(24)].map((_, i) => (
              <circle
                key={`b-${i}`}
                cx={`${(i * 17) % 45}%`}
                cy={`${(i * 23 + 15) % 85}%`}
                r={1 + (i % 3) * 0.5}
                fill="#F7F1E8"
                opacity={0.3 + (i % 4) * 0.15}
              />
            ))}

            {/* Gurgaon celestial field (Right) */}
            {[...Array(24)].map((_, i) => (
              <circle
                key={`g-${i}`}
                cx={`${55 + ((i * 19) % 40)}%`}
                cy={`${(i * 29 + 10) % 85}%`}
                r={1 + (i % 3) * 0.5}
                fill="#FAF6F0"
                opacity={0.3 + (i % 4) * 0.15}
              />
            ))}

            {/* Subtle undulating light bridge joining the two skies */}
            <path
              d="M 50 180 Q 250 120 500 160 T 950 140"
              fill="none"
              stroke="url(#skyLightGradient)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="animate-route-travel opacity-70"
            />
          </svg>
        </div>

        {/* Labels & Comparison */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left mb-12">
          {/* Left City */}
          <div className="p-6 rounded-2xl bg-midnight/70 border border-rose-dusty/25">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-dusty">
              Eastern Horizon
            </span>
            <h3 className="font-serif text-2xl text-ivory mt-1">
              {sharedSky.himSkyLabel}
            </h3>
            <p className="font-sans text-xs text-ivory/60 mt-2">
              Under the quiet twilight of Bihar, where the Ganga flows softly past dusk.
            </p>
          </div>

          {/* Right City */}
          <div className="p-6 rounded-2xl bg-midnight/70 border border-champagne/25 text-center md:text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-champagne">
              Northern Horizon
            </span>
            <h3 className="font-serif text-2xl text-ivory mt-1">
              {sharedSky.herSkyLabel}
            </h3>
            <p className="font-sans text-xs text-ivory/60 mt-2">
              Under the starry canopy of the National Capital Region, where dreams stay awake late.
            </p>
          </div>
        </div>

        {/* Core Poetic Quote */}
        <div className="relative z-10 text-center max-w-2xl mx-auto pt-6 border-t border-white/10">
          <p className="font-serif italic text-lg sm:text-2xl text-champagne-light leading-relaxed">
            “{sharedSky.quote}”
          </p>
          <p className="text-[11px] font-sans text-ivory/40 mt-3 uppercase tracking-widest">
            A symbolic visualization of one shared night
          </p>
        </div>

        {/* Continue CTA */}
        <div className="relative z-10 mt-10 text-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-aubergine-light border border-champagne/30 text-champagne hover:border-champagne hover:scale-105 active:scale-95 text-xs font-sans uppercase tracking-widest transition-all"
          >
            <span>{sharedSky.ctaText}</span>
            <ArrowDown className="w-4 h-4 text-champagne" />
          </button>
        </div>
      </div>
    </section>
  );
};
