import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const MoreBtn = document.querySelector('.MoreBtn');

let query = '';
let page = 1;
let perPage = 15;

// Обробка події надсилання форми
form.addEventListener('submit', async event => {
  event.preventDefault(); // Забороняємо перезавантаження сторінки

  query = event.target.elements['search-text'].value.trim(); // Отримуємо текст пошуку
  if (query === '') return; // Якщо поле порожнє — нічого не робимо

  page = 1; // Скидаємо сторінку на початок (новий пошук)

  await fetchImages(query, page); // Робимо запит
});

// Обробка кнопки "Завантажити ще"
MoreBtn.addEventListener("click", async () => {
  page += 1; // Збільшуємо номер сторінки
  await fetchImages(query, page); // Завантажуємо наступну порцію зображень
});

// Основна функція запиту
async function fetchImages(query, page) {
  showLoader(); // Показуємо індикатор завантаження

  if (page === 1) {
    clearGallery(); // Якщо це перша сторінка — очищаємо попередні результати
  }

  try {
    const { images, totalHits } = await getImagesByQuery(query, page, {perPage }); // Очікуємо на результат

    // Якщо нічого не знайдено (тільки при першому запиті)
    if (images.length === 0 && page === 1) {
      hideLoadMoreButton(); // Ховаємо кнопку "Load more"
      iziToast.show({ // Показуємо повідомлення
        title: 'No results',
        message: "Sorry, no images match your search query.",
        position: "topRight",
        backgroundColor: "#ef4040",
        messageColor: "#fff",
        timeout: 5000,
        progressBar: false,
        close: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
      return; // Припиняємо виконання
    }

    createGallery(images); // Малюємо зображення

    // Якщо це не перша сторінка — прокручуємо вниз
    if (page > 1) {
      const firstImage = document.querySelector('.gallery').firstElementChild;
      if (firstImage) {
        const cardHeight = firstImage.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          left: 0,
          behavior: "smooth",
        });
      }
    }

    // Якщо зображень менше за очікуване або ми вже завантажили все
    if (images.length < perPage || page * perPage >= totalHits) {
      hideLoadMoreButton(); // Ховаємо кнопку
      iziToast.show({ // Показуємо повідомлення про завершення
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        backgroundColor: "#ef4040",
        messageColor: "#fff",
        timeout: 5000,
        progressBar: false,
        close: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      });
    } else {
      showLoadMoreButton(); // Інакше — показуємо кнопку "Load more"
    }

  } catch (error) {
    console.log('Fetch failed:', error); // Лог в консоль (для розробника)

    iziToast.show({ // Повідомлення для користувача
      title: 'Error',
      message: "Something went wrong while fetching images.",
      position: "topRight",
      backgroundColor: "#ef4040",
      messageColor: "#fff",
      timeout: 5000,
      progressBar: false,
      close: true,
      transitionIn: 'fadeInDown',
      transitionOut: 'fadeOutUp',
    });

    hideLoadMoreButton(); // Ховаємо кнопку
  } finally {
    hideLoader(); // Ховаємо лоадер у будь-якому випадку
  }
}