const ApiKey = '21ccf5793f9e51cfba0198fa23b3d541';
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

const ApiFetch = async (url) => {
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

const createMovieList = async (movies)  => {
    $movieList.textContent = '';
    const movieListHTML = movies.map((e) =>
        `
        <div class="movie ${e.id}" onClick="alert('영화 id: ${e.id}')">
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
}
