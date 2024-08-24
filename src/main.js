
import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const searchForm = document.querySelector('.search-form');

const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a');


const onSearchFormSubmit = event => {
    event.preventDefault();

    const searchedValue = searchForm.elements.user_query.value.trim();
// Покращення:
// якщо searchedValue є пробілом, функція fetchPhotos все одно викликається,
// що призводить до непотрібного API запиту.
// Потрібно searchedValue перед запитом на бекенд трімнути і перевірити на порожній рядок
    
    if (!searchedValue) {
        iziToast.error({
            message: 'Please enter a valid search query!',
            position: 'topRight',
            maxWidth: '500px',
        });
        return;
    }

    loader.classList.remove('is-hidden');

// коли з бекенда приходить порожній масив, не вимикається лоадер і постійно крутиться.

    fetchPhotos(searchedValue)
        .then(data => {
            // вимкнути лоадер
            loader.classList.add('is-hidden');
                      
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matchings your search query. Please try againe!',
                    position: 'topRight',
                    maxWidth: '500px',
                });

                gallery.innerHTML = '';
                searchForm.reset();

                return;
            }

            // loader.classList.add('is-hidden');

            const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

            gallery.innerHTML = galleryCardsTemplate;
            
            lightbox.refresh();

        })
        .catch(err => {
            console.log(err);
            iziToast.error({
                message: 'Something went wrong. Please try again later!',
                position: 'topRight',
                maxWidth: '500px',
            });
            // вимкнути лоадер у випадку помилки
            loader.classList.add('is-hidden');
        });

};

searchForm.addEventListener('submit', onSearchFormSubmit);

