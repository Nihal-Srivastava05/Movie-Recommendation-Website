import { TMDB_API_KEY, BASE_URL } from "./apikey.js";

const POPULAR_URL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + TMDB_API_KEY;

const ACTION_URL =
  BASE_URL +
  "/discover/movie?&with_genres=28&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const COMEDY_URL =
  BASE_URL +
  "/discover/movie?&with_genres=35&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const DRAMA_URL =
  BASE_URL +
  "/discover/movie?&with_genres=18&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const CRIME_URL =
  BASE_URL +
  "/discover/movie?&with_genres=80&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const action_list = document.getElementById("action-list");
const comedy_list = document.getElementById("comedy-list");
const drama_list = document.getElementById("drama-list");
const crime_list = document.getElementById("crime-list");
const featured_list = document.getElementById("featured-list");

getMovies(ACTION_URL, action_list);
getMovies(COMEDY_URL, comedy_list);
getMovies(DRAMA_URL, drama_list);
getMovies(CRIME_URL, crime_list);

//Show Featured List
showFeaturedMovies(POPULAR_URL, featured_list);
function showFeaturedMovies(url, list) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      list.innerHTML = "";
      data.results.forEach((movie, i) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        if (i == 0) {
          movieEl.classList.add("featured-slide");
          movieEl.classList.add("active");
        } else {
          movieEl.classList.add("featured-slide");
        }
        movieEl.innerHTML = `
        <img class="featured-img" src="${IMG_URL + poster_path}" alt="${title}">
          <div class="featured-info">
            <h2>${title}</h2>
            <p>${overview}</p>
          </div>
        `;
        list.appendChild(movieEl);
      });
      const navigationButtons = document.createElement("div");
      navigationButtons.classList.add("featured-navigation");
      data.results.forEach((movie, i) => {
        const featuredBtn = document.createElement("div");
        if (i == 0) {
          featuredBtn.classList.add("featured-btn");
          featuredBtn.classList.add("active");
        } else {
          featuredBtn.classList.add("featured-btn");
        }
        navigationButtons.appendChild(featuredBtn);
      });
      list.appendChild(navigationButtons);
      scrollFeatured();
    });
}

// Fetch movies form API
function getMovies(url, list) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results, list);
    });
}

// Display movies on screen
function showMovies(data, list) {
  list.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <form name="wishlist" action="php/wishlist.php" method="POST">
    <input type="hidden" value="${id}" name="movieID" />
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
    <input type="image" class="movie-wishlist-btn" src="./img/favorite_icon.svg" alt="submit">
    </form>
    `;
    list.appendChild(movieEl);
  });
  scrollMovies();
}

// Set Color in rating
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
    const itemNumber = movieLists[i].querySelectorAll("input").length/2;
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

// Featured Section slider
function scrollFeatured() {
  var slides = document.querySelectorAll(".featured-slide");
  var btns = document.querySelectorAll(".featured-btn");
  let currentSlide = 1;

  var manualNav = function (manual) {
    slides.forEach((slide) => {
      slide.classList.remove("active");

      btns.forEach((btn) => {
        btn.classList.remove("active");
      });
    });

    slides[manual].classList.add("active");
    btns[manual].classList.add("active");
  };

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      manualNav(i);
      currentSlide = i;
    });
  });

  // JS for autoplay of featured
  var repeat = function (activeClass) {
    let active = document.getElementsByClassName("active");
    let i = 1;

    var repeater = () => {
      setTimeout(function () {
        [...active].forEach((activeSlide) => {
          activeSlide.classList.remove("active");
        });

        slides[i].classList.add("active");
        btns[i].classList.add("active");
        i++;

        if (slides.length == i) {
          i = 0;
        }
        if (i >= slides.length) {
          return;
        }
        repeater();
      }, 10000);
    };
    repeater();
  };
  repeat();
}
