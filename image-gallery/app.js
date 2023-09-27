const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const imageContainer = document.getElementById('imageContainer');

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
    img.src = image.urls.regular;
    img.alt = image.description;
    img.classList.add('image');
    imageContainer.appendChild(img);
  });
}

// Event listener for search form submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value;
  if (!query) return;
  const images = await fetchImages(query);
  renderImages(images);
});

searchInput.addEventListener('input', async () => {
  if (searchInput.value === '') {
    const images = await fetchImages();
    renderImages(images);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const images = await fetchImages();
  renderImages(images);
});
