import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { birthdayConfig } from './config/birthdayConfig';
import { Sparkles } from './components/common/Sparkles';
import { MusicToggle } from './components/common/MusicToggle';

// 7 Story Scenes
import { EnvelopeScreen } from './components/scenes/EnvelopeScreen';
import { RevealScreen } from './components/scenes/RevealScreen';
import { StoryScreen } from './components/scenes/StoryScreen';
import { WishScreen } from './components/scenes/WishScreen';
import { CakeCuttingScreen } from './components/scenes/CakeCuttingScreen';
import { GiftScreen } from './components/scenes/GiftScreen';
import { LetterScreen } from './components/scenes/LetterScreen';

import './App.css';

// Scene IDs: 1 (Envelope) -> 2 (Reveal) -> 3 (Story) -> 4 (Wish) -> 5 (Cake) -> 6 (Gift) -> 7 (Letter)
function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const goToScene = (sceneNum) => {
    setDirection(sceneNum > currentScene ? 1 : -1);
    setCurrentScene(sceneNum);
  };

  const handleNext = () => {
    if (currentScene < 7) {
      goToScene(currentScene + 1);
    }
  };

  const handleBack = () => {
    if (currentScene > 1) {
      goToScene(currentScene - 1);
    }
  };

  const handleReplay = () => {
    goToScene(1);
  };

  // Scene transition variants for paper-like smooth cinematic flow
  const sceneVariants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 0.96,
      y: dir > 0 ? 15 : -15
    }),
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 1.02,
      y: dir > 0 ? -12 : 12,
      transition: {
        duration: 0.35,
        ease: [0.7, 0, 0.84, 0]
      }
    })
  };

  return (
    <div className="app-viewport">
      {/* Background Floating Dust and Sparkles */}
      <Sparkles count={18} />

      {/* Top Controls: Music/Audio Toggle fixed in safe top corner */}
      <div className="top-controls-bar">
        <MusicToggle />
      </div>

      {/* Single Viewport Container - No Vertical Scroll */}
      <div className="scene-viewport-wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentScene}
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ width: '100%', height: '100%' }}
          >
            {currentScene === 1 && (
              <EnvelopeScreen
                config={birthdayConfig}
                onNext={handleNext}
              />
            )}

            {currentScene === 2 && (
              <RevealScreen
                config={birthdayConfig}
                onNext={handleNext}
              />
            )}

            {currentScene === 3 && (
              <StoryScreen
                config={birthdayConfig}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentScene === 4 && (
              <WishScreen
                config={birthdayConfig}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentScene === 5 && (
              <CakeCuttingScreen
                config={birthdayConfig}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentScene === 6 && (
              <GiftScreen
                config={birthdayConfig}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentScene === 7 && (
              <LetterScreen
                config={birthdayConfig}
                onReplay={handleReplay}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
