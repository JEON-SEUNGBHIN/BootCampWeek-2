import { movieListAPI } from "./movie.js";

// 언어변경 버튼 선택자 지정
const changeLangBtn = document.getElementById('lang_change_btn');
// const currentPage = window.location.pathname.split("/").pop();

if (changeLangBtn !== null) {
    // 언어변경 버튼에 클릭 이벤트리스너 추가
    changeLangBtn.addEventListener('click', async () => {
        currentLanguage = currentLanguage === 'en-US' ? 'ko-KR' : 'en-US'; // 버튼 클릭 시 현재 언어와 반대로 값을 재할당함
        const viewedMenu = localStorage.getItem('isViewedNow');

        localStorage.setItem('currentLanguage', currentLanguage); // 변경시킨 언어를 로컬 스토리지에 재할당함

        const url = `/3/movie/${viewedMenu}`;
        await movieListAPI(url);
    }
    )
}

// 웹 브라우저 기본 설정 언어를 로컬스토리지에 저장
if (!localStorage.getItem("currentLanguage")) {
    localStorage.setItem("currentLanguage", navigator.language);
    console.log(navigator.language);
}

// 로컬 스토리지에 저장된 언어를 변수에 할당
export let currentLanguage = localStorage.getItem("currentLanguage");