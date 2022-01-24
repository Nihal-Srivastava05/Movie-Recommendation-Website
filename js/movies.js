import { TMDB_API_KEY, BASE_URL } from "./apikey.js";

const ACTION_URL =
  BASE_URL +
  "/discover/movie?&with_genres=28&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const COMEDY_URL =
  BASE_URL +
  "/discover/movie?&with_genres=35&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const DOCUMENTARY_URL = 
  BASE_URL +
  "/discover/movie?&with_genres=99&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const CRIME_URL = 
  BASE_URL +
  "/discover/movie?&with_genres=80&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const action_list = document.getElementById("action-list");
const comedy_list = document.getElementById("comedy-list");
const documentry_list = document.getElementById("documentary-list");
const crime_list = document.getElementById("crime-list");

getMovies(ACTION_URL, action_list);
getMovies(COMEDY_URL, comedy_list);
getMovies(DOCUMENTARY_URL, documentry_list);
getMovies(CRIME_URL, crime_list);

function getMovies(url, list) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results, list);
    });
}

function showMovies(data, list) {
  list.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img class="movie-img" src="${IMG_URL + poster_path}" alt="${title}" />
    <div class="movie-info">
      <span class="movie-title">${title}</span>
      <span class="${getColor(
        vote_average
      )} movie-rating">${vote_average}</span>
    </div>
    <div class="movie-desc">
      ${overview}
    </div>
    <button class="movie-wishlist-btn"><img src="./img/favorite_icon.svg" alt="Wishlist"></button>
    `;
    list.appendChild(movieEl);
  });
  scrollMovies();
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Scroll for category list
function scrollMovies() {
  const arrows = document.querySelectorAll(".arrow");
  const movieLists = document.querySelectorAll(".movie-list");
  arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("button").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter++;
      if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        movieLists[i].style.transform = `translateX(${
          movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
        }px)`;
      } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });
  });
}