
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


const onSearchFormSubmit = async (event) => {
    event.preventDefault();

    const searchedValue = searchForm.elements.user_query.value.trim();
    
    if (!searchedValue) {
        iziToast.error({
            message: 'Please enter a valid search query!',
            position: 'topRight',
            maxWidth: '500px',
        });
        return;
    }

    loader.classList.remove('is-hidden');

    try {
        const data = await fetchPhotos(searchedValue);

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

        const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

        gallery.innerHTML = galleryCardsTemplate;
            
        lightbox.refresh();

    } catch (error) {
        console.log(err);
        iziToast.error({
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            maxWidth: '500px',
        });
           
        loader.classList.add('is-hidden');    
    }

};

searchForm.addEventListener('submit', onSearchFormSubmit);

