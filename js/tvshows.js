import { TMDB_API_KEY, BASE_URL } from "./apikey.js";

const POPULAR_URL =
  BASE_URL + "/discover/tv?sort_by=popularity.desc&" + TMDB_API_KEY;

const ACTION_URL =
  BASE_URL +
  "/discover/tv?&with_genres=10759&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const COMEDY_URL =
  BASE_URL +
  "/discover/tv?&with_genres=35&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const DRAMA_URL =
  BASE_URL +
  "/discover/tv?&with_genres=18&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const ANIMATION_URL =
  BASE_URL +
  "/discover/tv?&with_genres=16&sort_by=popularity.desc&" +
  TMDB_API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const action_list = document.getElementById("action-list");
const comedy_list = document.getElementById("comedy-list");
const drama_list = document.getElementById("drama-list");
const animation_list = document.getElementById("animation-list");
const featured_list = document.getElementById("featured-list");

getMovies(ACTION_URL, action_list);
getMovies(COMEDY_URL, comedy_list);
getMovies(DRAMA_URL, drama_list);
getMovies(ANIMATION_URL, animation_list);

//Show Featured List
showFeaturedMovies(POPULAR_URL, featured_list);
function showFeaturedMovies(url, list) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      list.innerHTML = "";
      data.results.forEach((movie, i) => {
        const { name, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        if (i == 0) {
          movieEl.classList.add("featured-slide");
          movieEl.classList.add("active");
        } else {
          movieEl.classList.add("featured-slide");
        }
        movieEl.innerHTML = `
        <img class="featured-img" src="${IMG_URL + poster_path}" alt="${name}">
          <div class="featured-info">
            <h2>${name}</h2>
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
    const { name, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <form name="wishlist" action="php/wishlist.php" method="POST">
    <input type="hidden" value="${id}" name="movieID" />
    <img class="movie-img" src="${IMG_URL + poster_path}" alt="${name}" />
    <div class="movie-info">
      <span class="movie-title">${name}</span>
      <span class="${getColor(
        vote_average
      )} movie-rating">${vote_average}</span>
    </div>
    <div class="movie-desc">
      ${overview}
    </div>
    <input type="submit" class="movie-wishlist-btn"><img src="./img/favorite_icon.svg" alt="Wishlist"></input>
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
