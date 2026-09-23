/**
 * Synthesizes an ambient romantic chord sequence using Web Audio API
 * or plays a custom audio URL if provided.
 */
class AmbientMusicController {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;

  // Chord progression: D - F#m - G - A (Canon in D romantic vibe)
  private chords = [
    [146.83, 220.0, 293.66, 369.99, 440.0], // D major
    [164.81, 220.0, 261.63, 329.63, 415.3], // F#m
    [196.0, 246.94, 293.66, 392.0, 493.88], // G major
    [220.0, 277.18, 329.63, 440.0, 554.37], // A major
  ];

  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, gainValue = 0.08) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sine + triangle blend
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private playArpeggio() {
    if (!this.ctx || !this.isPlaying) return;
    const chord = this.chords[this.currentChordIndex];
    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.45, 3.2, 0.04);
    });

    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
    this.timer = window.setTimeout(() => {
      this.playArpeggio();
    }, 2800);
  }

  public play() {
    this.initContext();
    this.isPlaying = true;
    this.playArpeggio();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientMusic = new AmbientMusicController();
