// Central Birthday Surprise Configuration
// Reusable template for LittleSurprise customers

export const birthdayConfig = {
  // Personal Details
  recipientName: "Aarushi",
  senderName: "Someone Special",
  birthDate: "November 3",
  brandName: "LittleSurprise",
  
  // Theme styling configuration
  theme: {
    primary: "#E07A86",      // Romantic soft rose
    secondary: "#D48B97",    // Muted petal
    accent: "#E29578",       // Warm glow
    creamyBg: "#FAF6F0",     // Warm cream paper
    softPink: "#FDF0EE",     // Soft rose cream
    cardBg: "#FFFFFF",       // Crisp scrapbook paper
    gold: "#D4AF37",         // Subtle gold metallic
    textPrimary: "#4A3B32",  // Deep warm espresso
    textMuted: "#8C7A70",    // Soft warm grey
    fontSerif: "'Playfair Display', serif",
    fontHandwritten: "'Alex Brush', cursive",
    fontBody: "'Plus Jakarta Sans', sans-serif"
  },

  // 6 Curated Aesthetic Memories (Balanced 2x3 Grid to fill the screen beautifully)
  photos: [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      caption: "That infectious laugh that brightens every room 🌸",
      tapeColor: "pink",
      rotation: -1.5
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      caption: "Always bringing warmth, grace and gentle kindness ✨",
      tapeColor: "gold",
      rotation: 1.2
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      caption: "Here's to all the magic memories we cherish most 💫",
      tapeColor: "cream",
      rotation: -1.2
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      caption: "Your radiant glow and beautiful adventurous spirit 🌿",
      tapeColor: "pink",
      rotation: 1.5
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      caption: "For all the late-night talks, coffee and silly smiles ☕",
      tapeColor: "gold",
      rotation: -1.0
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      caption: "To another year of celebrating the marvelous person you are 💖",
      tapeColor: "cream",
      rotation: 1.0
    }
  ],

  // Screen Content & Copy
  messages: {
    // Screen 1: Envelope
    envelope: {
      tag: "Someone has a little surprise for you...",
      subtext: "Made with love, just for you.",
      cta: "Open Your Surprise 💌"
    },
    
    // Screen 2: Reveal
    reveal: {
      headline: "Happy Birthday, {name}!",
      subheading: "Today is all about you.",
      quote: "May this year surround you with gentle sunshine, boundless joy, and everything your sweet heart desires.",
      cta: "Let's Begin ✨"
    },

    // Screen 3: Story Scrapbook
    story: {
      title: "Some people make life a little more beautiful...",
      subtitle: "And you are one of them.",
      hint: "Tap on any photo to uncover a secret memory note",
      cta: "There's More 💗"
    },

    // Screen 4: Make a Wish
    wish: {
      title: "Close your eyes...",
      subtitle: "Make a wish in your heart.",
      makeWishCta: "Make My Wish ✨",
      wishingMessage: "May all your little wishes find their way to you.",
      blowCandlesCta: "Blow Out the Candles 🕯️",
      afterBlowMessage: "Your wish is now a little closer to coming true. ✨",
      nextCta: "Let's Cut the Cake 🎂"
    },

    // Screen 5: Cake Cutting
    cake: {
      title: "Every birthday deserves a sweet moment.",
      subtitle: "Hold the knife or tap below to make the sweetest first slice!",
      cutCta: "Cut the Cake! 🔪",
      revealedMessage: "You're sweeter than this cake!",
      sweetPraise: "Full of sprinkles, love, and sweet delight.",
      nextCta: "Open Your Gift 🎁"
    },

    // Screen 6: Open Gift
    gift: {
      title: "One last little surprise...",
      subtitle: "Wrapped with all the love and warmest thoughts in the world.",
      openCta: "Open Your Gift 🎀",
      openedHeader: "A Special Gift For You",
      revealedMessage: "You deserve all the happiness in the world.",
      surprisePerk: "A year full of sweet surprises, lovely road trips, warm coffee, and cherished moments awaits you.",
      nextCta: "One Last Thing 💌"
    },

    // Screen 7: Final Letter
    letter: {
      salutation: "To the most special person...",
      paragraphs: [
        "On your special day, I just want you to know how much happiness you bring into the lives of everyone around you.",
        "May your days be filled with laughter, your dreams come true, and your heart always find reasons to smile.",
        "Thank you for being the kind, radiant, and wonderful human being that you are."
      ],
      closing: "With lots of love ❤️",
      replayCta: "Replay Your Surprise ↺"
    }
  }
};
