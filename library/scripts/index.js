const burgerButton = document.querySelector('#header__btn-burger');
const navMenu = document.querySelector('#header__nav-menu');

burgerButton.addEventListener('click', () => {
  navMenu.classList.toggle('header__nav-menu_open');
  burgerButton.classList.toggle('header__btn-burger_open');
});
