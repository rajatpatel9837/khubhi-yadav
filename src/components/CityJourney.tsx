import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { SiteConfig } from '../types';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface CityJourneyProps {
  config: SiteConfig;
}

export const CityJourney: React.FC<CityJourneyProps> = ({ config }) => {
  const { him, her, approxDistanceKm, distanceNote } = config.locations;
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!compassRef.current) return;
    const tween = gsap.to(compassRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="cities" className="relative py-16 sm:py-32 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-champagne/20 bg-midnight-light/60 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4"
        >
          <div ref={compassRef} className="inline-flex">
            <Compass className="w-3.5 h-3.5 text-rose-dusty" />
          </div>
          <span>Geography & Connection</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-light"
        >
          {config.twoCities.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-xs sm:text-base text-ivory/60 mt-3 sm:mt-4 max-w-xl mx-auto leading-relaxed"
        >
          {config.supportingTagline}
        </motion.p>
      </div>

      {/* Main Stylized Map Canvas / Route Display */}
      <div className="relative luxury-card rounded-2xl sm:rounded-3xl p-4 sm:p-10 md:p-14 overflow-hidden border border-champagne/20">
        {/* Subtle background grid lines for cartographic elegance */}
        <div className="absolute inset-0 bg-[radial-gradient(#d0b58a10_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {/* Top bar with distance and verified note */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 text-xs font-sans text-ivory/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-dusty animate-pulse" />
            <span className="uppercase tracking-widest text-champagne">Estimated Distance</span>
            <span className="font-serif text-lg text-ivory font-medium">~{approxDistanceKm.toLocaleString()} KM</span>
          </div>
          <div className="text-[11px] text-ivory/50 italic">
            {distanceNote}
          </div>
        </div>

        {/* Desktop / Tablet Map Visualization (Stylized North/East India Corridor) */}
        <div className="relative w-full aspect-[2/1] min-h-[320px] max-h-[460px] hidden md:block">
          <svg
            viewBox="0 0 900 450"
            className="w-full h-full overflow-visible"
            aria-label="Stylized map showing route from Bhagalpur to Gurgaon"
          >
            <defs>
              <linearGradient id="routeGradient" x1="100%" y1="60%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#C58E98" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#D0B58A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#E4C8C7" stopOpacity="0.9" />
              </linearGradient>

              <filter id="glowMarker" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Stylized Northern / Gangetic plain geographical outline curves */}
            <path
              d="M 120 180 Q 250 140 400 170 T 780 230"
              fill="none"
              stroke="#29262B"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="opacity-40"
            />
            <path
              d="M 180 250 Q 380 210 560 260 T 820 310"
              fill="none"
              stroke="#241923"
              strokeWidth="1"
              strokeDasharray="2 4"
              className="opacity-40"
            />

            {/* Route Curve from Bhagalpur (Right/East: x=720, y=280) to Gurgaon (Left/West: x=240, y=140) */}
            {/* Background static trajectory */}
            <path
              d="M 720 280 C 560 320, 380 220, 240 140"
              fill="none"
              stroke="rgba(208, 181, 138, 0.2)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Animated traveling dash line from Bhagalpur towards Gurgaon */}
            <path
              d="M 720 280 C 560 320, 380 220, 240 140"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="8 12"
              className="animate-route-travel"
            />

            {/* Midpoint Label along the path */}
            <g transform="translate(460, 230)">
              <rect x="-65" y="-14" width="130" height="24" rx="12" fill="#181a24" stroke="rgba(208,181,138,0.3)" />
              <text x="0" y="2" textAnchor="middle" fill="#E4C8C7" fontSize="10" fontFamily="DM Sans" letterSpacing="1.5">
                NORTHERN CORRIDOR
              </text>
            </g>

            {/* BHAGALPUR Point (Rajat - Start of journey line) */}
            <g transform="translate(720, 280)" className="cursor-pointer">
              {/* Pulsing ring */}
              <circle r="22" fill="none" stroke="#C58E98" strokeWidth="1" opacity="0.4" className="animate-ping" />
              <circle r="12" fill="#241923" stroke="#C58E98" strokeWidth="2" filter="url(#glowMarker)" />
              <circle r="5" fill="#FAF6F0" />
              
              {/* Bhagalpur Label Card */}
              <g transform="translate(20, -10)">
                <rect x="0" y="-30" width="170" height="64" rx="8" fill="#101117" stroke="rgba(197, 142, 152, 0.4)" strokeWidth="1" />
                <text x="12" y="-12" fill="#FAF6F0" fontSize="13" fontFamily="Cormorant Garamond" fontWeight="bold">
                  BHAGALPUR, BIHAR
                </text>
                <text x="12" y="4" fill="#C58E98" fontSize="10" fontFamily="DM Sans">
                  IIIT Bhagalpur Campus
                </text>
                <text x="12" y="20" fill="rgba(247, 241, 232, 0.5)" fontSize="9" fontFamily="DM Sans">
                  25.2425° N, 86.9842° E
                </text>
              </g>
            </g>

            {/* GURGAON Point (Khubi - Destination of journey line) */}
            <g transform="translate(240, 140)" className="cursor-pointer">
              {/* Pulsing ring */}
              <circle r="24" fill="none" stroke="#D0B58A" strokeWidth="1" opacity="0.4" className="animate-ping" />
              <circle r="14" fill="#241923" stroke="#D0B58A" strokeWidth="2" filter="url(#glowMarker)" />
              <circle r="6" fill="#FAF6F0" />

              {/* Gurgaon Label Card */}
              <g transform="translate(-185, -20)">
                <rect x="0" y="-30" width="170" height="64" rx="8" fill="#101117" stroke="rgba(208, 181, 138, 0.4)" strokeWidth="1" />
                <text x="12" y="-12" fill="#FAF6F0" fontSize="13" fontFamily="Cormorant Garamond" fontWeight="bold">
                  GURGAON, HARYANA
                </text>
                <text x="12" y="4" fill="#D0B58A" fontSize="10" fontFamily="DM Sans">
                  Where Khubi calls home
                </text>
                <text x="12" y="20" fill="rgba(247, 241, 232, 0.5)" fontSize="9" fontFamily="DM Sans">
                  28.4595° N, 77.0266° E
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Mobile Vertical Journey Illustration */}
        <div className="md:hidden flex flex-col gap-6 py-4 relative">
          <div className="absolute left-3.5 top-8 bottom-8 w-[2px] bg-gradient-to-b from-rose-dusty via-champagne to-rose-blush" />

          {/* Bhagalpur Node */}
          <div className="relative flex items-start gap-3 pl-8">
            <div className="absolute left-3.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-aubergine border-2 border-rose-dusty flex items-center justify-center shadow-[0_0_12px_rgba(197,142,152,0.8)]">
              <div className="w-1.5 h-1.5 rounded-full bg-ivory" />
            </div>
            <div className="p-3.5 rounded-xl bg-midnight-light/80 border border-rose-dusty/30 w-full">
              <span className="text-[9px] uppercase tracking-widest text-rose-dusty font-mono">Origin</span>
              <h3 className="font-serif text-lg text-ivory font-medium mt-0.5">{him.city}, {him.state}</h3>
              <p className="text-xs text-ivory/80 font-sans mt-0.5">{him.label}</p>
              <p className="text-[9px] text-ivory/50 mt-1 font-mono">25.2425° N, 86.9842° E</p>
              <p className="text-xs text-ivory/70 mt-2 italic font-serif border-t border-white/5 pt-1.5 leading-relaxed">
                “{him.description}”
              </p>
            </div>
          </div>

          {/* Distance Indicator Badge */}
          <div className="relative pl-8 my-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-aubergine-dark border border-champagne/30 text-[10px] sm:text-xs font-mono text-champagne">
              <Navigation className="w-3 h-3 rotate-45 text-rose-dusty" />
              <span>~{approxDistanceKm} KM Across North India</span>
            </div>
          </div>

          {/* Gurgaon Node */}
          <div className="relative flex items-start gap-3 pl-8">
            <div className="absolute left-3.5 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-aubergine border-2 border-champagne flex items-center justify-center shadow-[0_0_12px_rgba(208,181,138,0.8)]">
              <div className="w-1.5 h-1.5 rounded-full bg-champagne-light" />
            </div>
            <div className="p-3.5 rounded-xl bg-midnight-light/80 border border-champagne/30 w-full">
              <span className="text-[9px] uppercase tracking-widest text-champagne font-mono">Destination of Thoughts</span>
              <h3 className="font-serif text-lg text-ivory font-medium mt-0.5">{her.city}, {her.state}</h3>
              <p className="text-xs text-ivory/80 font-sans mt-0.5">{her.label}</p>
              <p className="text-[9px] text-ivory/50 mt-1 font-mono">28.4595° N, 77.0266° E</p>
              <p className="text-xs text-ivory/70 mt-2 italic font-serif border-t border-white/5 pt-1.5 leading-relaxed">
                “{her.description}”
              </p>
            </div>
          </div>
        </div>

        {/* City Details Cards (Desktop / Tablet) */}
        <div className="hidden md:grid grid-cols-2 gap-8 mt-10 border-t border-white/10 pt-8">
          <div className="p-6 rounded-2xl bg-midnight-light/50 border border-rose-dusty/20">
            <div className="flex items-center gap-2 text-rose-dusty text-xs font-mono uppercase tracking-widest mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Where Rajat Lives</span>
            </div>
            <h3 className="font-serif text-2xl text-ivory">{him.city}, {him.state}</h3>
            <p className="text-xs text-champagne font-sans mt-1">{him.label}</p>
            <p className="text-sm text-ivory/70 mt-3 font-serif italic leading-relaxed">
              {him.description}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-light/50 border border-champagne/20">
            <div className="flex items-center gap-2 text-champagne text-xs font-mono uppercase tracking-widest mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Where Khubi Lives</span>
            </div>
            <h3 className="font-serif text-2xl text-ivory">{her.city}, {her.state}</h3>
            <p className="text-xs text-rose-blush font-sans mt-1">{her.label}</p>
            <p className="text-sm text-ivory/70 mt-3 font-serif italic leading-relaxed">
              {her.description}
            </p>
          </div>
        </div>

        {/* Poetic Under-Map Quotes */}
        <div className="mt-12 text-center max-w-2xl mx-auto space-y-3 border-t border-champagne/15 pt-8">
          <p className="font-serif text-xl sm:text-2xl text-champagne-light italic font-light">
            “{config.twoCities.quote1}”
          </p>
          <p className="text-sm sm:text-base text-ivory/80 font-sans leading-relaxed">
            {config.twoCities.quote2}
          </p>
          <p className="text-xs sm:text-sm text-rose-blush/90 font-sans tracking-wide pt-2 font-medium">
            — {config.twoCities.quote3}
          </p>
        </div>
      </div>
    </section>
  );
};
