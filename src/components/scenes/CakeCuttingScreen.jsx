import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift } from 'lucide-react';
import { Button } from '../common/Button';
import { soundManager } from '../../utils/sound';
import { triggerConfetti } from '../../utils/confetti';

export const CakeCuttingScreen = ({ config, onNext, onBack }) => {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  const handleCutCake = () => {
    if (isCutting || isCut) return;
    setIsCutting(true);
    soundManager.playCakeCut();

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
      triggerConfetti({ x: 0.5, y: 0.55 });
    }, 1100);
  };

  const handleNext = () => {
    soundManager.playButtonSoft();
    onNext();
  };

  return (
    <div className="scene-container cake-cutting-scene">
      {/* Top Navigation */}
      <div className="scene-header-nav">
        <button
          onClick={onBack}
          className="back-btn"
          aria-label="Go to previous scene"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <span className="step-indicator">Chapter 3 • Sweet Moment</span>
      </div>

      {/* Header with larger fonts */}
      <motion.div
        className="cake-cut-header-content px-4 max-w-md mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{config.messages.cake.title}</h2>
        <p>
          {!isCut ? config.messages.cake.subtitle : "A sweet slice of celebration!"}
        </p>
      </motion.div>

      {/* Interactive Cake Cutting Graphic (Scaled Up) */}
      <div className="interactive-cake-stage">
        <AnimatePresence>
          {isCutting && (
            <motion.div
              className="knife-tool"
              initial={{ x: 130, y: -90, rotate: -45, opacity: 0 }}
              animate={{
                x: [130, 0, 0, 0],
                y: [-90, -30, 50, 70],
                rotate: [-45, -15, -15, -15],
                opacity: [0, 1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            >
              <div className="knife-blade" />
              <div className="knife-handle" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="split-cake-container">
          <motion.div
            className="cake-half cake-half-left"
            animate={isCut ? { x: -32, rotate: -6 } : { x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <div className="cake-half-visual left">
              <div className="frosting-layer top">
                <span className="strawberry-topping">🍓</span>
                <span className="cream-dollop"></span>
              </div>
              <div className="sponge-body">
                <div className="sponge-layer layer-1"></div>
                <div className="cream-filling"></div>
                <div className="sponge-layer layer-2"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="cake-half cake-half-right"
            animate={isCut ? { x: 32, rotate: 6 } : { x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <div className="cake-half-visual right">
              <div className="frosting-layer top">
                <span className="strawberry-topping">🍓</span>
                <span className="cream-dollop"></span>
              </div>
              <div className="sponge-body">
                <div className="sponge-layer layer-1"></div>
                <div className="cream-filling"></div>
                <div className="sponge-layer layer-2"></div>
              </div>
            </div>
          </motion.div>

          <div className="cake-gold-stand" />
        </div>

        <AnimatePresence>
          {isCut && (
            <motion.div
              className="cake-reveal-note"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="font-handwritten text-3xl md:text-4xl text-rose-600 font-bold mb-1">
                "{config.messages.cake.revealedMessage}"
              </p>
              <p className="font-serif italic text-sm text-stone-600">
                {config.messages.cake.sweetPraise}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <div className="scene-footer-action">
        {!isCut ? (
          <Button
            onClick={handleCutCake}
            disabled={isCutting}
            size="lg"
          >
            {isCutting ? "Cutting Sweetness... 🍰" : config.messages.cake.cutCta}
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleNext}
              size="lg"
              icon={Gift}
            >
              {config.messages.cake.nextCta}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
