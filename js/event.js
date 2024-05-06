import { currentLanguage } from "./language.js";
import { movieListAPI } from "./movie.js"

let scrollHeight;
let $searchInput = document.getElementById("search_input");

// 로컬 스토리지 활용 index.html '인기순', '높은 평점순' 기본값 지정 및 재할당 준비
localStorage.setItem('isViewedNow', 'popular');
export let setViewedMenu = (menu) => {
    localStorage.setItem('isViewedNow', menu);
}
export let isViewedNow = localStorage.getItem("isViewedNow");
console.log(isViewedNow);

export const handleMenuSelect = (e) => {
    const targetBtn = e.target.closest('.menu_btn');
    if (targetBtn && !targetBtn.classList.contains('chk')) {
        const $chk = document.querySelector(".chk");
        if (targetBtn.id === "popular") {
            setViewedMenu("popular");
            movieListAPI();
        } else if (targetBtn.id === "top_rated") {
            setViewedMenu("top_rated");
            movieListAPI(`/3/movie/top_rated?&page=1`);
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
    if (scrollY && scrollY > 0) {
        window.scrollTo(0, scrollY);
    }
}
