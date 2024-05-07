import { ApiFetch, handleMovieItemClick } from "./movie.js";
let hearts = JSON.parse(localStorage.getItem("hearts"));

function displayHeartedMovies(heartedList) {
  const pickMovie = document.querySelector(".pick_movie");
  const pickNothing = document.querySelector(".pick_nothing")
  if (heartedList.length === 0) {
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
  if (hearts !== null) {
    for (let i = 0; i < hearts.length; i++) {
      heartedList.push(
        await ApiFetch(`/3/movie/${hearts[i]}?original_language="eu" `)
      );
    }
  }
  displayHeartedMovies(heartedList);

  // 언어변경 기능
  document.getElementById('lang_change_btn_heart').addEventListener('click', async () => {
    (localStorage.getItem("currentLanguage")) === 'en-US' ? localStorage.setItem("currentLanguage", 'ko-KR') : localStorage.setItem("currentLanguage", 'en-US');
    // 이전에 표시된 카드들을 모두 제거
    const pickMovie = document.querySelector(".pick_movie");
    pickMovie.innerHTML = '';
    // 바뀐 언어 정보를 포함하여 API fetch 새로하기, ApiFetch 코드 재사용 안 함 (추후 과제)
    const newMovies = await Promise.all(hearts.map(async (heartId) => {
      const url = `https://api.themoviedb.org/3/movie/${heartId}?original_language=%22eu%22%20&language=${localStorage.getItem("currentLanguage")}&api_key=21ccf5793f9e51cfba0198fa23b3d541`;
      const movieDetails = await fetch(url);
      return movieDetails.json();
    }));
    displayHeartedMovies(newMovies);
  });


};
(function init() {
  getMovies(hearts);
})();
