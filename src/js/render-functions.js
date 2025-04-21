import { getImagesByQuery } from './pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

function createGallery(images) {
  const markup = images.map(image => `
  <li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">
      <img
        class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
      />
    </a>
    <div class="info">
        <p><b>Likes</b> ${image.likes}</p>
        <p><b>Views</b> ${image.views}</p>
        <p><b>Comments</b> ${image.comments}</p>
        <p><b>Downloads</b> ${image.downloads}</p>
      </div>
  </li>`).join("");

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    scrollZoom: true
  });

  lightbox.refresh();
}

function clearGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = '';  
}

function showLoader() {
  const loader = document.querySelector(".loader"); 
  loader.classList.add("is-visible");  
}
function hideLoader() {
  const loader = document.querySelector(".loader"); 
  loader.classList.remove("is-visible"); 
}

function showLoadMoreButton() {
  const MoreBtn = document.querySelector(".MoreBtn"); 
  MoreBtn.classList.add("is-visible");  
}

function hideLoadMoreButton(){
  const MoreBtn = document.querySelector(".MoreBtn"); 
  MoreBtn.classList.remove("is-visible"); 
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};