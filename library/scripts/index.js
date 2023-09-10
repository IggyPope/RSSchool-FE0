import initializeBurger from './components/burger.js';
import printSelfCheck from './components/self-check.js';
import initializeCarousel from './components/carousel.js';
import initializeFavoritesSlider from './components/favorites.js';
import initializeProfileActions from './components/profile.js';
import initializeModals from './components/modals.js';
import loadBooksContent from './components/books.js';

loadBooksContent();
initializeBurger();
printSelfCheck();
initializeCarousel();
initializeFavoritesSlider();
initializeProfileActions();
initializeModals();
