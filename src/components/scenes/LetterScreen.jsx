import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { triggerConfetti } from '../../utils/confetti';
import { soundManager } from '../../utils/sound';

export const LetterScreen = ({ config, onReplay }) => {
  useEffect(() => {
    triggerConfetti({ x: 0.5, y: 0.3 });
  }, []);

  const handleReplayClick = () => {
    soundManager.playButtonSoft();
    onReplay();
  };

  return (
    <div className="scene-container letter-scene">
      {/* Floating gentle hearts in background */}
      <div className="floating-hearts-layer" aria-hidden="true">
        <motion.div
          className="floating-heart fh-1"
          animate={{ y: [0, -35, 0], opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart size={22} className="fill-rose-300 text-rose-300" />
        </motion.div>
        <motion.div
          className="floating-heart fh-2"
          animate={{ y: [0, -45, 0], opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Heart size={30} className="fill-rose-200 text-rose-200" />
        </motion.div>
        <motion.div
          className="floating-heart fh-3"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Heart size={18} className="fill-rose-400 text-rose-400" />
        </motion.div>
      </div>

      {/* Aesthetic Handwritten Parchment Letter (Expanded to Fill Viewport) */}
      <motion.div
        className="vintage-letter-card"
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="letter-header-decor">
          <div className="letter-date-stamp font-serif">
            <span>{config.birthDate || "Special Day"}</span>
          </div>
          <div className="letter-gold-seal">
            <Sparkles size={16} className="text-amber-600" />
          </div>
        </div>

        {/* Salutation */}
        <h3 className="letter-salutation">
          {config.messages.letter.salutation}
        </h3>

        {/* Letter Paragraphs */}
        <div className="letter-content font-serif text-stone-800 space-y-3">
          {config.messages.letter.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <p className="font-semibold text-rose-800 text-lg md:text-xl pt-1">
            Happy Birthday, {config.recipientName}!
          </p>
        </div>

        {/* Closing signature */}
        <div className="letter-signature mt-6 text-right">
          <p className="font-handwritten text-3xl md:text-4xl text-rose-600">
            {config.messages.letter.closing}
          </p>
          <p className="font-serif italic text-sm text-stone-500 mt-1">
            — {config.senderName}
          </p>
        </div>
      </motion.div>

      {/* CTA: Replay Your Surprise */}
      <div className="scene-footer-action">
        <Button
          onClick={handleReplayClick}
          size="lg"
          variant="secondary"
          icon={RotateCcw}
        >
          {config.messages.letter.replayCta}
        </Button>
      </div>
    </div>
  );
};
