import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../common/Button';
import { soundManager } from '../../utils/sound';
import { triggerGoldenSparkles } from '../../utils/confetti';

export const GiftScreen = ({ config, onNext, onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    soundManager.playGiftOpen();

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      triggerGoldenSparkles();
    }, 700);
  };

  const handleNext = () => {
    soundManager.playButtonSoft();
    onNext();
  };

  return (
    <div className="scene-container gift-scene">
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
        <span className="step-indicator">Chapter 4 • The Gift Box</span>
      </div>

      {/* Header with enlarged typography */}
      <motion.div
        className="gift-header-content px-4 max-w-md mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>{config.messages.gift.title}</h2>
        <p>
          {!isOpen ? config.messages.gift.subtitle : "A golden surprise unboxed!"}
        </p>
      </motion.div>

      {/* Interactive 3D Gift Box Stage (Enlarged) */}
      <div className="gift-stage">
        <div className={`gift-ambient-glow ${isOpen ? 'box-burst-glow' : ''}`} />

        <div className="gift-box-wrapper" onClick={!isOpen ? handleOpenGift : undefined}>
          <motion.div
            className="gift-lid-container"
            animate={
              isOpen
                ? { y: -110, rotate: -12, opacity: 0.85 }
                : isOpening
                ? { y: -30, rotate: -4 }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gift-bow">
              <div className="bow-loop bow-left" />
              <div className="bow-loop bow-right" />
              <div className="bow-center" />
              <div className="bow-ribbon-tail tail-left" />
              <div className="bow-ribbon-tail tail-right" />
            </div>
            <div className="gift-lid-top">
              <div className="lid-ribbon-stripe" />
            </div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="gift-emerging-content"
                initial={{ opacity: 0, y: 40, scale: 0.7 }}
                animate={{ opacity: 1, y: -70, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              >
                <div className="surprise-token-card">
                  <div className="token-icon-ring">
                    <Heart size={28} className="fill-rose-500 text-rose-500" />
                  </div>
                  <h4 className="font-handwritten text-3xl text-rose-700 font-bold mt-1">
                    {config.messages.gift.openedHeader}
                  </h4>
                  <p className="font-serif text-stone-800 text-base font-semibold px-2 mt-1">
                    "{config.messages.gift.revealedMessage}"
                  </p>
                  <p className="text-sm text-stone-600 font-serif italic mt-2">
                    {config.messages.gift.surprisePerk}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="gift-box-body">
            <div className="box-ribbon-vertical" />
            <div className="box-ribbon-horizontal" />
            <div className="box-shadow" />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="scene-footer-action">
        {!isOpen ? (
          <Button
            onClick={handleOpenGift}
            disabled={isOpening}
            size="lg"
            icon={Sparkles}
          >
            {isOpening ? "Opening Gift..." : config.messages.gift.openCta}
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleNext}
              size="lg"
              icon={Mail}
            >
              {config.messages.gift.nextCta}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
