import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top ambient champagne glow */}
      <div 
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] opacity-20 bg-gradient-to-b from-champagne/40 via-rose-dusty/20 to-transparent" 
      />
      {/* Mid subtle aubergine orb */}
      <div 
        className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-aubergine-light" 
      />
      {/* Lower subtle rose orb */}
      <div 
        className="absolute top-[75%] -right-[10%] w-[650px] h-[650px] rounded-full blur-[150px] opacity-20 bg-rose-dusty/30" 
      />
      {/* Grain texture overlay */}
      <div className="absolute inset-0 grain-overlay opacity-40 mix-blend-screen" />
    </div>
  );
};
