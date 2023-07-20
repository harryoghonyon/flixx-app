const global = {
  currentPage: window.location.pathname,
};

// Display tv shows

const displayTvShows = async () => {
  const results = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <a href="tv-details.html?${show.id}">
        <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Show Title"
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Aired: ${show.first_air_date}</small>
        </p>
      </div>`;

    document.querySelector("#popular-shows").appendChild(div);
  });
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
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
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
      console.log("Movie details");
      break;
    case "/search.html":
      console.log("Search page");
      break;
    case "/shows.html":
      displayTvShows();
      break;
  }

  highlightActiveLink();
};

init();
