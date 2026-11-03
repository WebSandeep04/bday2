// Sound effects synthesized via Web Audio API - 100% reliable, zero external MP3 dependencies!
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.musicPlaying = false;
    this.melodyTimer = null;
    this.noteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.pauseMelody();
    } else if (!muted && this.musicPlaying) {
      this.playMelody();
    }
  }

  playEnvelopeOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Gentle paper slide / rustle swoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.35);
    
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);

    // Chime sparkle
    this.playSparkle(now + 0.15, [659.25, 880, 1174.66]);
  }

  playSparkle(startTime = null, freqs = [523.25, 659.25, 783.99, 1046.5]) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const t0 = startTime || this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t0 + idx * 0.08);

      gain.gain.setValueAtTime(0.001, t0 + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, t0 + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t0 + idx * 0.08);
      osc.stop(t0 + idx * 0.08 + 0.35);
    });
  }

  playCandleBlow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Breath / whisper whoosh (simulated with white noise buffer)
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.5);
    filter.Q.value = 2.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    whiteNoise.start(now);

    // Delicate fairy chime bell when extinguished
    setTimeout(() => {
      this.playSparkle(null, [880, 1108.73, 1318.51]);
    }, 280);
  }

  playCakeCut() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Gentle slice tone followed by joyful chime
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);

    setTimeout(() => {
      this.playSparkle(null, [523.25, 659.25, 783.99, 1046.5]);
    }, 180);
  }

  playGiftOpen() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Rich celebration chime chords
    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.001, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.05 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.6);
    });
  }

  playButtonSoft() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Soft romantic music-box melody of "Happy Birthday" looping softly in the background
  startMelody() {
    this.musicPlaying = true;
    if (!this.isMuted) {
      this.playMelody();
    }
  }

  pauseMelody() {
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  playMelody() {
    if (this.isMuted || !this.musicPlaying) return;
    this.init();
    if (!this.ctx) return;

    // Music box notes for Happy Birthday (freq in Hz, duration in ms)
    const melody = [
      { f: 261.63, d: 350 }, // Hap-
      { f: 261.63, d: 300 }, // py
      { f: 293.66, d: 650 }, // birth-
      { f: 261.63, d: 650 }, // day
      { f: 349.23, d: 650 }, // to
      { f: 329.63, d: 1100 }, // you
      { f: 0, d: 300 },      // pause
      { f: 261.63, d: 350 }, // Hap-
      { f: 261.63, d: 300 }, // py
      { f: 293.66, d: 650 }, // birth-
      { f: 261.63, d: 650 }, // day
      { f: 392.00, d: 650 }, // to
      { f: 349.23, d: 1100 }, // you
      { f: 0, d: 300 },      // pause
      { f: 261.63, d: 350 }, // Hap-
      { f: 261.63, d: 300 }, // py
      { f: 523.25, d: 650 }, // birth-
      { f: 440.00, d: 650 }, // day
      { f: 349.23, d: 650 }, // dear
      { f: 329.63, d: 650 }, // [Name]
      { f: 293.66, d: 900 },
      { f: 0, d: 300 },
      { f: 466.16, d: 350 },
      { f: 466.16, d: 300 },
      { f: 440.00, d: 650 },
      { f: 349.23, d: 650 },
      { f: 392.00, d: 650 },
      { f: 349.23, d: 1300 },
      { f: 0, d: 1500 } // pause before looping
    ];

    const note = melody[this.noteIndex];
    if (note && note.f > 0 && !this.isMuted) {
      const now = this.ctx.currentTime;
      // High delicate celeste / music box harmonic tone
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      oscHarmonic.type = 'triangle';
      
      // Play 1 octave higher for music box magic
      const baseFreq = note.f * 2;
      osc.frequency.setValueAtTime(baseFreq, now);
      oscHarmonic.frequency.setValueAtTime(baseFreq * 2, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (note.d / 1000) * 0.9);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + note.d / 1000);
      oscHarmonic.stop(now + note.d / 1000);
    }

    this.noteIndex = (this.noteIndex + 1) % melody.length;
    this.melodyTimer = setTimeout(() => {
      this.playMelody();
    }, note ? note.d : 500);
  }
}

export const soundManager = new SoundManager();

