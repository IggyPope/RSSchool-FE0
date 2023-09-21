import tracks from '../assets/data/tracks.json' assert { type: 'json' };

const lblArtist = document.querySelector('#lbl-artist');
const lblTrack = document.querySelector('#lbl-track');
const lblCurrentTime = document.querySelector('#lbl-current-time');
const lblTrackLength = document.querySelector('#lbl-track-length');
const progressBar = document.querySelector('#progress-bar');

let currentTrack = tracks[0];

let audio = new Audio();

audio.addEventListener('loadeddata', displayTrackProps);

let isPlaying = false;

setTrack(currentTrack);

setInterval(() => {
  lblCurrentTime.textContent = getTimeFromSeconds(audio.currentTime);

  progressBar.setAttribute('value', (audio.currentTime / audio.duration) * 100);
}, 500);

function playPause(event) {
  if (isPlaying) {
    audio.pause();
    event.target.style.backgroundImage =
      "url('./assets/icons/play-circle.svg')";
  } else {
    audio.play();
    event.target.style.backgroundImage =
      "url('./assets/icons/pause-circle.svg')";
  }
  isPlaying = !isPlaying;
}

function nextTrack() {
  const trackId = currentTrack.id;

  let nextTrackId = null;

  if (trackId === tracks.length) {
    nextTrackId = 1;
  } else {
    nextTrackId = trackId + 1;
  }

  currentTrack = getTrackById(nextTrackId);

  setTrack(currentTrack);
}

function prevTrack() {
  const trackId = currentTrack.id;

  let prevTrackId = null;

  if (trackId === 1) {
    prevTrackId = tracks.length;
  } else {
    prevTrackId = trackId - 1;
  }

  currentTrack = getTrackById(prevTrackId);

  setTrack(currentTrack);
}

function setTrack(track) {
  audio.src = `./assets/audio/track${track.id}.mp3`;
}

function displayTrackProps() {
  lblArtist.textContent = currentTrack.artist;
  lblTrack.textContent = currentTrack.title;

  document.documentElement.style.setProperty(
    '--track-image',
    `url(./assets/images/cover${currentTrack.id}.jpg)`
  );

  lblCurrentTime.textContent = getTimeFromSeconds(audio.currentTime);
  lblTrackLength.textContent = getTimeFromSeconds(audio.duration);

  isPlaying && audio.play();
}

function getTimeFromSeconds(seconds) {
  const minutes = String(Math.floor(seconds / 60));
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0');

  return `${minutes}:${secs}`;
}

function getTrackById(id) {
  return tracks.find((track) => track.id === id);
}

export { playPause, nextTrack, prevTrack, setTrack };
