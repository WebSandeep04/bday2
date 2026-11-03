import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';
import { soundManager } from '../../utils/sound';

export const StoryScreen = ({ config, onNext, onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleCardClick = (index) => {
    soundManager.playSparkle();
    setSelectedPhoto(selectedPhoto === index ? null : index);
  };

  const handleNext = () => {
    soundManager.playButtonSoft();
    onNext();
  };

  return (
    <div className="scene-container story-scene">
      {/* Top Header Navigation */}
      <div className="scene-header-nav">
        <button
          onClick={onBack}
          className="back-btn"
          aria-label="Go to previous scene"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <span className="step-indicator">Chapter 1 • Memories</span>
      </div>

      {/* Story Header */}
      <motion.div
        className="story-header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="story-title">
          {config.messages.story.title}
        </h2>
        <p className="story-subtitle">
          {config.messages.story.subtitle}
        </p>
        <p className="story-hint">
          {config.messages.story.hint}
        </p>
      </motion.div>

      {/* 6 Photos in an Aesthetic 2x3 Scrapbook Grid - Perfect Fit for the Viewport! */}
      <div className="polaroid-grid-6">
        {config.photos.map((photo, index) => {
          const isSelected = selectedPhoto === index;
          return (
            <motion.div
              key={photo.id}
              className={`polaroid-grid-card tape-${photo.tapeColor} ${isSelected ? 'is-selected' : ''}`}
              style={{
                transform: `rotate(${photo.rotation}deg)`
              }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCardClick(index)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
            >
              <div className="grid-tape" />

              <div className="polaroid-grid-inner">
                <div className="polaroid-grid-frame">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="polaroid-grid-img"
                    loading="lazy"
                  />
                  <div className="grid-tap-badge">
                    <Eye size={9} />
                    <span>{isSelected ? "Open" : "Note"}</span>
                  </div>
                </div>

                <div className="polaroid-grid-caption">
                  <span className="grid-mem-label">
                    Memory #{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revealed Memory Note Banner - shows when user taps any photo */}
      <div className="grid-note-wrapper">
        <AnimatePresence mode="wait">
          {selectedPhoto !== null ? (
            <motion.div
              key={selectedPhoto}
              className="grid-revealed-note"
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Heart size={12} className="fill-rose-500 text-rose-500 inline mr-1" />
              <span className="font-serif italic text-stone-800">
                {config.photos[selectedPhoto].caption}
              </span>
            </motion.div>
          ) : (
            <div className="grid-placeholder-note">
              <span>Tap any memory above to read its note ✨</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA Button */}
      <div className="scene-footer-action">
        <Button
          onClick={handleNext}
          size="md"
          icon={Heart}
        >
          {config.messages.story.cta}
        </Button>
      </div>
    </div>
  );
};
