import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, Menu, X, BookOpen, Compass, Heart, Image as ImageIcon } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';

interface NavigationHeaderProps {
  onOpenCustomizer: () => void;
  proposalAnswer: 'yes' | 'no' | null;
  onNavigateSection: (sectionId: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onOpenCustomizer,
  proposalAnswer,
  onNavigateSection
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setIsScrolled(currentScroll > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Two Cities", id: "cities", icon: Compass },
    { label: "Poetry", id: "poetry", icon: BookOpen },
    { label: "Letter", id: "letter", icon: Sparkles },
    { label: "Frames", id: "gallery", icon: ImageIcon },
    { label: "Proposal", id: "proposal", icon: Heart },
  ];

  if (proposalAnswer === 'yes') {
    navLinks.push({ label: "Distance", id: "distance", icon: Compass });
    navLinks.push({ label: "Shared Sky", id: "sky", icon: Sparkles });
  }

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-midnight/90 backdrop-blur-md border-b border-champagne/15 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram */}
          <button
            onClick={() => handleLinkClick('intro')}
            className="flex items-center gap-2 group text-left focus-visible:ring-1 focus-visible:ring-champagne rounded p-1"
          >
            <span className="font-serif text-lg sm:text-xl tracking-wider text-ivory group-hover:text-champagne transition-colors">
              Khubi <span className="text-rose-dusty font-light">×</span> Rajat
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-champagne/70 border border-champagne/20 px-1.5 py-0.5 rounded-full font-sans">
              Miles Apart
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-ivory/70 font-sans">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-champagne transition-colors hover:scale-105 active:scale-95"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <AudioPlayer />

            {/* Customizer button */}
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-aubergine-light/70 border border-rose-dusty/30 hover:border-champagne/50 hover:bg-aubergine text-xs text-rose-blush transition-all shadow-md focus-visible:ring-1 focus-visible:ring-champagne"
              title="Personalize content, poems, and details"
              aria-label="Personalization Dashboard"
            >
              <Sliders className="w-3.5 h-3.5 text-champagne" />
              <span className="hidden sm:inline font-sans text-[11px] tracking-wide text-ivory/90">Personalize</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-midnight-light/80 border border-champagne/20 text-ivory hover:text-champagne transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page reading progress"
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-rose-dusty via-champagne to-rose-blush transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-midnight/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-5 lg:hidden animate-fade-in border-b border-champagne/20">
          <p className="text-[10px] tracking-widest uppercase text-champagne/70 font-sans border-b border-white/10 pb-2">
            Chapters & Stories
          </p>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="flex items-center gap-3 text-lg font-serif text-ivory hover:text-champagne transition-colors py-2 border-b border-white/5 text-left"
                >
                  <Icon className="w-4 h-4 text-rose-dusty" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="flex items-center gap-3 text-lg font-serif text-champagne py-2 text-left"
            >
              <Sliders className="w-4 h-4 text-champagne" />
              <span>Personalization Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
