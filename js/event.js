import { movieListAPI } from "./movie.js"

let scrollHeight;
let $searchInput = document.getElementById("search_input");

export const handleMenuSelect = (e) => {
    const targetBtn = e.target.closest('.menu_btn');
    if (targetBtn && !targetBtn.classList.contains('chk')) {
        const $chk = document.querySelector(".chk");
        if (targetBtn.id === "popular") {
            movieListAPI();
        } else if (targetBtn.id === "top_rated") {
            movieListAPI("/3/movie/top_rated?language=en-US&page=1");
        }
        if ($chk) {
            $chk.classList.remove("chk");
        }
        targetBtn.classList.add('chk');
    }
}


export const handleScrollSave = (e) => {
    scrollHeight = e.target.documentElement.scrollTop;
    sessionStorage.setItem("scrollY", scrollHeight);
}
export const handleScrollTop = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export const handleScrollTo = () => {
    $searchInput.focus();
    const scrollY = parseInt(sessionStorage.getItem("scrollY"));
    if(scrollY && scrollY > 0){
        window.scrollTo(0, scrollY);
    }
}   
    