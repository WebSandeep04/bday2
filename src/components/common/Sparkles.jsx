import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const Sparkles = ({ count = 18 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2.5,
      type: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'sparkle' : 'dust'
    }));
  }, [count]);

  return (
    <div className="sparkles-container pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`sparkle-item sparkle-${p.type}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.25, 0.8],
            rotate: [0, 45, 90]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

