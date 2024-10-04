import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';

const options = {
  titleSize: '0px',
  messageSize: '16px',
  messageLineHeight: 1.5,
  messageColor: '#fff',
  backgroundColor: '#ef4040',
  position: 'topRight',
  closeOnEscape: true,
  iconUrl: 'bi_x-octagon.svg',
  timeout: 3000,
  class: 'custom-toast-width',
};

const form = document.querySelector('form');
const wrapPhotos = document.querySelector('.wrap-photos');
const loader = document.querySelector('.loader');
const btnMore = document.querySelector('.btm-more');

let page = 1;
let inputValue;

const lightBoxPhotos = new SimpleLightbox('.wrap-photos a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();

  page = 1;
  wrapPhotos.innerHTML = '';

  const inputValue = document.querySelector('input').value.trim();

  if (!inputValue) {
    btnMore.classList.remove('btm-more-active');
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please, try again!',
      ...options,
    });
  } else {
    processingPhoto(inputValue);
  }
});

btnMore.addEventListener('click', () => {
  processingPhoto(undefined, ++page);
});

function processingPhoto(value = inputValue, pageNum = 1) {
  loader.classList.remove('visually-hidden');

  if (pageNum === 1) {
    inputValue = value;
    getPhotos(value)
      .then(photos => {
        if (!photos.hits.length) {
          iziToast.error({
            message: 'Sorry, there are no images matching your search query. Please, try again!',
            ...options,
          });
        } else {
          wrapPhotos.innerHTML = renderPhotos(photos);
          lightBoxPhotos.refresh();
          showCards();
        }
      })
      .finally(() => {
        loader.classList.add('visually-hidden');
        btnMore.classList.add('btm-more-active');
      });
  } else {
    getPhotos(inputValue, pageNum)
      .then(photos => {
        if (photos.hits.length < 15) {
          iziToast.error({
            message: "We're sorry, but you've reached the end of search results.",
            ...options,
          });
          btnMore.classList.remove('btm-more-active');
        }
        wrapPhotos.insertAdjacentHTML('beforeend', renderPhotos(photos));
        showCards().then(() => {
          window.scrollBy({
            top: 850,
            behavior: 'smooth',
          });
        });
        lightBoxPhotos.refresh();
      })
      .finally(() => {
        loader.classList.add('visually-hidden');
      });
  }
}

function showCards() {
  return new Promise(resolve => {
    const photos = document.querySelectorAll('.photo.inactive');
    photos.forEach((photo, index) => {
      photo.classList.remove('inactive');
      setTimeout(() => {
        photo.classList.add('active');
        if (index === 9) {
          resolve();
        }
      }, index * 50);
    });
  });
}
