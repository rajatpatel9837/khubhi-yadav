import React from 'react';
import { motion } from 'framer-motion';
import { SiteConfig } from '../types';
import { Mail, ArrowDown } from 'lucide-react';

interface PersonalLetterProps {
  config: SiteConfig;
  onNext: () => void;
}

export const PersonalLetter: React.FC<PersonalLetterProps> = ({ config, onNext }) => {
  const { letter } = config;

  return (
    <section id="letter" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Chapter Tag */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-dusty/30 bg-midnight-light/60 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-rose-blush mb-4"
        >
          <Mail className="w-3.5 h-3.5 text-champagne" />
          <span>A Personal Letter</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight font-light"
        >
          {letter.title}
        </motion.h2>
      </div>

      {/* Luxury Letter Paper Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="letter-paper-texture rounded-3xl p-8 sm:p-14 md:p-16 text-charcoal shadow-2xl border border-champagne/30 relative"
      >
        {/* Subtle decorative stamp / seal motif */}
        <div className="absolute top-8 right-8 w-16 h-16 rounded-full border border-rose-dusty/40 flex items-center justify-center p-1 opacity-70 pointer-events-none select-none">
          <div className="w-full h-full rounded-full border border-dashed border-rose-dusty/60 flex flex-col items-center justify-center text-[8px] uppercase tracking-tighter font-mono text-rose-deep">
            <span>IIIT • GGN</span>
            <span>2026</span>
          </div>
        </div>

        {/* Letter Paragraphs with refined reading typography */}
        <div className="space-y-6 font-serif text-lg sm:text-xl md:text-2xl text-aubergine-dark/95 leading-relaxed tracking-wide max-w-2xl">
          {letter.paragraphs.map((para, index) => {
            // Emphasize the core line "Mujhe tum achhi lagti ho."
            const isHighlight = para.includes("Mujhe tum achhi lagti ho");
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`${
                  isHighlight
                    ? "font-serif italic text-2xl sm:text-3xl text-rose-deep font-semibold my-6 py-2 border-l-2 border-rose-dusty pl-4"
                    : index === 0
                    ? "font-serif text-2xl text-aubergine font-medium"
                    : ""
                }`}
              >
                {para}
              </motion.p>
            );
          })}
        </div>

        {/* Handwritten Signature */}
        <div className="mt-12 pt-8 border-t border-charcoal/15 flex flex-col items-end">
          <span className="text-xs font-sans uppercase tracking-widest text-charcoal/60">
            With quiet sincerity,
          </span>
          <span className="font-handwriting text-3xl sm:text-4xl text-rose-deep font-normal mt-1">
            {letter.signature}
          </span>
          <span className="text-[11px] font-mono text-charcoal/50 mt-1">
            Bhagalpur, Bihar
          </span>
        </div>
      </motion.div>

      {/* Button to proceed: "There's Something Else" */}
      <div className="mt-12 text-center">
        <button
          onClick={onNext}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-aubergine-light border border-champagne/30 text-champagne hover:bg-aubergine hover:border-champagne text-xs uppercase tracking-widest font-sans transition-all active:scale-95 shadow-xl hover:shadow-[0_10px_25px_rgba(208,181,138,0.2)]"
        >
          <span>{letter.buttonText}</span>
          <ArrowDown className="w-4 h-4 text-champagne group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
