import { closeModal } from './modals.js';

const profileIconButtons = document.querySelectorAll('.profile-btn');
const profileActionsMenu = document.querySelector('.header__profile-menu');
const profileMenuLinks = document.querySelectorAll('.profile-menu__link');
const profileMenuHeading = document.querySelector('.profile-menu__heading');
const modalProfileIcon = document.querySelector('.modal-profile__profile-icon');
const modalProfileName = document.querySelector('.modal-profile__reader-name');
const cardNumberDisplays = document.querySelectorAll('.card-number__display');

let isProfileActionsMenuOpen = false;

const signupForm = document.forms.signupForm;
const loginForm = document.forms.loginForm;
const findCardForm = document.forms.findCardForm;
const buyCardForm = document.forms.buyCardForm;

const findCardButton = document.querySelector('.dlc__btn-find-card');
const profileStats = document.querySelector('.dlc__profile-stats');

const buyCardBtn = buyCardForm.querySelector('#buy-card-btn');
const buyCardFormInputs = Array.from(buyCardForm.querySelectorAll('input'));

const visitsCountDisplay = document.querySelectorAll('.visits-count');
const booksCountDisplay = document.querySelectorAll('.books-count');

const dlcSectionSubHeading = document.querySelector('.dlc__find-card-header');
const dlcGetCardSections = document.querySelectorAll(
  '.dlc__get-card-container'
);

export default function initializeProfileActions() {
  profileIconButtons.forEach((button) => {
    button.addEventListener('click', toggleProfileActionsMenu);
  });

  document.addEventListener('click', closeProfileActionsMenu);

  loginForm.addEventListener('submit', loginUser);

  signupForm.addEventListener('submit', registerUser);

  buyCardForm.addEventListener('submit', buyCard);
  buyCardFormInputs.forEach((input) => {
    input.addEventListener('input', handleBuyCardFormChange);
  });

  findCardForm.addEventListener('submit', checkCard);

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    authorizeUser(currentUser);
  }
}

function toggleProfileActionsMenu(event) {
  isProfileActionsMenuOpen = !isProfileActionsMenuOpen;

  profileActionsMenu.classList.toggle('header__profile-menu_active');

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

function loginUser(event) {
  event.preventDefault();

  let user = {};

  const formData = new FormData(event.target);

  user.id = formData.get('id');
  user.password = formData.get('password');

  authenticateUser(user.id, user.password);

  closeModal();
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

  newUser.visits = 0;

  newUser.books = [];

  newUser.initials =
    newUser.firstName.charAt(0).toUpperCase() +
    newUser.lastName.charAt(0).toUpperCase();

  newUser.isCardBought = false;

  addUserToLocalStorage(newUser);

  authenticateUser(newUser.cardNumber, newUser.password);

  closeModal();
}

function addUserToLocalStorage(user) {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  storedUsers.push(user);

  localStorage.setItem('users', JSON.stringify(storedUsers));
}

function authenticateUser(id, password) {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  let user = null;

  if (id.includes('@')) {
    user = storedUsers.find((user) => user.email === id);
  } else {
    user = storedUsers.find((user) => user.cardNumber === id);
  }

  if (user && user.password === password) {
    authorizeUser(user);
  } else {
    alert('Wrong credentials!');
  }
}

function authorizeUser(user) {
  user.visits += 1;

  localStorage.setItem('currentUser', JSON.stringify(user));

  profileIconButtons.item(1).innerHTML = user.initials;
  profileIconButtons
    .item(1)
    .setAttribute('title', `${user.firstName} ${user.lastName}`);

  modalProfileIcon.innerHTML = user.initials;
  modalProfileName.innerHTML = `${user.firstName} ${user.lastName}`;

  cardNumberDisplays.forEach((element) => {
    element.textContent = user.cardNumber;
  });

  profileMenuHeading.setAttribute('style', 'font-size: 12px');

  profileIconButtons.forEach((button) => {
    button.classList.toggle('profile-btn_disabled');
  });

  profileMenuLinks.forEach((link) => {
    link.classList.toggle('profile-menu__link_disabled');
  });

  dlcSectionSubHeading.innerHTML = 'Your Library card';

  findCardForm.elements.readerName.value = user.firstName + ' ' + user.lastName;
  findCardForm.elements.cardNumber.value = user.cardNumber;

  visitsCountDisplay.forEach((display) => {
    display.innerHTML = user.visits;
  });

  booksCountDisplay.forEach((display) => {
    display.innerHTML = user.books.length;
  });

  findCardButton.classList.add('display-none');
  profileStats.classList.remove('display-none');

  dlcGetCardSections.forEach((section) =>
    section.classList.toggle('display-none')
  );
}

function checkCard(event) {
  console.log('Check card');
  event.preventDefault();

  const readerName = findCardForm.elements.readerName.value;
  const cardNumber = findCardForm.elements.cardNumber.value;

  const user = getUserByNameAndCardNumber(readerName, cardNumber);

  if (user) {
    visitsCountDisplay[0].innerHTML = user.visits;
    booksCountDisplay[0].innerHTML = user.books.length;

    findCardButton.classList.add('display-none');
    profileStats.classList.remove('display-none');

    setTimeout(() => {
      findCardButton.classList.remove('display-none');
      profileStats.classList.add('display-none');

      visitsCountDisplay[0].innerHTML = '';
      booksCountDisplay[0].innerHTML = '';
    }, 10000);
  } else {
    alert('Wrong credentials!');
  }
}

function getUserByNameAndCardNumber(name, cardNumber) {
  let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const [firstName, lastName] = name.split(' ');

  return storedUsers.find(
    (user) =>
      user.firstName === firstName &&
      user.lastName === lastName &&
      user.cardNumber === cardNumber
  );
}

function generateCardNumber() {
  const cardNumber = Array.from({ length: 9 }, () =>
    '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16))
  ).join('');

  return cardNumber;
}

function handleBuyCardFormChange() {
  if (buyCardFormInputs.every((input) => input.value)) {
    buyCardBtn.removeAttribute('disabled');
  } else {
    buyCardBtn.setAttribute('disabled', true);
  }
}

function buyCard(event) {
  event.preventDefault();

  if (buyCardFormInputs.every((input) => input.validity.valid)) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.isCardBought = true;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeModal();
  }
}
