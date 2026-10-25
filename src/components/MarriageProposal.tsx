import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteConfig } from '../types';
import { Sparkles, X, Heart, Shield, Check, ArrowRight } from 'lucide-react';

interface MarriageProposalProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const MarriageProposal: React.FC<MarriageProposalProps> = ({ config, isOpen, onClose }) => {
  const { marriageProposal } = config;
  const [marriageStep, setMarriageStep] = useState<'intro' | 'question' | 'answered'>('intro');
  const [marriageChoice, setMarriageChoice] = useState<'yes' | 'no' | null>(null);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setMarriageStep('question');
  };

  const handleAnswer = (choice: 'yes' | 'no') => {
    setMarriageChoice(choice);
    setMarriageStep('answered');
  };

  const handleReset = () => {
    setMarriageStep('intro');
    setMarriageChoice(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Someday Future Chapter"
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95 backdrop-blur-2xl p-4 sm:p-6 overflow-y-auto"
    >
      <div className="relative max-w-2xl w-full my-8 luxury-card rounded-3xl p-8 sm:p-14 text-center border border-champagne/40 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Soft Spotlight in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-champagne/10 blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleReset}
          aria-label="Close chapter modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-midnight-light/80 border border-white/10 hover:border-champagne/40 text-ivory/60 hover:text-champagne transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ceremonial Subtle SVG Ring Outline */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-champagne" aria-hidden="true">
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="4 6"
                className="opacity-70 animate-spin"
                style={{ animationDuration: '30s' }}
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="#C58E98"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </svg>
            <Sparkles className="w-5 h-5 text-champagne absolute" />
          </div>
        </div>

        {/* Chapter Tag */}
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-champagne/80 block mb-3">
          {marriageProposal.chapterTag}
        </span>

        <AnimatePresence mode="wait">
          {/* STEP 1: PRELUDE */}
          {marriageStep === 'intro' && (
            <motion.div
              key="step-intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                {marriageProposal.prelude}
              </h3>

              <p className="font-sans text-sm sm:text-base text-ivory/80 leading-relaxed max-w-lg mx-auto font-light">
                {marriageProposal.transitionText}
              </p>

              <div className="pt-6">
                <button
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-champagne text-midnight font-sans text-xs uppercase tracking-widest font-medium hover:bg-champagne-light hover:scale-105 active:scale-95 transition-all shadow-lg"
                >
                  <span>Continue To Question</span>
                  <ArrowRight className="w-4 h-4 text-midnight" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: THE CEREMONIAL QUESTION */}
          {marriageStep === 'question' && (
            <motion.div
              key="step-question"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-rose-dusty mb-2">
                  A Gentle Question for Tomorrow
                </p>
                <h3 className="font-serif text-2xl sm:text-4xl text-gold-gradient font-normal tracking-wide">
                  {marriageProposal.question}
                </h3>
              </div>

              {/* Two Equal Accessible Choices */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                <button
                  onClick={() => handleAnswer('yes')}
                  className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-dusty via-champagne to-rose-blush text-midnight font-sans font-medium text-xs tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-midnight" />
                  <span>{marriageProposal.yesText}</span>
                </button>

                <button
                  onClick={() => handleAnswer('no')}
                  className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-midnight-light/90 border border-white/20 text-ivory/80 hover:text-ivory hover:border-white/40 text-xs font-sans tracking-wide transition-all"
                >
                  {marriageProposal.noText}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: RESPONSE */}
          {marriageStep === 'answered' && (
            <motion.div
              key="step-answered"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="w-12 h-12 rounded-full bg-champagne/20 border border-champagne/40 flex items-center justify-center mx-auto text-champagne">
                {marriageChoice === 'yes' ? (
                  <Heart className="w-6 h-6 fill-current text-rose-dusty" />
                ) : (
                  <Shield className="w-6 h-6 text-champagne" />
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                {marriageChoice === 'yes' ? "An Honest Beginning" : "Full Respect"}
              </h3>

              <p className="font-sans text-sm sm:text-base text-ivory/80 leading-relaxed max-w-md mx-auto font-light">
                {marriageChoice === 'yes'
                  ? marriageProposal.yesResponse
                  : marriageProposal.noResponse}
              </p>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-midnight-light border border-champagne/30 text-champagne text-xs uppercase tracking-widest font-sans hover:border-champagne transition-all"
                >
                  Close Chapter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clear Disclaimer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-[11px] font-sans text-ivory/40 leading-normal max-w-md mx-auto">
          {marriageProposal.disclaimer}
        </div>
      </div>
    </div>
  );
};
