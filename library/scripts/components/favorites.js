const seasonsForm = document.querySelector('.favorites__seasons-form');

const seasonSelectors = document.querySelectorAll('.favorites__season-radio');
let currentSeasonSelector = seasonSelectors[0];

const seasonContent = document.querySelectorAll('.favorites__content');
let currentSeasonContent = seasonContent[0];

export default function initializeFavoritesSlider() {
  currentSeasonSelector.checked = true;
  currentSeasonContent.classList.add('fade-in');

  seasonsForm.addEventListener('change', handleSeasonChange);
}

function handleSeasonChange(event) {
  const season = event.target.value;
  switchSeasonContent(season);
}

function switchSeasonContent(season) {
  currentSeasonContent = document.querySelector(`#content-${season}`);

  seasonContent.forEach((content) => {
    content.classList.remove('fade-in');
  });

  currentSeasonContent.classList.add('fade-in');
}
