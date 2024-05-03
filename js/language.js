import { movieListAPI } from "./movie.js";

// 언어변경 버튼 선택자 지정
const changeLangBtn = document.getElementById('lang_change_btn');

// 웹 브라우저 기본 설정 언어를 로컬스토리지에 저장
if (!localStorage.getItem("currentLanguage")) {
    localStorage.setItem("currentLanguage", navigator.language);
    console.log(navigator.language);
}

// 로컬 스토리지에 저장된 언어를 변수에 할당
export let currentLanguage = localStorage.getItem("currentLanguage");
console.log(currentLanguage); // 현재 기본 언어 콘솔 출력

// 언어변경 버튼에 클릭 이벤트리스너 추가
changeLangBtn.addEventListener('click', async () => {
    currentLanguage = currentLanguage === 'en-US' ? 'ko-KR' : 'en-US'; // 버튼 클릭 시 현재 언어와 반대로 값을 재할당함
    localStorage.setItem('currentLanguage', currentLanguage); // 변경시킨 언어를 로컬 스토리지에 재할당함
    console.log(currentLanguage);  // 버튼 눌러서 변경된 언어 콘솔 출력

    await movieListAPI(`/3/movie/popular?language=${currentLanguage}&page=1`); // 변경된 국가 코드로 API URL 수정 후 movieListAPI 함수 호출 (카드 다시 뿌리기)
}
)