const global = {
  currentPage: window.location.pathname,
};

// Display popular movies on home

const displayPopularMovies = async () => {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?${movie.id}">
            ${
              movie.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
                : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector("#popular-movies").appendChild(div);
  });
};

// Display tv shows

const displayPopularShows = async () => {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?${show.id}">
            ${
              show.poster_path
                ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
                : `<img src="images/no-image.jpg" class="card-img-top" alt="${show.name}" />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        `;

    document.querySelector("#popular-shows").appendChild(div);
  });
};

// Movie details page

const movieDetails = async () => {
  const movieID = window.location.search.split("?")[1];

  const movie = await fetchAPIData(`movie/${movieID}`);

  const div = document.createElement("div");

  div.innerHTML = `<div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
      : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>${movie.overview}</p>
    <h5>Genres</h5>
    <ul class="list-group">
  ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
    <li><span class="text-secondary">Revenue:</span> $${movie.revenue}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} mins</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((productionComp) => `<span>${productionComp.name}</span>`)
    .join("")}</div>
</div>`;

  document.querySelector("#movie-details").appendChild(div);
};

// Show and hide spinner

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};
const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

// Fetch data from TMBD API

const fetchAPIData = async (endpoint) => {
  const API_KEY = "a24b2ac9606b848bb9e2327651bb9912";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&languagr=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
};

// Highlight the active page link

const highlightActiveLink = () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

// Init App

const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/movie-details.html":
      movieDetails();
      break;
    case "/search.html":
      console.log("Search page");
      break;
    case "/shows.html":
      displayPopularShows();
      break;
  }

  highlightActiveLink();
};

init();
