
import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let lightbox = new SimpleLightbox('.gallery a');
let currentPage = 1;
let searchedValue = '';
let totalHits = 0;


const onSearchFormSubmit = async (event) => {
    event.preventDefault();

    searchedValue = searchForm.elements.user_query.value.trim();
    
    if (!searchedValue) {
        iziToast.error({
            message: 'Please enter a valid search query!',
            position: 'topRight',
            maxWidth: '500px',
        });
        return;
    }

    currentPage = 1;

    loadMoreBtn.classList.add('is-hidden');

    loader.classList.remove('is-hidden');

    try {
        const data = await fetchPhotos(searchedValue, currentPage);

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

        totalHits = data.totalHits;

        const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');
        gallery.innerHTML = galleryCardsTemplate;
            
        lightbox.refresh();

        if (currentPage * 15 >= totalHits) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                maxWidth: '500px',
            });
        } else {
            loadMoreBtn.classList.remove('is-hidden');
        }
        
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

const onLoadMoreBtnClick = async event => {
    currentPage++;
    loader.classList.remove('is-hidden');

    try {
        const data = await fetchPhotos(searchedValue, currentPage);
       
        loader.classList.add('is-hidden');

        const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

        gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);
            
        lightbox.refresh();

        if (currentPage * 15 >= totalHits) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                maxWidth: '500px',
            });
        } 

    } catch (error) {
        console.log(error);
        iziToast.error({
            message: 'Something went wrong. Please try again later!',
            position: 'topRight',
            maxWidth: '500px',
        });
           
        loader.classList.add('is-hidden');
     };
}

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

