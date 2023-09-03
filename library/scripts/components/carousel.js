let position = 0;
let posIndex = 0;
const items = document.querySelectorAll('.carousel__item');
const itemsCount = items.length;
const itemWidth = document.querySelector('.carousel__item').clientWidth;
const container = document.querySelector('.carousel__container');
const containerWidth = container.clientWidth;
const itemsToScroll = 1;
const itemsToShow = containerWidth === 1400 ? 3 : 1;
const track = document.querySelector('.carousel__track');
const gap = track.computedStyleMap().get('column-gap').value;
const btnPrev = document.querySelector('#carouselButtonPrev');
const btnNext = document.querySelector('#carouselButtonNext');
const bullets = document.querySelectorAll('.carousel-pagination__button');

export default function initializeCarousel() {
  btnPrev.addEventListener('click', handleButtonClick);

  btnNext.addEventListener('click', handleButtonClick);

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => handleBulletClick(bullet, index));
  });

  checkButtons();
}

function handleButtonClick(e) {
  if (e.target.getAttribute('disabled') === 'true') return;

  if (e.target === btnPrev) {
    position -= itemsToScroll * (itemWidth + gap);
  } else {
    position += itemsToScroll * (itemWidth + gap);
  }

  setTrackPosition();
}

function handleBulletClick(bullet, bulletIndex) {
  if (bullet.ariaCurrent === 'true') return;

  position = bulletIndex * (itemWidth + gap);

  setTrackPosition();
}

function setTrackPosition() {
  track.style.transform = `translateX(-${position}px)`;

  posIndex = Math.round(position / (itemWidth + gap));

  checkButtons();
}

function checkButtons() {
  btnPrev.setAttribute('disabled', position === 0);
  btnNext.setAttribute(
    'disabled',
    position >= (itemsCount - itemsToShow) * (itemWidth + gap)
  );

  bullets.forEach((bullet, index) => {
    bullet.ariaCurrent = index === posIndex;
  });
}
