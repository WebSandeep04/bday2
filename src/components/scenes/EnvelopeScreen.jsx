import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles as SparklesIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { soundManager } from '../../utils/sound';

export const EnvelopeScreen = ({ config, onNext }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundManager.playEnvelopeOpen();
    soundManager.startMelody();

    setTimeout(() => {
      onNext();
    }, 1800);
  };

  return (
    <div className="scene-container envelope-scene">
      {/* Subtle brand tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="brand-pill"
      >
        <SparklesIcon size={14} className="text-rose-400" />
        <span>{config.brandName || "LittleSurprise"}</span>
      </motion.div>

      {/* Intro Header */}
      <motion.div
        className="envelope-intro-header px-4 z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="envelope-intro-title">
          {config.messages.envelope.tag}
        </p>
        <p className="envelope-intro-sub">
          {config.messages.envelope.subtext}
        </p>
      </motion.div>

      {/* Floating Animated Envelope */}
      <motion.div
        className="envelope-wrapper"
        animate={isOpening ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`envelope-3d ${isOpening ? 'is-opened' : ''}`}>
          <div className="envelope-back" />

          {/* Letter that slides out */}
          <motion.div
            className="letter-card"
            initial={{ y: 0, opacity: 0.85 }}
            animate={isOpening ? { y: -115, opacity: 1, scale: 1.05 } : { y: 0 }}
            transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="letter-inner">
              <span className="font-handwritten text-xl text-rose-500">Dearest {config.recipientName},</span>
              <p className="font-serif text-sm text-stone-700 mt-1 italic">
                A magical little birthday journey awaits you inside...
              </p>
              <div className="letter-stamp">
                <Heart size={16} className="fill-rose-400 text-rose-500 inline" />
              </div>
            </div>
          </motion.div>

          {/* Envelope Pocket Front */}
          <div className="envelope-front" />

          {/* Foldable Top Flap */}
          <motion.div
            className="envelope-flap"
            animate={isOpening ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 5 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="wax-seal">
              <Heart size={20} className="fill-rose-100 text-rose-100 heart-icon" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Personalized recipient indicator */}
      <motion.div
        className="envelope-recipient-box z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span>Special Delivery For</span>
        <h3>{config.recipientName}</h3>
      </motion.div>

      {/* CTA Button */}
      <div className="scene-footer-action">
        <Button
          onClick={handleOpenSurprise}
          disabled={isOpening}
          size="lg"
        >
          {isOpening ? "Opening Surprise..." : config.messages.envelope.cta}
        </Button>
      </div>
    </div>
  );
};
