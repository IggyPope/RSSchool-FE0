const playBtn = document.querySelector('#btn-play-pause');
const audio = document.querySelector('audio');

let isPlaying = false;

playBtn.addEventListener('click', () => {
  isPlaying ? audio.pause() : audio.play();
  isPlaying = !isPlaying;
});
