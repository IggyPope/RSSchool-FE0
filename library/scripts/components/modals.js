const modalOverlay = document.querySelector('#modal-overlay');

let currentlyOpenModal = null;

const closeModalButtons = document.querySelectorAll('.modal__btn-close');

const signupModal = document.querySelector('#modal-signup');
const signupButtons = document.querySelectorAll('.btn-signup');

const loginModal = document.querySelector('#modal-login');
const loginButtons = document.querySelectorAll('.btn-login');

export default function initializeModals() {
  signupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(signupModal);
    });
  });

  loginButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModal);
    });
  });

  modalOverlay.addEventListener('click', closeModal);

  closeModalButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
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

function closeModal() {
  if (currentlyOpenModal) {
    currentlyOpenModal.classList.remove('modal_active');
    currentlyOpenModal = null;

    modalOverlay.classList.remove('modals__overlay_active');
  }
}
