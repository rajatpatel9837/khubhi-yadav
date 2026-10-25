import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '../types';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface RelationshipProposalProps {
  config: SiteConfig;
  answer: 'yes' | 'no' | null;
  onAnswer: (response: 'yes' | 'no') => void;
  onExploreNextChapter: () => void;
  onCloseLetter: () => void;
}

export const RelationshipProposal: React.FC<RelationshipProposalProps> = ({
  config,
  answer,
  onAnswer,
  onExploreNextChapter,
  onCloseLetter
}) => {
  const { proposal } = config;

  const handleYes = () => {
    onAnswer('yes');
    // Subtle luxury celebration: champagne, gold, and dusty rose particles
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#D0B58A', '#E4C8C7', '#C58E98', '#F7F1E8'],
        disableForReducedMotion: true
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  const handleNo = () => {
    onAnswer('no');
  };

  return (
    <section id="proposal" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Ambient soft rose & champagne backdrop light */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-rose-dusty/15 blur-[140px]" />
        <div className="w-[350px] h-[350px] rounded-full bg-champagne/10 blur-[100px]" />
      </div>

      <div className="relative z-10 luxury-card rounded-3xl p-8 sm:p-14 md:p-20 text-center border border-rose-dusty/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Animated Heart Outline Motif */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-rose-dusty overflow-visible"
              aria-hidden="true"
            >
              <motion.path
                d="M 50,30 C 50,15 30,10 20,25 C 10,40 25,65 50,85 C 75,65 90,40 80,25 C 70,10 50,15 50,30 Z"
                fill={answer === 'yes' ? 'rgba(197, 142, 152, 0.25)' : 'none'}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </svg>
            <Sparkles className="w-5 h-5 text-champagne absolute animate-pulse" />
          </div>
        </div>

        {/* Prelude */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-xl sm:text-2xl text-champagne-light mb-3"
        >
          {proposal.introPrompt}
        </motion.p>

        {/* Confession */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-gold-gradient font-light mb-6 tracking-wide"
        >
          “{proposal.confession}”
        </motion.h3>

        {/* Thoughtful explanation */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-sm sm:text-base md:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          {proposal.leadMessage}
        </motion.p>

        {/* The Central Question */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="py-6 px-8 rounded-2xl bg-midnight/80 border border-champagne/30 max-w-xl mx-auto mb-12 shadow-inner"
        >
          <span className="text-[11px] uppercase tracking-widest text-rose-dusty font-mono block mb-1">
            An Honest Invitation
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-normal tracking-wide">
            {proposal.question}
          </h2>
        </motion.div>

        {/* Action Buttons (Equal Accessibility) */}
        <AnimatePresence mode="wait">
          {answer === null && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-md mx-auto"
            >
              {/* YES BUTTON */}
              <button
                onClick={handleYes}
                className="w-full sm:w-1/2 py-4 px-6 rounded-full bg-gradient-to-r from-rose-dusty via-champagne to-rose-blush text-midnight font-sans font-medium text-xs sm:text-sm uppercase tracking-widest shadow-xl hover:shadow-[0_10px_30px_rgba(208,181,138,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-midnight" />
                <span>{proposal.yesButtonText}</span>
              </button>

              {/* EQUALLY ACCESSIBLE NO / NOT READY BUTTON */}
              <button
                onClick={handleNo}
                className="w-full sm:w-1/2 py-4 px-6 rounded-full bg-midnight-light/90 border border-white/20 text-ivory/80 hover:text-ivory hover:border-white/40 hover:bg-midnight font-sans font-normal text-xs sm:text-sm tracking-wider transition-all duration-300"
              >
                {proposal.noButtonText}
              </button>
            </motion.div>
          )}

          {/* YES RESPONSE VIEW */}
          {answer === 'yes' && (
            <motion.div
              key="yes-response"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-midnight/90 border border-champagne/40 max-w-xl mx-auto text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-dusty/20 border border-champagne/40 flex items-center justify-center mx-auto mb-4 text-champagne">
                <Heart className="w-6 h-6 fill-current text-rose-dusty" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-light mb-3">
                {proposal.yesResponse.title}
              </h4>
              <p className="font-sans text-sm text-ivory/80 leading-relaxed mb-6 font-light">
                {proposal.yesResponse.message}
              </p>
              <button
                onClick={onExploreNextChapter}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-champagne text-midnight font-sans text-xs uppercase tracking-widest font-medium hover:bg-champagne-light hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <span>{proposal.yesResponse.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-midnight" />
              </button>
            </motion.div>
          )}

          {/* NO / RESPECTFUL DECLINE RESPONSE VIEW */}
          {answer === 'no' && (
            <motion.div
              key="no-response"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-midnight/90 border border-white/20 max-w-xl mx-auto text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mx-auto mb-4 text-ivory/70">
                <ShieldCheck className="w-6 h-6 text-champagne" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-ivory font-light mb-3">
                {proposal.noResponse.title}
              </h4>
              <p className="font-sans text-sm text-ivory/80 leading-relaxed mb-6 font-light">
                {proposal.noResponse.message}
              </p>
              <button
                onClick={onCloseLetter}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-midnight-light border border-champagne/30 text-champagne font-sans text-xs uppercase tracking-widest font-medium hover:border-champagne hover:scale-105 active:scale-95 transition-all"
              >
                <span>{proposal.noResponse.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-champagne" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
