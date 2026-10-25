import React, { useState } from 'react';
import { SiteConfig, PoemItem, MemoryItem } from '../types';
import { X, Check, Copy, RotateCcw, Sliders, Type, BookOpen, Heart, Image as ImageIcon } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  poems: PoemItem[];
  onUpdatePoems: (newPoems: PoemItem[]) => void;
  memories: MemoryItem[];
  onUpdateMemories: (newMemories: MemoryItem[]) => void;
  onResetToDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  poems,
  onUpdatePoems,
  memories,
  onUpdateMemories,
  onResetToDefaults
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'poetry' | 'letter' | 'proposal' | 'gallery'>('general');
  const [copied, setCopied] = useState(false);

  // Local draft states
  const [tempConfig, setTempConfig] = useState<SiteConfig>(config);
  const [tempPoems, setTempPoems] = useState<PoemItem[]>(poems);
  const [tempMemories, setTempMemories] = useState<MemoryItem[]>(memories);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConfig(tempConfig);
    onUpdatePoems(tempPoems);
    onUpdateMemories(tempMemories);
    onClose();
  };

  const handleCopyJSON = () => {
    const fullExport = {
      siteConfig: tempConfig,
      poems: tempPoems,
      memories: tempMemories
    };
    navigator.clipboard.writeText(JSON.stringify(fullExport, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Personalization Dashboard"
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/95 backdrop-blur-2xl p-3 sm:p-6 overflow-hidden"
    >
      <div className="relative max-w-4xl w-full h-[90vh] bg-midnight-light rounded-3xl border border-champagne/30 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-aubergine-dark/70">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-champagne" />
            <div>
              <h3 className="font-serif text-xl text-ivory">Personalization Dashboard</h3>
              <p className="text-[11px] font-sans text-ivory/50">Edit names, poems, letters, and proposal wording in real time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-ivory/60 hover:text-ivory transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-midnight/80 px-6 gap-2 overflow-x-auto text-xs font-sans uppercase tracking-wider">
          {[
            { id: 'general', label: 'Names & Cities', icon: Type },
            { id: 'poetry', label: 'Shayari (5)', icon: BookOpen },
            { id: 'letter', label: 'Personal Letter', icon: Type },
            { id: 'proposal', label: 'Proposal Text', icon: Heart },
            { id: 'gallery', label: 'Photos & Captions', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-champagne text-champagne font-medium'
                    : 'border-transparent text-ivory/50 hover:text-ivory/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* TAB 1: GENERAL (NAMES & CITIES) */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-dusty mb-1.5 font-mono">Her Full Name</label>
                  <input
                    type="text"
                    value={tempConfig.names.herFull}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      names: { ...tempConfig.names, herFull: e.target.value, her: e.target.value.split(' ')[0] }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5 font-mono">His Full Name</label>
                  <input
                    type="text"
                    value={tempConfig.names.himFull}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      names: { ...tempConfig.names, himFull: e.target.value, him: e.target.value.split(' ')[0] }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5 font-mono">Rajat's City & College</label>
                  <input
                    type="text"
                    value={tempConfig.locations.him.city}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      locations: {
                        ...tempConfig.locations,
                        him: { ...tempConfig.locations.him, city: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory mb-2"
                  />
                  <input
                    type="text"
                    value={tempConfig.locations.him.label}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      locations: {
                        ...tempConfig.locations,
                        him: { ...tempConfig.locations.him, label: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-midnight/60 border border-white/10 text-xs text-ivory/70"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-dusty mb-1.5 font-mono">Khubi's City & Home</label>
                  <input
                    type="text"
                    value={tempConfig.locations.her.city}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      locations: {
                        ...tempConfig.locations,
                        her: { ...tempConfig.locations.her, city: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory mb-2"
                  />
                  <input
                    type="text"
                    value={tempConfig.locations.her.label}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      locations: {
                        ...tempConfig.locations,
                        her: { ...tempConfig.locations.her, label: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-2 rounded-lg bg-midnight/60 border border-white/10 text-xs text-ivory/70"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-mono">Main Tagline</label>
                <input
                  type="text"
                  value={tempConfig.mainTagline}
                  onChange={(e) => setTempConfig({ ...tempConfig, mainTagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory"
                />
              </div>
            </div>
          )}

          {/* TAB 2: POETRY */}
          {activeTab === 'poetry' && (
            <div className="space-y-6">
              {tempPoems.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-2xl bg-midnight border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-champagne">
                    <span>Poem {idx + 1}: {p.theme}</span>
                    <span>{p.chapter}</span>
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory/50 block mb-1">Poem Title</label>
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...tempPoems];
                        updated[idx].title = e.target.value;
                        setTempPoems(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-midnight-light border border-white/15 text-ivory font-serif"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ivory/50 block mb-1">Couplets (Lines separated by newline)</label>
                    <textarea
                      rows={4}
                      value={p.lines.join('\n')}
                      onChange={(e) => {
                        const updated = [...tempPoems];
                        updated[idx].lines = e.target.value.split('\n');
                        setTempPoems(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-midnight-light border border-white/15 text-ivory font-serif text-sm leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-rose-dusty/80 block mb-1">Handwritten Annotation</label>
                    <input
                      type="text"
                      value={p.annotation}
                      onChange={(e) => {
                        const updated = [...tempPoems];
                        updated[idx].annotation = e.target.value;
                        setTempPoems(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-midnight-light border border-white/15 text-ivory font-handwriting text-base"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5 font-mono">Letter Title</label>
                <input
                  type="text"
                  value={tempConfig.letter.title}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    letter: { ...tempConfig.letter, title: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory font-serif text-lg"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ivory/70 mb-1.5 font-mono">
                  Full Letter Text (Paragraphs separated by two line breaks)
                </label>
                <textarea
                  rows={10}
                  value={tempConfig.letter.paragraphs.join('\n\n')}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    letter: {
                      ...tempConfig.letter,
                      paragraphs: e.target.value.split('\n\n').filter((p) => p.trim() !== '')
                    }
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/15 text-ivory font-serif text-base leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-rose-dusty mb-1.5 font-mono">Letter Signature</label>
                <input
                  type="text"
                  value={tempConfig.letter.signature}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    letter: { ...tempConfig.letter, signature: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory font-handwriting text-2xl"
                />
              </div>
            </div>
          )}

          {/* TAB 4: PROPOSAL */}
          {activeTab === 'proposal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-champagne mb-1.5 font-mono">Intro Hook</label>
                <input
                  type="text"
                  value={tempConfig.proposal.introPrompt}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    proposal: { ...tempConfig.proposal, introPrompt: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-rose-dusty mb-1.5 font-mono">Central Question</label>
                <input
                  type="text"
                  value={tempConfig.proposal.question}
                  onChange={(e) => setTempConfig({
                    ...tempConfig,
                    proposal: { ...tempConfig.proposal, question: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory font-serif text-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-green-400/80 mb-1.5 font-mono">Yes Button</label>
                  <input
                    type="text"
                    value={tempConfig.proposal.yesButtonText}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      proposal: { ...tempConfig.proposal, yesButtonText: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-rose-300/80 mb-1.5 font-mono">Respectful No Button</label>
                  <input
                    type="text"
                    value={tempConfig.proposal.noButtonText}
                    onChange={(e) => setTempConfig({
                      ...tempConfig,
                      proposal: { ...tempConfig.proposal, noButtonText: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-ivory"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <p className="text-xs text-ivory/60">
                You can replace images with your own direct URLs, local paths (`/photos/filename.jpg`), or Unsplash links.
              </p>
              {tempMemories.map((m, idx) => (
                <div key={m.id} className="p-4 rounded-2xl bg-midnight border border-white/10 flex flex-col sm:flex-row gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 shrink-0">
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const updated = [...tempMemories];
                        updated[idx].title = e.target.value;
                        setTempMemories(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-midnight-light border border-white/15 text-ivory font-serif"
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={m.image}
                      onChange={(e) => {
                        const updated = [...tempMemories];
                        updated[idx].image = e.target.value;
                        setTempMemories(updated);
                      }}
                      className="w-full px-3 py-1 rounded-lg bg-midnight-light border border-white/10 text-xs text-ivory/70 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Caption"
                      value={m.caption}
                      onChange={(e) => {
                        const updated = [...tempMemories];
                        updated[idx].caption = e.target.value;
                        setTempMemories(updated);
                      }}
                      className="w-full px-3 py-1 rounded-lg bg-midnight-light border border-white/10 text-xs text-ivory/70"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-midnight/90 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-ivory/80 font-mono transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Full JSON' : 'Export JSON'}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm("Reset all customizations back to original drafts?")) {
                  onResetToDefaults();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-950/40 text-xs text-rose-blush/80 hover:text-rose-dusty transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-transparent text-xs text-ivory/60 hover:text-ivory"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-champagne hover:bg-champagne-light text-midnight text-xs font-semibold uppercase tracking-wider transition-all shadow-lg"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
