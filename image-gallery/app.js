const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const imageContainer = document.getElementById('imageContainer');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-background');
const modalImageContainer = document.querySelector('.modal__image-container');
const modalCloseBtn = document.querySelector('.modal__close-btn');

const ACCESS_KEY = 'AwhGvf6tzyzRjFKmoFDc_2pPHjYyryMCh_5--tLxs4E';

// Function to fetch images from Unsplash API
async function fetchImages(query) {
  const request = new Request(
    `https://api.unsplash.com/${
      query ? 'search/' : ''
    }photos?per_page=30&orientation=landscape${query ? `&query=${query}` : ''}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  const response = await fetch(request);
  const data = await response.json();

  return data.results ?? data;
}

// Function to render images in the image container
function renderImages(images) {
  imageContainer.innerHTML = '';
  images.forEach((image) => {
    const img = document.createElement('img');
    img.id = image.id;
    img.src = image.urls.regular;
    img.alt = image.description;
    img.onclick = openModal;
    img.classList.add('image');
    imageContainer.appendChild(img);
  });
}

// Function to open a modal with the selected image
function openModal(e) {
  modalImageContainer.innerHTML = '';

  const img = document.createElement('img');
  img.src = e.target.src;
  img.alt = e.target.alt;
  img.classList.add('modal-image');
  modalImageContainer.appendChild(img);

  modalBg.classList.add('visible');
  modal.classList.add('visible');
}

// Function to close the modal with an image
function closeModal(e) {
  modalBg.classList.remove('visible');
  modal.classList.remove('visible');
}

// Event listener for search form submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value;
  if (!query) return;
  const images = await fetchImages(query);
  renderImages(images);
});

// Event listener for search input cleanup
searchInput.addEventListener('input', async () => {
  if (searchInput.value === '') {
    const images = await fetchImages();
    renderImages(images);
  }
});

// Event listener to load images upon loading the page
document.addEventListener('DOMContentLoaded', async () => {
  const images = await fetchImages();
  renderImages(images);
});

// Event listeners for closing the modal
modalBg.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
