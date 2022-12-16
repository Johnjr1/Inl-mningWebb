// Detta är en modul för att kunna hämta och visa filmerna i min watchlist som jag sparat på firebase.

import { db, collection, getDocs, } from './firebase.js'
import { removeClickEvent } from './manageWatchlist.js';
import { mainElem } from './search.js';


const watchlistDiv = document.querySelector(`#watchlistDiv`);
watchlistDiv.style.display = `none`;


const displayBtn = document.querySelector(`#displaybutton`);


async function displayWatchlistDiv() {
    displayBtn.addEventListener(`click`, async() => {
        watchlistDiv.style.display = `grid`;
        watchlistDiv.innerHTML = `
        <section>
        <h1>Watchlist:</h1>
        </section>
        `
        getMovies()
        mainElem.style.display = `none`;

        watchlistDiv.addEventListener(`click`, () => {
            watchlistDiv.style.display = `none`;
            mainElem.style.display = `flex`;
        })
    })
}

async function getMovies() {
    const allMovies = await getDocs(collection(db, `movies`));
    allMovies.forEach((movie) => {
        const elem = `
        <li>
        <h2>Title:</h2>
        <h3>${movie.data().title}</h3>
        <br>
        <h2>Genre:</h2>
        <h3>${movie.data().genre}</h3>
        <br>
        <h2>Release date:</h2>
        <h3>${movie.data().releasedate}</h3>
        <button movie-id='${movie.id}' class='removie'>Remove movie</button>
        </li>
        `
        watchlistDiv.insertAdjacentHTML(`beforeend`, elem)
    })
    removeClickEvent();
}

getMovies();

export { displayWatchlistDiv }