function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, ctx.currentTime);
  oscillator.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.1);
}

function enableButtonSounds() {
  const clickable = document.querySelectorAll('a, button');
  clickable.forEach(el => {
    el.addEventListener('click', () => playBeep());
  });
}

document.addEventListener('DOMContentLoaded', enableButtonSounds);
