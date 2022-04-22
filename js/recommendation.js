import { TMDB_API_KEY, BASE_URL } from "./apikey.js";

const WISHLIST_URL = BASE_URL + "/movie/";
const QUERY_URL =  BASE_URL + "/discover/movie?" + TMDB_API_KEY + "&";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

const main = document.getElementById("page-content");
main.innerHTML = "";
const homeEle = document.createElement("div");
homeEle.classList.add("home-page");

window.movie_details = []
window.TOTAL_LEN = -1

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      store_movies(data);
    });
}

function getQueryMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function store_movies(data) {
    if (data["status_code"] == 34) {
    console.log("Failed to load...");
    } else {
        const { genres, original_language, production_countries, release_date, runtime, vote_average } = data;
        window.movie_details.push([genres, original_language, production_countries, release_date, runtime, vote_average]);
        if( window.movie_details.length == window.TOTAL_LEN) {
            recommend_movie(window.movie_details);
        }
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

// OLD

// function showMovies(data) {
//   if (data["status_code"] == 34) {
//     console.log("Failed to load...");
//   } else {
//     const { title, poster_path, vote_average, overview } = data.results;
//     console.log(title);
//     const movieEl = document.createElement("div");
//     movieEl.classList.add("movie-main-page");
//     movieEl.innerHTML = `
//       <img src="${IMG_URL + poster_path}" alt="${title}" />
  
//       <div class="movie-info-main-page">
//         <h3>${title}</h3>
//         <span class="${getColor(vote_average)}">${vote_average}</span>
//       </div>
  
//       <div class="overview-main-page">
//         <h3>Overview</h3>
//         ${overview}
//       </div>
//       `;
//     homeEle.appendChild(movieEl);
//   }
// }

function recommend_movie(wishlist_movies) {
    var min_date = new Date(wishlist_movies[0][3]);
    var max_date = new Date(wishlist_movies[0][3]);
    var genres_count = {};
    var language_count = {};
    var total_runtime = 0;

    var url_query = '';

    for(var i = 0; i<wishlist_movies.length; i++) {

      var new_date = new Date(wishlist_movies[i][3]);
      if(new_date > max_date) {
        max_date = new_date;
      }
      if(new_date < min_date) {
        min_date = new_date;
      }

      var genres = wishlist_movies[i][0];
      for(var j = 0; j<genres.length; j++) {
        if(genres[j]['id'] in genres_count) {
          genres_count[genres[j]['id']] += 1;
        }
        else {
          genres_count[genres[j]['id']] = 1;
        }
      }
      var language = wishlist_movies[i][1];
      if(language in language_count) {
        language_count[language] += 1;
      }
      else {
        language_count[language] = 1;
      }

      total_runtime += wishlist_movies[i][4];
    }

    url_query += 'primary_release_date.gte='+ formatDate(min_date) + '&primary_release_date.lte=' + formatDate(max_date);

    var best_genre = null;
    var best_genre_score = 0;
    for(const genre in genres_count) {
      var score = genres_count[genre];
      if(score > best_genre_score) {
        best_genre = genre;
        best_genre_score = score;
      }
    }
    url_query += '&with_genres=' + best_genre;
    var most_language = null;
    var most_language_count = 0;
    for(const lang in language_count) {
      var score = language_count[lang];
      if(score > most_language_count) {
        most_language = lang;
        most_language_count = score;
      }
    }

    url_query += '&language=' + most_language;
    
    getQueryMovies(QUERY_URL + url_query);
}

function reqListener() {
  console.log(this.responseText);
}
var oReq = new XMLHttpRequest();
oReq.onload = function () {
  var movies = this.responseText;
  movies.trim();
  movies = movies.slice(1, -1);
  movies = movies.split(",");
  movies.forEach((movie) => {
    var movieID = movie.slice(1, -1);
    if (isNaN(movieID)) {
      movieID = movieID.slice(2);
    }
    getMovies(WISHLIST_URL + movieID + "?" + TMDB_API_KEY);
  });
  main.append(homeEle);
  window.TOTAL_LEN = movies.length;
};
oReq.open("get", "./php/show_wishlist.php", true);
oReq.send();
