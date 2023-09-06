const burgerButton = document.querySelector('#header__btn-burger');
const navMenu = document.querySelector('#header__nav-menu');
const navList = document.querySelector('#header__nav-list');

let isNavMenuOpen = false;

export default function initializeBurger() {
  burgerButton.addEventListener('click', toggleMenu);
  document.addEventListener('click', closeMenu);
}

function toggleMenu(event) {
  isNavMenuOpen = !isNavMenuOpen;

  navMenu.classList.toggle('header__nav-menu_open');
  burgerButton.classList.toggle('header__btn-burger_open');

  event.toggledByBurgerHandler = true;
}

function closeMenu(event) {
  if (
    isNavMenuOpen &&
    !event.toggledByBurgerHandler &&
    event.target !== navMenu &&
    event.target !== navList
  ) {
    toggleMenu(event);
  }
}
