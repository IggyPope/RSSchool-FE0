import tracks from '../assets/data/tracks.json' assert { type: 'json' };

const lblArtist = document.querySelector('#lbl-artist');
const lblTrack = document.querySelector('#lbl-track');

let currentTrack = tracks[0];

let audio = new Audio();

let isPlaying = false;

setTrack(currentTrack);

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
  lblArtist.textContent = track.artist;
  lblTrack.textContent = track.title;

  document.documentElement.style.setProperty(
    '--track-image',
    `url(./assets/images/cover${track.id}.jpg)`
  );

  audio.src = `./assets/audio/track${track.id}.mp3`;
}

function getTrackById(id) {
  return tracks.find((track) => track.id === id);
}

export { playPause, nextTrack, prevTrack, setTrack };
