console.log(
  'Вёрстка валидная 10/10\nВёрстка семантическая 16/16\nВёрстка соответствует макету 54/54\nОбщие требования к верстке 20/20\nИтого: 100/100'
);

const burgerButton = document.querySelector('#header__btn-burger');
const navMenu = document.querySelector('#header__nav-menu');

burgerButton.addEventListener('click', () => {
  navMenu.classList.toggle('header__nav-menu_open');
  burgerButton.classList.toggle('header__btn-burger_open');
});
