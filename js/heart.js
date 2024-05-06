import { ApiFetch, handleMovieItemClick } from "./movie.js";
let hearts = JSON.parse(localStorage.getItem("hearts"));

function displayHeartedMovies(heartedList) {
  const pickMovie = document.querySelector(".pick_movie");
  const pickNothing = document.querySelector(".pick_nothing")
  console.log(heartedList.length)
  if (heartedList.length === 0){
    pickNothing.style.display = 'block'
  }
  heartedList.forEach((e) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie");
    movieItem.dataset.movieId = e.id;
    movieItem.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.id}">
          <div class="hover">
              <h3 class="title bold">${e.title}</h3>
              <p>${e.overview}</p>
              <span>평점: ${e.vote_average}</span>
          </div>
      `;
    movieItem.addEventListener("click", handleMovieItemClick);
    pickMovie.appendChild(movieItem);
  });
}

const getMovies = async (hearts) => {
  let heartedList = [];
  for (let i = 0; i < hearts.length; i++) {
    heartedList.push(
      await ApiFetch(`/3/movie/${hearts[i]}?original_language="eu" `)
    );
  }
  displayHeartedMovies(heartedList);
};
(function init() {
  getMovies(hearts);
})();
