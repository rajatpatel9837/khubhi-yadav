import React, { useState, useEffect } from 'react';
import { siteConfig as defaultSiteConfig } from './data/siteConfig';
import { poetryCollection as defaultPoems } from './data/poetry';
import { memoryCollection as defaultMemories } from './data/memories';
import { littleThingsCollection } from './data/littleThings';
import { SiteConfig, PoemItem, MemoryItem } from './types';

// Components
import { BackgroundGlow } from './components/BackgroundGlow';
import { NavigationHeader } from './components/NavigationHeader';
import { CinematicIntro } from './components/CinematicIntro';
import { CityJourney } from './components/CityJourney';
import { PoetryCollection } from './components/PoetryCollection';
import { PersonalLetter } from './components/PersonalLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { LittleThings } from './components/LittleThings';
import { RelationshipProposal } from './components/RelationshipProposal';
import { DistanceChapter } from './components/DistanceChapter';
import { SharedSky } from './components/SharedSky';
import { FutureChapter } from './components/FutureChapter';
import { MarriageProposal } from './components/MarriageProposal';
import { FinalLetter } from './components/FinalLetter';
import { CustomizerModal } from './components/CustomizerModal';

export const App: React.FC = () => {
  // Config state (supports live personalization)
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('kr_site_config');
    return saved ? JSON.parse(saved) : defaultSiteConfig;
  });

  const [poems, setPoems] = useState<PoemItem[]>(() => {
    const saved = localStorage.getItem('kr_poems');
    return saved ? JSON.parse(saved) : defaultPoems;
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('kr_memories');
    return saved ? JSON.parse(saved) : defaultMemories;
  });

  // UI state
  const [introOpen, setIntroOpen] = useState(true);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [marriageModalOpen, setMarriageModalOpen] = useState(false);

  // Proposal State ('yes' | 'no' | null)
  const [proposalAnswer, setProposalAnswer] = useState<'yes' | 'no' | null>(() => {
    const saved = sessionStorage.getItem('kr_proposal_answer');
    return (saved as 'yes' | 'no') || null;
  });

  // Handle URL hash routing (e.g. #future)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#future') {
        setMarriageModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Save updates to localStorage
  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('kr_site_config', JSON.stringify(newConfig));
  };

  const handleUpdatePoems = (newPoems: PoemItem[]) => {
    setPoems(newPoems);
    localStorage.setItem('kr_poems', JSON.stringify(newPoems));
  };

  const handleUpdateMemories = (newMemories: MemoryItem[]) => {
    setMemories(newMemories);
    localStorage.setItem('kr_memories', JSON.stringify(newMemories));
  };

  const handleResetDefaults = () => {
    setConfig(defaultSiteConfig);
    setPoems(defaultPoems);
    setMemories(defaultMemories);
    localStorage.removeItem('kr_site_config');
    localStorage.removeItem('kr_poems');
    localStorage.removeItem('kr_memories');
  };

  // Answer handlers
  const handleProposalAnswer = (response: 'yes' | 'no') => {
    setProposalAnswer(response);
    sessionStorage.setItem('kr_proposal_answer', response);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    setProposalAnswer(null);
    sessionStorage.removeItem('kr_proposal_answer');
    setIntroOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-midnight text-ivory font-sans selection:bg-rose-dusty/30 selection:text-champagne antialiased">
      {/* Dynamic ambient gradients and subtle grain */}
      <BackgroundGlow />

      {/* Cinematic Fullscreen Intro Overlay */}
      <CinematicIntro
        config={config}
        isOpen={introOpen}
        onEnter={() => {
          setIntroOpen(false);
          scrollToSection('cities');
        }}
      />

      {/* Persistent Navigation Header */}
      <NavigationHeader
        onOpenCustomizer={() => setCustomizerOpen(true)}
        proposalAnswer={proposalAnswer}
        onNavigateSection={(id) => {
          if (id === 'intro') {
            setIntroOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToSection(id);
          }
        }}
      />

      {/* Main Narrative Journey */}
      <main className="relative z-10 pt-20">
        {/* Chapter 1: The Two Cities Route Journey */}
        <CityJourney config={config} />

        {/* Chapter 2: Literary Poetry Collection */}
        <PoetryCollection poems={poems} />

        {/* Chapter 3: Letter from Rajat */}
        <PersonalLetter
          config={config}
          onNext={() => scrollToSection('gallery')}
        />

        {/* Chapter 4: Memory Frames Exhibition */}
        <MemoryGallery memories={memories} />

        {/* Chapter 5: Little Things That Make Someone Special */}
        <LittleThings items={littleThingsCollection} />

        {/* Chapter 6: The First Proposal (Core Milestone) */}
        <RelationshipProposal
          config={config}
          answer={proposalAnswer}
          onAnswer={handleProposalAnswer}
          onExploreNextChapter={() => scrollToSection('distance')}
          onCloseLetter={() => scrollToSection('closing')}
        />

        {/* CONDITIONAL UNLOCKED CHAPTERS: ONLY IF PROPOSAL ANSWER IS 'YES' */}
        {proposalAnswer === 'yes' && (
          <>
            {/* Long Distance Love Journey */}
            <DistanceChapter config={config} />

            {/* Shared Sky Atmospheric Scene */}
            <SharedSky
              config={config}
              onContinue={() => scrollToSection('future')}
            />

            {/* Future Someday Chapter */}
            <FutureChapter
              config={config}
              onOpenFutureMarriage={() => setMarriageModalOpen(true)}
            />
          </>
        )}

        {/* Chapter 7: The Final Letter */}
        <FinalLetter config={config} onReplay={handleReplay} />
      </main>

      {/* Separate Marriage Proposal Modal (Strictly optional, never automatic) */}
      <MarriageProposal
        config={config}
        isOpen={marriageModalOpen}
        onClose={() => {
          setMarriageModalOpen(false);
          if (window.location.hash === '#future') {
            history.pushState("", document.title, window.location.pathname + window.location.search);
          }
        }}
      />

      {/* Personalization Dashboard */}
      <CustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        poems={poems}
        onUpdatePoems={handleUpdatePoems}
        memories={memories}
        onUpdateMemories={handleUpdateMemories}
        onResetToDefaults={handleResetDefaults}
      />
    </div>
  );
};

export default App;
