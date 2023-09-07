import { closeModal } from './modals.js';

const profileIconButton = document.querySelector('.header__profile-icon');
const profileActionsMenu = document.querySelector('.header__profile-drop-menu');

let isProfileActionsMenuOpen = false;

const signupForm = document.forms.signupForm;
const loginForm = document.forms.loginForm;

export default function initializeProfileActions() {
  profileIconButton.addEventListener('click', toggleProfileActionsMenu);
  document.addEventListener('click', closeProfileActionsMenu);

  signupForm.addEventListener('submit', registerUser);
}

function toggleProfileActionsMenu(event) {
  isProfileActionsMenuOpen = !isProfileActionsMenuOpen;

  profileActionsMenu.classList.toggle('header__profile-drop-menu_active');

  event.toggledByProfileHandler = true;
}

function closeProfileActionsMenu(event) {
  if (
    isProfileActionsMenuOpen &&
    !event.toggledByProfileHandler &&
    event.target !== profileActionsMenu &&
    event.target !== profileActionsMenu.children[0]
  ) {
    toggleProfileActionsMenu(event);
  }
}

function registerUser(event) {
  event.preventDefault();

  let newUser = {};

  const formData = new FormData(event.target);
  const entries = formData.entries();

  for (const pair of entries) {
    newUser[pair[0]] = pair[1];
  }

  newUser.cardNumber = generateCardNumber();

  newUser.initials =
    newUser.firstName.charAt(0).toUpperCase() +
    newUser.lastName.charAt(0).toUpperCase();

  let registeredUsers = JSON.parse(localStorage.getItem('users')) || [];

  registeredUsers.push(newUser);

  localStorage.setItem('users', JSON.stringify(registeredUsers));

  closeModal();
}

function generateCardNumber() {
  const cardNumber = Array.from({ length: 9 }, () =>
    '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16))
  ).join('');

  return cardNumber;
}
