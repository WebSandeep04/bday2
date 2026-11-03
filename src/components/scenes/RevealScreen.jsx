import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Stars, Heart } from 'lucide-react';
import { Button } from '../common/Button';
import { triggerConfetti } from '../../utils/confetti';
import { soundManager } from '../../utils/sound';

export const RevealScreen = ({ config, onNext }) => {
  useEffect(() => {
    // Fire festive celebration confetti burst on mount
    triggerConfetti({ x: 0.5, y: 0.45 });
    soundManager.playSparkle();
  }, []);

  const handleBegin = () => {
    soundManager.playButtonSoft();
    onNext();
  };

  return (
    <div className="scene-container reveal-scene">
      {/* Decorative Floating Pastel Balloons */}
      <div className="balloons-backdrop" aria-hidden="true">
        <motion.div
          className="balloon balloon-1"
          animate={{ y: [0, -22, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="balloon-shine" />
        </motion.div>
        <motion.div
          className="balloon balloon-2"
          animate={{ y: [0, -30, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <span className="balloon-shine" />
        </motion.div>
        <motion.div
          className="balloon balloon-3"
          animate={{ y: [0, -26, 0], rotate: [-4, 2, -4] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="balloon-shine" />
        </motion.div>
      </div>

      {/* Main Festive Card */}
      <motion.div
        className="reveal-card"
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="reveal-badge">
          <Stars size={16} className="text-amber-500 fill-amber-300 mr-1" />
          <span>CELEBRATING YOU TODAY</span>
          <Stars size={16} className="text-amber-500 fill-amber-300 ml-1" />
        </div>

        <motion.h1
          className="reveal-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          Happy Birthday, <br />
          <span className="reveal-name">{config.recipientName}!</span>
        </motion.h1>

        <motion.p
          className="reveal-subtitle font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          {config.messages.reveal.subheading}
        </motion.p>

        <motion.div
          className="reveal-divider"
          initial={{ width: 0 }}
          animate={{ width: 90 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Heart size={14} className="fill-rose-400 text-rose-500" />
        </motion.div>

        <motion.p
          className="reveal-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          "{config.messages.reveal.quote}"
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <Button
            onClick={handleBegin}
            size="lg"
            icon={Sparkles}
          >
            {config.messages.reveal.cta}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

