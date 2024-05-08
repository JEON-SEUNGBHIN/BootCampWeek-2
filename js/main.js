import { movieListAPI, handleSearch } from "./movie.js"
import { handleMenuSelect, handleScrollSave, handleScrollTop, handleScrollTo } from "./event.js"

const $pageUp = document.getElementById('pageUp');
const $mainMenus = document.getElementById("main_menus");
const $search = document.getElementById('search');
const $searchInput = document.getElementById('search_input');


addEventListener('scroll', handleScrollSave);
$search.addEventListener('submit', handleSearch);
$mainMenus.addEventListener('click', handleMenuSelect);
$pageUp.addEventListener('click', handleScrollTop);

(async function init() {    
    await movieListAPI();
    handleScrollTo();

    
    if(localStorage.getItem('search') !== null){
        $searchInput.value = localStorage.getItem('search');
        localStorage.removeItem('search');
        $search.dispatchEvent(new Event('submit'));
    }
})()

