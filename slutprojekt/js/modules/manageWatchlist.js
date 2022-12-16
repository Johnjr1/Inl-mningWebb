// Detta är en modul jag skapade för att kunna lägga till och radera filmtitlar till databasen och min watchlist.

import { db, collection, addDoc, deleteDoc, doc, } from './firebase.js'

const titleInput = document.querySelector(`#title`);
const genreInput = document.querySelector(`#genre`);
const dateInput = document.querySelector(`#date`);
const addMoviesBtn = document.querySelector(`#addmovie`);

let movie = {
    title: ``,
    genre: ``,
    releasedate: ``
}


async function saveToDatabase(movieTitle, movieGenre, movieDate) {
    if (titleInput.value == ``) {
        alert(`Please fill in the movies title...`)
    } else if (genreInput.value == ``) {
        alert(`Please fill in the movies genre...`)
    } else if (dateInput.value == ``) {
        alert(`Please fill in the movies release date...`)
    } else {
        try {
            await addDoc(collection(db, `movies`), {
                title: movieTitle,
                genre: movieGenre,
                releasedate: movieDate
            })
            alert(`Your movie has successfully been added`)
        } catch (error) {
            console.log(`ERROR`, error);
        }
    }
}

async function saveMovieClick() {
    addMoviesBtn.addEventListener(`click`, async() => {
        const movieTitle = titleInput.value;
        const movieGenre = genreInput.value;
        const movieDate = dateInput.value;

        await saveToDatabase(movieTitle, movieGenre, movieDate)

        let allInputs = document.querySelectorAll(`input`)
        allInputs.forEach(input => {
            input.value = ``;
        })
    })
}


async function removeFromDatabase(movieID) {
    try {
        await deleteDoc(doc(db, `movies`, movieID));
    } catch (error) {
        console.log(`ERROR`, error);
    }
}

async function removeClickEvent() {
    const movieObjects = document.querySelectorAll(`.removie`);

    movieObjects.forEach((movieObject) => {
        movieObject.addEventListener(`click`, async(event) => {
            const movieID = event.target.getAttribute(`movie-id`);
            await removeFromDatabase(movieID);
            alert(`You have successfully removed a movie!`);
        })
    })
}

export { saveMovieClick, removeClickEvent }