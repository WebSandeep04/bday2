import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';
import { soundManager } from '../../utils/sound';
import { triggerGoldenSparkles } from '../../utils/confetti';

export const WishScreen = ({ config, onNext, onBack }) => {
  // state steps: 'initial' -> 'wished' -> 'blown'
  const [wishState, setWishState] = useState('initial');

  const handleMakeWish = () => {
    soundManager.playSparkle();
    setWishState('wished');
  };

  const handleBlowCandles = () => {
    soundManager.playCandleBlow();
    setWishState('blown');
    triggerGoldenSparkles();
  };

  const handleGoToCakeCutting = () => {
    soundManager.playButtonSoft();
    onNext();
  };

  const isFlamesLit = wishState !== 'blown';

  return (
    <div className="scene-container wish-scene">
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
        <span className="step-indicator">Chapter 2 • Make a Wish</span>
      </div>

      {/* Header messages with prominent fonts */}
      <div className="wish-header-content px-4 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {wishState === 'initial' && (
            <motion.div
              key="wish-initial"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h2 className="wish-header-title">
                {config.messages.wish.title}
              </h2>
              <p className="wish-header-subtitle">
                {config.messages.wish.subtitle}
              </p>
            </motion.div>
          )}

          {wishState === 'wished' && (
            <motion.div
              key="wish-wished"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="font-handwritten text-4xl md:text-5xl text-rose-600 mb-1">
                A wish was made... ✨
              </p>
              <p className="font-serif italic text-base md:text-lg text-stone-700">
                "{config.messages.wish.wishingMessage}"
              </p>
            </motion.div>
          )}

          {wishState === 'blown' && (
            <motion.div
              key="wish-blown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="font-serif text-3xl text-stone-800 font-bold mb-1">
                Blow out the candles!
              </h2>
              <p className="font-serif italic text-base md:text-lg text-rose-700">
                {config.messages.wish.afterBlowMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prominent Cake with Interactive Glowing Candles */}
      <div className="cake-display-area">
        <div className={`ambient-glow ${isFlamesLit ? 'glow-active' : 'glow-dim'}`} />

        <div className="wish-cake-wrapper">
          {/* 5 Birthday Candles */}
          <div className="candles-row">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className={`candle-stick candle-${index}`}>
                <div className="flame-anchor">
                  <AnimatePresence>
                    {isFlamesLit ? (
                      <motion.div
                        className="flame"
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: [1, 1.15, 0.95, 1.1, 1],
                          rotate: [-3, 3, -2, 2, -3],
                          y: [0, -2, 1, -1, 0]
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          duration: 1.2 + (index % 3) * 0.2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <div className="flame-core" />
                        <div className="flame-glow" />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="smoke-puff"
                        initial={{ opacity: 0.85, y: 0, scale: 0.4 }}
                        animate={{
                          opacity: [0.85, 0.4, 0],
                          y: -40,
                          scale: 2,
                          x: (index % 2 === 0 ? 6 : -6)
                        }}
                        transition={{ duration: 1.6, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="candle-wick" />
                </div>
                <div className="candle-body" />
              </div>
            ))}
          </div>

          {/* Aesthetic Cake Graphic */}
          <div className="cake-tier cake-tier-top">
            <div className="frosting-drips">
              <span className="drip drip-1"></span>
              <span className="drip drip-2"></span>
              <span className="drip drip-3"></span>
              <span className="drip drip-4"></span>
              <span className="drip drip-5"></span>
            </div>
            <div className="berries-row">
              <span className="berry berry-1">🍓</span>
              <span className="berry berry-2">✨</span>
              <span className="berry berry-3">🍓</span>
            </div>
          </div>
          
          <div className="cake-tier cake-tier-base">
            <div className="cake-creamy-layer"></div>
            <div className="cake-pearls">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>

          <div className="cake-plate"></div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="scene-footer-action">
        {wishState === 'initial' && (
          <Button
            onClick={handleMakeWish}
            size="lg"
            icon={Sparkles}
          >
            {config.messages.wish.makeWishCta}
          </Button>
        )}

        {wishState === 'wished' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={handleBlowCandles}
              size="lg"
              variant="secondary"
            >
              {config.messages.wish.blowCandlesCta}
            </Button>
          </motion.div>
        )}

        {wishState === 'blown' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleGoToCakeCutting}
              size="lg"
            >
              {config.messages.wish.nextCta}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
