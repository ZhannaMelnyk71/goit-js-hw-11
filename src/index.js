import Notiflix from 'notiflix';
import { fetchArticles } from './js/fetch_pix.js'
import { createCards } from './js/photo_card.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchText = document.querySelector('input');
const searchButton = document.querySelector('button');
const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const title = document.querySelector('.counter');

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

let page = 1;
const perPage = 30;

function onSearch(event) {
    event.preventDefault();

    let query = event.currentTarget.searchQuery.value.trim()

    gallery.innerHTML = '';

    loadMoreButton.classList.add('is-hidden')

    if (query === '') {
        Notiflix.Notify.failure('Please specify your search query.')
        return;
    }

    fetchArticles(query, page, perPage)
        .then(({ data }) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            } else {
                createCards(data.hits);
                const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, }).refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

                if (data.totalHits > perPage) {
                    loadMoreButton.classList.remove('is-hidden')
                }
            }
        }).catch(error => console.log(error))
}

function onLoadMore() {
    page += 1;
    
    fetchArticles(query, page, perPage).then(({ data }) => {
        createCards(data.hits);
        const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250, })
            .refresh()

    const totalPages = Math.ceil(data.totalHits / perPage)

    if (page > totalPages) {
    loadMoreButton.classList.add('is-hidden')
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    }
})
.catch(error => console.log(error))
}