import { movieListAPI } from "./movie.js";

const changeLangBtn = document.getElementById('lang_change_btn');

localStorage.setItem("currentLanguage", navigator.language);
console.log(navigator.language);

export let currentLanguage = localStorage.getItem("currentLanguage");
console.log(currentLanguage);

changeLangBtn.addEventListener('click', async () => {
    currentLanguage = localStorage.getItem('currentLanguage');
    console.log(currentLanguage);

    currentLanguage = currentLanguage === 'en-US' ? 'ko-KR' : 'en-US';
    localStorage.setItem('currentLanguage', currentLanguage);
    console.log(currentLanguage);

    await movieListAPI(`/3/movie/popular?language=${currentLanguage}&page=1`);
}
)