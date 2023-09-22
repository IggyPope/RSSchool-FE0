import { playPause, nextTrack, prevTrack, toggleMute } from './player.js';

const playBtn = document.querySelector('#btn-play-pause');
playBtn.addEventListener('click', (e) => playPause(e));

const btnNext = document.querySelector('#btn-next');
btnNext.addEventListener('click', (e) => nextTrack(e));

const btnPrev = document.querySelector('#btn-prev');
btnPrev.addEventListener('click', (e) => prevTrack(e));

const btnMute = document.querySelector('#btn-mute');
btnMute.addEventListener('click', (e) => toggleMute(e));
