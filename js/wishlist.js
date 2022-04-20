import { TMDB_API_KEY, BASE_URL } from "./apikey.js";

const WISHLIST_URL = BASE_URL + "/movie/";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

const main = document.getElementById("page-content");
main.innerHTML = "";
const homeEle = document.createElement("div");
homeEle.classList.add("home-page");

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data);
    });
}

function showMovies(data) {
  if (data["status_code"] == 34) {
    console.log("Failed to load...");
  } else {
    const { title, poster_path, vote_average, overview } = data;
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
  }
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

function reqListener() {
  console.log(this.responseText);
}
var oReq = new XMLHttpRequest();
oReq.onload = function () {
  var movies = this.responseText;
  movies = movies.slice(1, -1);
  movies = movies.split(",");
  movies.forEach((movie) => {
    var movieID = movie.slice(1, -1);
    getMovies(WISHLIST_URL + movieID + "?" + TMDB_API_KEY);
  });
  main.append(homeEle);
};
oReq.open("get", "./php/show_wishlist.php", true);
oReq.send();
