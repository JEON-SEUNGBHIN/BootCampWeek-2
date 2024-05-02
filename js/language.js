// 선택자 지정
const changeLangBtn = document.getElementById('lang_change_btn');

localStorage.setItem("currentLanguage", navigator.language);
console.log(navigator.language);

export let currentLanguage = localStorage.getItem("currentLanguage");
console.log(currentLanguage);

changeLangBtn.addEventListener('click', () => {
    currentLanguage = localStorage.getItem('currentLanguage');
    console.log(currentLanguage);

    currentLanguage = currentLanguage === 'en-US' ? 'ko-KR' : 'en-US';
    localStorage.setItem('currentLanguage', currentLanguage);
    console.log(currentLanguage);
}
)




// // 현재 브라우저의 언어 정보 가져오기
// const browserLanguage = navigator.language;

// // 로컬 스토리지에 언어 정보 저장
// localStorage.setItem('currentLanguage', browserLanguage);

// // 버튼 클릭 시 언어 변경
// const langButton = document.querySelector('.lang_change_btn');

// langButton.addEventListener('click', () => {
//     // 현재 저장된 언어 정보 가져오기
//     let currentLanguage = localStorage.getItem('currentLanguage');
//     console.log(currentLanguage);

//     // 언어 정보 반전하여 저장
//     currentLanguage = currentLanguage === 'en-US' ? 'ko-KR' : 'en-US';
//     localStorage.setItem('currentLanguage', currentLanguage);

//     // 여기서 언어 변경에 따른 작업 수행
//     // 예를 들어 언어 변경 시 UI 업데이트 등의 작업 수행 가능
// });
