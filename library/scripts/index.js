const burgerButton = document.querySelector('#header__btn-burger');
const navMenu = document.querySelector('#header__nav-menu');
let isNavMenuOpen = false;

const closeMenu = (event) => {
  if (event.target !== navMenu) {
    toggleMenu(event);
  }
};

const toggleMenu = (event) => {
  isNavMenuOpen = !isNavMenuOpen;

  navMenu.classList.toggle('header__nav-menu_open');
  burgerButton.classList.toggle('header__btn-burger_open');

  isNavMenuOpen
    ? document.addEventListener('click', closeMenu)
    : document.removeEventListener('click', closeMenu);

  event.stopPropagation();
};

burgerButton.addEventListener('click', toggleMenu);
