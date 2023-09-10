import { buyBook } from './profile.js';

const modalOverlay = document.querySelector('#modal-overlay');

let currentlyOpenModal = document.querySelector('.modal_active');

const modalInvokeButtons = document.querySelectorAll('.btn-modal-invoke');
const modalCloseButtons = document.querySelectorAll('.modal__btn-close');

const cardNumberButton = document.querySelector('.modal-profile__card-btn');

const buyCardModal = document.querySelector('#modal-buyCard');
const loginModal = document.querySelector('#modal-login');

export default function initializeModals() {
  modalInvokeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(document.querySelector(`#${button.dataset.modal}`));
    });
  });

  modalOverlay.addEventListener('click', closeModal);

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  cardNumberButton.addEventListener('click', (e) => {
    e.preventDefault();
    copyButtonTextToClipboard(cardNumberButton);
  });

  const buyBookButtons = document.querySelectorAll('.book-card__btn-buy');

  buyBookButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleBuyBookButtonClick(button);
    });
  });
}

function openModal(modal) {
  if (currentlyOpenModal) {
    closeModal();
  }

  currentlyOpenModal = modal;
  modal.classList.add('modal_active');

  modalOverlay.classList.add('modals__overlay_active');
}

export function closeModal() {
  if (currentlyOpenModal) {
    currentlyOpenModal.classList.remove('modal_active');
    currentlyOpenModal = null;

    modalOverlay.classList.remove('modals__overlay_active');
  }
}

function copyButtonTextToClipboard(button) {
  const text = button.textContent;
  navigator.clipboard.writeText(text);

  button.classList.add('tooltip-show');

  setTimeout(() => {
    button.classList.remove('tooltip-show');
  }, 1000);
}

function handleBuyBookButtonClick(button) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    if (currentUser.isCardBought) {
      buyBook(button);
    } else {
      openModal(buyCardModal);
    }
  } else {
    openModal(loginModal);
  }
}
