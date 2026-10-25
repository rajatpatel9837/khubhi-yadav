export interface LocationInfo {
  city: string;
  state: string;
  label: string;
  coords: { lat: number; lng: number };
  description: string;
}

export interface SiteConfig {
  siteTitle: string;
  dedication: string;
  mainTagline: string;
  supportingTagline: string;
  emotionalTheme: string;
  names: {
    him: string;
    her: string;
    himFull: string;
    herFull: string;
  };
  locations: {
    him: LocationInfo;
    her: LocationInfo;
    approxDistanceKm: number;
    distanceNote: string;
  };
  opening: {
    label: string;
    quote1: string;
    quote2: string;
    primaryCta: string;
    secondaryCta: string;
  };
  twoCities: {
    title: string;
    quote1: string;
    quote2: string;
    quote3: string;
  };
  letter: {
    title: string;
    paragraphs: string[];
    signature: string;
    buttonText: string;
  };
  proposal: {
    introPrompt: string;
    confession: string;
    leadMessage: string;
    question: string;
    yesButtonText: string;
    noButtonText: string;
    yesResponse: {
      title: string;
      message: string;
      ctaText: string;
    };
    noResponse: {
      title: string;
      message: string;
      ctaText: string;
    };
  };
  distanceChapter: {
    title: string;
    quote1: string;
    quote2: string;
    cards: Array<{
      id: string;
      tag: string;
      title: string;
      description: string;
    }>;
    noteButtonText: string;
    noteModal: {
      title: string;
      paragraphs: string[];
      signature: string;
    };
  };
  sharedSky: {
    title: string;
    himSkyLabel: string;
    herSkyLabel: string;
    quote: string;
    ctaText: string;
  };
  futureChapter: {
    title: string;
    quote1: string;
    quote2: string;
    pillars: Array<{
      title: string;
      subtitle: string;
      description: string;
    }>;
  };
  marriageProposal: {
    chapterTag: string;
    prelude: string;
    transitionText: string;
    question: string;
    yesText: string;
    noText: string;
    yesResponse: string;
    noResponse: string;
    disclaimer: string;
  };
  finalLetter: {
    title: string;
    paragraphs: string[];
    signature: string;
    footerNote: string;
    replayText: string;
  };
}

export interface PoemItem {
  id: number;
  chapter: string;
  theme: string;
  title: string;
  lines: string[];
  annotation: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  placeholderAlt: string;
  aspectRatio: string;
  focalPoint?: string;
  date?: string;
  locationTag?: string;
}

export interface LittleThingItem {
  id: string;
  number: string;
  prompt: string;
  observation: string;
  detail: string;
}
