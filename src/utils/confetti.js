import confetti from 'canvas-confetti';

export const triggerConfetti = (origin = { x: 0.5, y: 0.6 }) => {
  // Pastel romantic palette
  const colors = ['#E07A86', '#F4A261', '#E76F51', '#FDF0EE', '#D4AF37', '#B388EB'];

  // Left burst
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: origin.x - 0.1, y: origin.y },
    colors: colors,
    disableForReducedMotion: true
  });

  // Right burst
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: origin.x + 0.1, y: origin.y },
    colors: colors,
    disableForReducedMotion: true
  });
};

export const triggerGoldenSparkles = () => {
  confetti({
    particleCount: 40,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#FFD700', '#FFE4B5', '#FFF8DC', '#F0E68C'],
    shapes: ['star', 'circle'],
    scalar: 1.2,
    ticks: 180,
    disableForReducedMotion: true
  });
};

