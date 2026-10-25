import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PoemItem } from '../types';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Feather } from 'lucide-react';

interface PoetryCollectionProps {
  poems: PoemItem[];
}

export const PoetryCollection: React.FC<PoetryCollectionProps> = ({ poems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPoem = poems[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % poems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + poems.length) % poems.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  return (
    <section id="poetry" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Chapter Title */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4">
          <BookOpen className="w-3.5 h-3.5 text-rose-dusty" />
          <span>Literary Journal</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight font-light">
          Thode Alfaaz, Dil Se
        </h2>
        <p className="font-sans text-xs sm:text-sm text-ivory/60 mt-3">
          Original Hinglish shayari written between Bhagalpur and Gurgaon.
        </p>
      </div>

      {/* Literary Journal Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPoem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl p-8 sm:p-14 md:p-16 letter-paper-texture text-charcoal shadow-2xl border border-champagne/40 overflow-hidden"
          >
            {/* Subtle corner flourish or watermark */}
            <div className="absolute top-6 right-8 text-rose-dusty/20 font-serif text-6xl select-none pointer-events-none italic">
              ❦
            </div>

            {/* Header of Literary Page */}
            <div className="flex items-center justify-between border-b border-charcoal/15 pb-5 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-charcoal/60">
                  {currentPoem.chapter}
                </span>
                <span className="text-charcoal/30">•</span>
                <span className="font-sans text-xs uppercase tracking-wider text-rose-deep font-medium">
                  {currentPoem.theme}
                </span>
              </div>
              <div className="text-xs font-mono text-charcoal/50">
                Page {currentIndex + 1} of {poems.length}
              </div>
            </div>

            {/* Poem Title */}
            <h3 className="font-serif text-2xl sm:text-3xl text-aubergine-dark mb-8 font-normal tracking-wide">
              {currentPoem.title}
            </h3>

            {/* Poem Couplets */}
            <div className="space-y-4 my-8 font-serif text-xl sm:text-2xl md:text-3xl text-aubergine-dark/95 leading-relaxed tracking-wide">
              {currentPoem.lines.map((line, idx) => {
                // Highlight Khubi or Rajat if present
                const parts = line.split(/(Khubi|Rajat)/g);
                return (
                  <p key={idx} className="transition-all duration-300">
                    {parts.map((part, pIdx) => {
                      if (part === "Khubi") {
                        return (
                          <span key={pIdx} className="text-rose-deep font-semibold underline decoration-rose-dusty/40 underline-offset-4">
                            Khubi
                          </span>
                        );
                      }
                      if (part === "Rajat") {
                        return (
                          <span key={pIdx} className="text-aubergine font-semibold">
                            Rajat
                          </span>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>

            {/* Handwritten annotation by Rajat */}
            <div className="mt-10 pt-6 border-t border-charcoal/10 flex items-center gap-3">
              <Feather className="w-4 h-4 text-rose-deep shrink-0" />
              <p className="font-handwriting text-xl sm:text-2xl text-aubergine-dark/80 tracking-wide">
                {currentPoem.annotation}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gallery Navigation Controls */}
        <div className="flex items-center justify-between mt-8 px-2">
          <button
            onClick={handlePrev}
            aria-label="Previous poem"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight-light border border-champagne/25 text-xs text-ivory hover:text-champagne hover:border-champagne/60 transition-all active:scale-95 shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-sans uppercase tracking-wider hidden sm:inline">Pichhla Alfaaz</span>
          </button>

          {/* Quick Pagination Dots */}
          <div className="flex items-center gap-2">
            {poems.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to poem ${idx + 1}`}
                className={`transition-all rounded-full ${
                  currentIndex === idx
                    ? 'w-7 h-2 bg-champagne'
                    : 'w-2 h-2 bg-ivory/30 hover:bg-ivory/60'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              aria-label="Read poems again from beginning"
              className="p-2.5 rounded-full bg-midnight-light border border-champagne/25 text-ivory/60 hover:text-champagne transition-all"
              title="Pehla Alfaaz (Read Again)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next poem"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-midnight-light border border-champagne/25 text-xs text-ivory hover:text-champagne hover:border-champagne/60 transition-all active:scale-95 shadow-md"
            >
              <span className="font-sans uppercase tracking-wider hidden sm:inline">Agla Alfaaz</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
