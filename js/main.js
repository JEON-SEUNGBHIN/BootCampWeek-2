import { movieListAPI, handleSearch } from "./movie.js"
import { handleMenuSelect, handleScrollSave, handleScrollTop, handleScrollTo } from "./event.js"

const $pageUp = document.getElementById('pageUp');
const $mainMenus = document.getElementById("main_menus");
const $search = document.getElementById('search');


addEventListener('scroll', handleScrollSave);
$search.addEventListener('submit', handleSearch);
$mainMenus.addEventListener('click', handleMenuSelect);
$pageUp.addEventListener('click', handleScrollTop);

(async function init() {
    await movieListAPI();
    handleScrollTo();
})()


