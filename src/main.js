import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const input = document.querySelector('.search-input');
const gallery = document.getElementById('gallery');
const form = document.querySelector('.search-form');
const lightbox = new SimpleLightbox('.gallery li > a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const loadMoreBtn = document.getElementById('load-more');

let page = 1;
let currentQ = '';

async function searchImages() {
  const q = input.value.trim();
  let loader;

  if (q !== '' && q !== currentQ) {
    page = 1;
    currentQ = q;
    gallery.innerHTML = '';
    loader = document.getElementById('loader-container');
  } else {
    loader = document.getElementById('loader-more-container');
  }

  const apiKey = '45978686-70839b27c443bdf6e9ef42e3a';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    loader.classList.remove('hidden');

    const response = await axios.get(url);
    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      displayImages(data.hits);
      loadMoreBtn.classList.remove('hidden');
      page++;
    }
  } catch (error) {
    iziToast.error({
      title: '',
      message: `Sorry, ${error.message}! Please try again!`,
      position: 'topRight',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
}

function displayImages(images) {
  const galleryHtml = images.map(image => {
    return `
    <li class="card">
  <a href="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}" />
  </a>
  <div class="info">
    <p class="info-text"><b>Likes</b> ${image.likes}</p>
    <p class="info-text"><b>Views</b> ${image.views}</p>
    <p class="info-text"><b>Comments</b> ${image.comments}</p>
    <p class="info-text"><b>Downloads</b> ${image.downloads}</p>
  </div>
</li>
    
    `;
  });

  gallery.innerHTML += galleryHtml.join('');
  lightbox.refresh();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  searchImages();
});
