const profileIconButton = document.querySelector('.header__profile');
const profileActionsMenu = document.querySelector('.header__profile-drop-menu');

let isProfileActionsMenuOpen = false;

export default function initializeProfileActions() {
  profileIconButton.addEventListener('click', toggleProfileActionsMenu);
}

function toggleProfileActionsMenu(event) {
  isProfileActionsMenuOpen = !isProfileActionsMenuOpen;

  profileActionsMenu.classList.toggle('header__profile-drop-menu_active');

  isProfileActionsMenuOpen
    ? document.addEventListener('click', closeProfileActionsMenu)
    : document.removeEventListener('click', closeProfileActionsMenu);

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
