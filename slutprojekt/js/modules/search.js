// Detta är en modul för sökfuntionen.

import { db, collection, getDocs, query, where } from './firebase.js'

const mainElem = document.querySelector(`main`);
const searchElem = document.querySelector(`#searchdiv`);
const searchBtn = document.querySelector(`#searchbutton`);
const searchInput = document.querySelector(`#searchinput`);

searchElem.style.display = `none`

async function searchFunction() {
    searchBtn.addEventListener(`click`, () => {
        const searchData = searchInput.value;
        manageSearchData(searchData)
        searchElem.style.display = `flex`
        mainElem.style.display = `none`

        searchElem.addEventListener(`click`, () => {
            searchInput.value = ``;
            searchElem.innerHTML = ``;
            searchElem.style.display = `none`;
            mainElem.style.display = `flex`;
        })
    })
}




async function showTitleSearch(movie) {
    const elem = `
    <h1>SEARCH:</h1>
    <li>
        <h2>TITLE:</h2>
        <h3>${movie.data().title}</h3>
        <br>
        <h2>GENRE:</h2>
        <h3>${movie.data().genre}</h3>
        <br>
        <h2>RELEASE DATE:</h2>
        <h3>${movie.data().releasedate}</h3>
    </li>

        <h1>RETURN</h1>
    `
    searchElem.insertAdjacentHTML(`beforeend`, elem)
}

async function checkIfTitleExists(searchData) {
    try {
        const titleQuery = query(collection(db, `movies`), where(`title`, '==', searchData));
        const result = await getDocs(titleQuery);
        let resultTitle = {};

        result.forEach((title) => {
            resultTitle = title;
        });

        return resultTitle;

    } catch (error) {
        console.log(`ERROR`, error);
    }
}


async function manageSearchData(searchData) {
    const movieName = await checkIfTitleExists(searchData)
    const movieID = movieName.id
    if (movieID) {
        console.log(movieName.data().title);
        showTitleSearch(movieName);
    } else {
        searchElem.style.display = `none`
        mainElem.style.display = `flex`
        alert(`No movie with this title could be found!`)
    }
}

export { searchFunction, mainElem }