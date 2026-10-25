import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MemoryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { Eye, Camera, Sparkles } from 'lucide-react';

interface MemoryGalleryProps {
  memories: MemoryItem[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ memories }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleOpenPhoto = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Exhibition Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-champagne/25 bg-aubergine-dark text-[10px] sm:text-xs tracking-[0.25em] uppercase text-champagne mb-4 font-sans"
        >
          <Camera className="w-3.5 h-3.5 text-rose-dusty" />
          <span>Atmospheric Frames</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight font-light"
        >
          A Few Frames, A Few Feelings
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm text-ivory/60 mt-3 max-w-lg mx-auto"
        >
          Atmospheric visual notes capturing quiet moments, twilight reflections, and the space between two cities.
        </motion.p>
      </div>

      {/* Editorial Masonry/Staggered Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memories.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
            onClick={() => handleOpenPhoto(index)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden luxury-card border border-champagne/20 flex flex-col"
          >
            {/* Image Container with clip and hover zoom */}
            <div className={`relative w-full ${item.aspectRatio} overflow-hidden bg-midnight-light`}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80";
                }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Natural light gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Film grain texture */}
              <div className="absolute inset-0 grain-overlay opacity-25 pointer-events-none" />

              {/* View Fullscreen Pill Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-champagne/40 text-[10px] uppercase font-sans text-champagne tracking-wider shadow-lg">
                  <Eye className="w-3 h-3" />
                  <span>Enlarge</span>
                </span>
              </div>

              {/* Tag on image */}
              {item.locationTag && (
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-champagne/80 font-mono bg-midnight/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-champagne/20">
                    {item.locationTag}
                  </span>
                </div>
              )}
            </div>

            {/* Editorial Caption Box */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-midnight-light/40">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-ivory font-normal group-hover:text-champagne transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-ivory/65 mt-1.5 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>

              {item.date && (
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-ivory/40">
                  <span>{item.date}</span>
                  <Sparkles className="w-3 h-3 text-rose-dusty/40" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Component */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={selectedPhotoIndex}
        items={memories}
        onSelectIndex={(index) => setSelectedPhotoIndex(index)}
      />
    </section>
  );
};
