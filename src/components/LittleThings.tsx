import React from 'react';
import { motion } from 'framer-motion';
import { LittleThingItem } from '../types';
import { HeartHandshake } from 'lucide-react';

interface LittleThingsProps {
  items: LittleThingItem[];
}

export const LittleThings: React.FC<LittleThingsProps> = ({ items }) => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-dusty/30 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-rose-blush mb-4 font-sans"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-champagne" />
          <span>Observations & Sincerity</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-light"
        >
          Little Things That Make Someone Special
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif italic text-base sm:text-lg text-champagne-light/90 mt-3 max-w-lg mx-auto"
        >
          “Kuch baatein chhoti hoti hain, par unka ehsaas bahut khoobsurat ho sakta hai.”
        </motion.p>
      </div>

      {/* Editorial Spread Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item, index) => {
          // Span 2 columns on the last card for an asymmetric, high-end editorial feel
          const isFeatured = index === 0 || index === 4;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`luxury-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative group ${
                isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Corner Chapter / Item Number */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="font-mono text-xs text-rose-dusty tracking-widest uppercase">
                  Note {item.number}
                </span>
                <span className="text-[10px] font-sans text-ivory/40 uppercase tracking-widest">
                  Genuine Thought
                </span>
              </div>

              {/* Observation Content */}
              <div>
                <span className="text-xs uppercase tracking-wider text-champagne/80 font-sans block mb-2 font-medium">
                  {item.prompt}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-rose-blush transition-colors leading-snug font-normal">
                  {item.observation}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ivory/70 mt-4 leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>

              {/* Bottom decorative line */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-end">
                <div className="w-8 h-[1px] bg-champagne/40 group-hover:w-16 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
