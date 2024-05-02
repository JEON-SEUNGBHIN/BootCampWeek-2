import { currentLanguage } from "./language.js"

const ApiKey = '21ccf5793f9e51cfba0198fa23b3d541';
const ApiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWNjZjU3OTNmOWU1MWNmYmEwMTk4ZmEyM2IzZDU0MSIsInN1YiI6IjY2MmEwZDFkYmYzMWYyMDA5YWUzMzAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNlesGPpMfB6Nt3ZqEFMSIwcE88KWjPts2Waw_I2qp8';

const $movieList = document.querySelector("#movie-list");
let movies;

export const handleSearch = (e) => {
    e.preventDefault();
    let movieSearch = movies.filter((movie) => movie.title.toLowerCase().includes(e.target[0].value.toLowerCase()));
    createMovieList(movieSearch);
}

export const movieListAPI = async (url = `/3/movie/popular?language=${currentLanguage}&page=1`) => {
    const api = await ApiFetch(url);
    movies = api.results;
    await createMovieList(movies);

    // HTML 내부 언어 변경 기능
    const areaLogo = document.getElementById("logo").querySelector("a");
    const areaPopularBtn = document.getElementById("popular");
    const areaTopratedBtn = document.getElementById("top_rated");
    const areaFooter = document.getElementById("footer");
    if (currentLanguage === "en-US") {
        areaLogo.textContent = "Movie Search";
        areaPopularBtn.textContent = "Popular";
        areaTopratedBtn.textContent = "Top Reated";
        areaFooter.textContent = "Copyright © Lee JunHyeok All rights reserved."
    } else if (currentLanguage === "ko-KR") {
        areaLogo.textContent = "영화 검색기";
        areaPopularBtn.textContent = "인기순";
        areaTopratedBtn.textContent = "높은 평점순";
        areaFooter.textContent = "Copyright © 이준혁 All rights reserved."
    }
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
        const response = await fetch(`https://api.themoviedb.org${url}${url.indexOf('?') !== -1 ? "&" : "?"}api_key=${ApiKey}`, options)
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

const createMovieList = async (movies) => {
    $movieList.textContent = '';
    movies.forEach((e) => {
        if (!e.overview) { // overview 값이 없을 때 순회 제외처리
            return;
        }
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie');
        movieItem.dataset.movieId = e.id;
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="${e.id}">
            <div class="hover">
                <h3 class="title bold">${e.title}</h3>
                <p>${e.overview}</p>
                <span>${currentLanguage === 'ko-KR' ? '평점' : 'rating'}: ${e.vote_average}</span>
            </div>
        `;
        movieItem.addEventListener('click', handleMovieItemClick);
        $movieList.appendChild(movieItem);
    });
}