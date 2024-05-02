// import { movieListAPI, handleSearch } from "./movie.js";
console.log("heart.js");
const HEART_LS = "hearts";
let hearts = [];

const heartBtn = document.querySelector(".detail_title");
console.log(heartBtn);
function clickHeart(event) {
  // 중복값 방지 조건문
  if (!hearts.includes(event.target.id.toString())) {
    // 찜하지 않은 상태에서 클릭 시 등록 이벤트
    hearts.push(event.target.id);
    localStorage.setItem(HEART_LS, JSON.stringify(hearts));
    alert("찜한 목록에 저장되었습니다.");
    heartBtn.classList.add("clicked");
  } else {
    // 찜한 상태에서 다시 클릭 시 취소 이벤트
    const thisIdx = hearts.indexOf(event.target.id);
    hearts.splice(thisIdx, 1);
    localStorage.setItem(HEART_LS, JSON.stringify(hearts));
    alert("찜한 목록에서 삭제되었습니다.");
    heartBtn.classList.remove("clicked");
  }
  console.log(hearts);
}
heartBtn.addEventListener("click", clickHeart);

// const createHeart = async (movies) => {
//   console.log(movies);
// };
// createHeart();
