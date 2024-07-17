/*
class AudioManager {
  constructor() {
    this.bgm = null;
    this.sfx = {};
  }

  // Load a BGM track
  loadBGM(src) {
    if (this.bgm) {
      this.bgm.pause();
    }
    this.bgm = new Audio(src);
    this.bgm.loop = true; // Loop BGM
  }

  // Play the loaded BGM track
  playBGM() {
    if (this.bgm) {
      this.bgm.play();
    }
  }

  // Stop the BGM track
  stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
    }
  }

  muteBGM() {
    if (this.bgm) {
      this.bgm.muted = true;
    }
  }

  unmuteBGM() {
    if (this.bgm) {
      this.bgm.muted = false;
    }
  }

  setBGMVolume(volume) {
    if (this.bgm) {
      this.bgm.volume = volume;
    }
  }

  // Load a sound effect
  loadSFX(name, src) {
    const audio = new Audio(src);
    audio.volume = 0.5; // Set volume to 50%
    this.sfx[name] = audio;
  }

  // Play a sound effect
  playSFX(name) {
    if (this.sfx[name]) {
      this.sfx[name].currentTime = 0; // Rewind to start
      this.sfx[name].play();
    }
  }

  setSFXVolume(volume) {
    Object.values(this.sfx).forEach(sfx => {
      sfx.volume = volume;
    });
  }
}

const audioManager = new AudioManager();


*/

class AudioManager {
  constructor() {
    this.bgm = {};
    this.sfx = {};
    this.currentBGM = null;
    this.bgmAudio = new Audio();
    this.bgmAudio.loop = true; // Loop BGM by default
    this.fadeDuration = 1000; // Duration for fade in/out in milliseconds
  }

  // Load a BGM track
  loadBGM(name, src) {
    this.bgm[name] = src;
  }

  // Play a BGM track by name
  playBGM(name) {
    if (this.currentBGM === name) return;
    this.currentBGM = name;
    this.bgmAudio.src = this.bgm[name];
    this.bgmAudio.play();
  }

  // Stop the BGM track
  stopBGM() {
    this.bgmAudio.pause();
    this.bgmAudio.currentTime = 0;
  }

  // Transition to a new BGM track
  async transitionBGM(newBGM) {
    if (this.bgmAudio.src) {
      await this.fadeOut(this.bgmAudio);
    }

    this.currentBGM = newBGM;
    this.bgmAudio.src = this.bgm[newBGM];
    try {
      await this.bgmAudio.play();
      this.fadeIn(this.bgmAudio);
    } catch (error) {
      console.error("Error playing new BGM:", error);
    }
  }

   // Fade out the audio over the specified duration
   fadeOut(audio) {
    return new Promise((resolve) => {
      const step = audio.volume / (this.fadeDuration / 50);
      const fadeInterval = setInterval(() => {
        if (audio.volume > step) {
          audio.volume -= step;
        } else {
          audio.volume = 0;
          clearInterval(fadeInterval);
          resolve();
        }
      }, 50);
    });
  }

  // Fade in the audio over the specified duration
  fadeIn(audio) {
    const step = 1 / (this.fadeDuration / 50);
    audio.volume = 0;
    const fadeInterval = setInterval(() => {
      if (audio.volume < 1 - step) {
        audio.volume += step;
      } else {
        audio.volume = 1;
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  muteBGM() {
    this.bgmAudio.muted = true;
  }

  unmuteBGM() {
    this.bgmAudio.muted = false;
  }

  setBGMVolume(volume) {
    this.bgmAudio.volume = volume;
  }

  // Load a sound effect
  loadSFX(name, src) {
    const audio = new Audio(src);
    audio.volume = 0.5; // Set volume to 50%
    this.sfx[name] = audio;
  }

  // Play a sound effect
  playSFX(name) {
    if (this.sfx[name]) {
      this.sfx[name].currentTime = 0; // Rewind to start
      this.sfx[name].play();
    }
  }

  setSFXVolume(volume) {
    Object.values(this.sfx).forEach(sfx => {
      sfx.volume = volume;
    });
  }
}

// Create an instance of AudioManager
const audioManager = new AudioManager();