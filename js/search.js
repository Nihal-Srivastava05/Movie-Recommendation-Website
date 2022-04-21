import { TMDB_API_KEY, BASE_URL, TMDB_API_URL } from "./apikey.js";

const main = document.getElementById("page-content");
const form = document.getElementById("search-form");
const search = document.getElementById("search_box");

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+TMDB_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

const SEARCH_URL =
  BASE_URL +
  "/search/movie?" +
  TMDB_API_KEY;

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

// Display movies on screen
function showMovies(data) {
  main.innerHTML = '';
  const homeEle = document.createElement("div");
  homeEle.classList.add('home-page');
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie-main-page");
    movieEl.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}" />

    <div class="movie-info-main-page">
      <h3>${title}</h3>
      <span class="${getColor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview-main-page">
      <h3>Overview</h3>
      ${overview}
    </div>
    `;
    homeEle.appendChild(movieEl);
  });
  main.append(homeEle);
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
      getMovies(SEARCH_URL + '&query='+searchTerm)
  }else {
      getMovies(API_URL)
  }
});
