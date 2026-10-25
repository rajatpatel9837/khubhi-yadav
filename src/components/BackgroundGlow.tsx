import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const BackgroundGlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Smooth organic floating orbs
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=35',
          y: '+=25',
          scale: 1.12,
          opacity: 0.28,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=30',
          y: '+=40',
          scale: 1.15,
          opacity: 0.3,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=25',
          y: '-=35',
          scale: 1.1,
          opacity: 0.24,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }

      // Floating romantic stardust particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((particle, i) => {
          const duration = 6 + (i % 5) * 2;
          const delay = (i * 0.3) % 4;

          gsap.to(particle, {
            y: '-=40',
            x: i % 2 === 0 ? '+=15' : '-=15',
            opacity: 0.8,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: delay,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top ambient champagne glow */}
      <div
        ref={orb1Ref}
        className="gsap-floating-orb absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[550px] sm:w-[850px] sm:h-[650px] rounded-full blur-[130px] opacity-20 bg-gradient-to-b from-champagne/40 via-rose-dusty/25 to-transparent"
      />

      {/* Mid subtle aubergine orb */}
      <div
        ref={orb2Ref}
        className="gsap-floating-orb absolute top-[35%] -left-[15%] sm:-left-[5%] w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full blur-[150px] opacity-20 bg-aubergine-light"
      />

      {/* Lower subtle rose orb */}
      <div
        ref={orb3Ref}
        className="gsap-floating-orb absolute top-[70%] -right-[15%] sm:-right-[5%] w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full blur-[140px] opacity-18 bg-rose-dusty/30"
      />

      {/* GSAP Stardust Particles across the page */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[
          { top: '15%', left: '12%', size: 'w-1 h-1', opacity: 0.3 },
          { top: '22%', left: '85%', size: 'w-1.5 h-1.5', opacity: 0.4 },
          { top: '38%', left: '25%', size: 'w-1 h-1', opacity: 0.25 },
          { top: '48%', left: '78%', size: 'w-2 h-2', opacity: 0.35 },
          { top: '60%', left: '18%', size: 'w-1 h-1', opacity: 0.2 },
          { top: '72%', left: '90%', size: 'w-1.5 h-1.5', opacity: 0.4 },
          { top: '85%', left: '30%', size: 'w-1 h-1', opacity: 0.3 },
          { top: '92%', left: '70%', size: 'w-1.5 h-1.5', opacity: 0.35 },
        ].map((p, idx) => (
          <div
            key={idx}
            style={{ top: p.top, left: p.left, opacity: p.opacity }}
            className={`gsap-stardust-particle absolute ${p.size} rounded-full bg-champagne-light shadow-[0_0_8px_rgba(208,181,138,0.7)]`}
          />
        ))}
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 grain-overlay opacity-30 mix-blend-screen" />
    </div>
  );
};
