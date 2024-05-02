export const ApiKey = '21ccf5793f9e51cfba0198fa23b3d541';
const ApiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWNjZjU3OTNmOWU1MWNmYmEwMTk4ZmEyM2IzZDU0MSIsInN1YiI6IjY2MmEwZDFkYmYzMWYyMDA5YWUzMzAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNlesGPpMfB6Nt3ZqEFMSIwcE88KWjPts2Waw_I2qp8';

const $movieList = document.querySelector("#movie-list");
let movies;

export const handleSearch = (e) => {
    e.preventDefault();
    let movieSearch = movies.filter((movie) => movie.title.toLowerCase().includes(e.target[0].value.toLowerCase()));
    createMovieList(movieSearch);
}

export const movieListAPI = async (url = "/3/movie/popular?language=en-US&page=1") => {
    const api = await ApiFetch(url);
    movies = api.results;
    await createMovieList(movies);
} 

export const ApiFetch = async (url) => {
    let json;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // Authorization: `Bearer ${ApiToken}`
          }
      };

      try {
          const response = await fetch(`https://api.themoviedb.org${url}${ url.indexOf('?')!==-1?"&":"?" }api_key=${ApiKey}`, options)
          json = await response.json();
      } catch (error) {
        console.error(error);
      }
    return json;
}

export const handleMovieItemClick = (e) => {
  const movieId = e.currentTarget.dataset.movieId; // 클릭된 영화 아이템의 데이터 속성에서 영화 ID 가져오기
  window.location.href = `detail.html?id=${movieId}`; // detail.html로 이동하면서 영화 ID를 쿼리 파라미터로 전달
}

const createMovieList = async (movies)  => {
  $movieList.innerHTML = '';
  const movieListHTML = movies.map((e) =>
      `
      <div class="movie ${e.id}" data-movie-id="${e.id}">
          <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.id}">
          <div class="hover">
              <h3 class="title bold">
              ${e.title}
              </h3>
              <p>
              ${e.overview}
              </p>
              <span>평점: ${e.vote_average}</span>
          </div>
      </div>
      `
  ).join("");
  $movieList.insertAdjacentHTML('beforeend', movieListHTML);

  // 각 영화 항목에 클릭 이벤트 리스너 추가
  const movieItems = document.querySelectorAll('.movie');
  movieItems.forEach((movieItem) => {
      movieItem.addEventListener('click', handleMovieItemClick);
  });
}
