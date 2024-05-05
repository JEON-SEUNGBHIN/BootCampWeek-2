import { currentLanguage } from "./language.js";

let reviews = [];
const REVIEWS_LS = "reviews";
const $reviewList = document.querySelector("#review-list");
const urlParams = new URLSearchParams(window.location.search);
const nowMovieId = urlParams.get('id');

export const handleAddReviews = (e) => {
  e.preventDefault();
  console.log(e.target[0].value);
  if (e.target[0].value) {
    let id = prompt(currentLanguage === "ko-KR" ? "닉네임" : "Nickname");
    if (id) {
      let pw = prompt(currentLanguage === "ko-KR" ? "비밀번호" : "Password");
      if (pw) {
        paintReview(e.target[0].value, id, pw, nowMovieId);
      }
    }
  } else {
    alert(currentLanguage === "ko-KR" ? "감상평을 입력해주세요." : "Please write down your review.");
  }

  e.target[0].value = '';
}

export const loadReviews = () => {
  const loadedReviews = localStorage.getItem(REVIEWS_LS);

  if (loadedReviews !== null) {
    const parsedReviews = JSON.parse(loadedReviews);
    //가져온 리뷰 데이터를 json 형식에서 js객체로 변환
    parsedReviews.forEach(function (review) {
      paintReview(review.text, review.userId, review.password, review.movieId);
    });
  }

}


const saveReviews = () => {
  localStorage.setItem(REVIEWS_LS, JSON.stringify(reviews));
}

const handelDeleteReview = (event) => {
  const btn = event.target;
  const li = btn.parentNode.parentNode.parentNode;
  //이벤트가 발생한 요소와 그 부모요소인 li찾기
  const password = prompt(currentLanguage === "ko-KR" ? "비밀번호를 입력하세요:" : "Enter your password:");

  if (password !== null && password === reviews[li.id].password) {
    $reviewList.removeChild(li);
    //일치 여부 확인 후 리뷰 목록에서 해당 리뷰 삭제
    reviews.splice(li.id, 1);
    //배열에서 해당 리뷰 삭제
    saveReviews();
    //삭제된 리뷰를 로컬 스토리지에 저장
    alert(currentLanguage === 'ko-KR' ? "삭제되었습니다." : "Deleted successfully.");
  } else {
    alert(currentLanguage === 'ko-KR' ? "비밀번호가 일치하지 않습니다." : "Incorrect password.");
  }
}

const handleUpdateReview = (event) => {
  const btn = event.target;
  const li = btn.parentNode.parentNode.parentNode;
  const password = prompt(currentLanguage === 'ko-KR' ? "비밀번호를 입력하세요:" : "Enter your password:");
  console.log(reviews[li.id]);
  if (password !== null && password === reviews[li.id].password) {
    const newText = prompt(currentLanguage === 'ko-KR' ? "수정할 리뷰를 입력하세요:" : "Enter your updated review:", reviews[li.id].text);
    if (newText !== null && newText !== "") {
      reviews[li.id].text = newText;
      //배열에 저장된 해당 리븅의 텍스트를 새로운 텍스트로 업데이트
      li.querySelector("p.review-text").innerText = newText;
      //화면에 해당 리뷰의 텍스트를 새로운 텍스트로 업데이트
      saveReviews();
      //업데이트된 리뷰를 로컬 스토리지에 저장
    } else {
      alert(currentLanguage === 'ko-KR' ? "리뷰를 입력하세요." : "Please write down your review.");
    }
  } else {
    alert(currentLanguage === 'ko-KR' ? "비밀번호가 일치하지 않습니다." : "Incorrect password.");
  }
}

const paintReview = (text, userId, password, movieId) => {

  const $newId = reviews.length;
  const currentTime = new Date();

  if (nowMovieId === movieId) {
    const $review = document.createElement("li");
    const $reviewBottom = document.createElement("div");
    const $btns = document.createElement("div");
    const $delBtn = document.createElement("button");
    const $updateBtn = document.createElement("button");
    const $id = document.createElement("p");
    const $text = document.createElement("p");
    const $timeSpan = document.createElement("span");

    $review.classList.add('review');
    $reviewBottom.classList.add('review-bottom');
    $btns.classList.add('review-button');
    $delBtn.classList.add('review-delete');
    $updateBtn.classList.add('review-update');
    $id.classList.add('review-name');
    $text.classList.add('review-text');
    $timeSpan.classList.add('review-date');

    $delBtn.innerText = (currentLanguage) === "ko-KR" ? "리뷰 삭제" : "Delete review";
    $updateBtn.innerText = (currentLanguage) === "ko-KR" ? "리뷰 수정" : "Edit review";;
    $delBtn.addEventListener("click", handelDeleteReview);
    $updateBtn.addEventListener("click", handleUpdateReview);
    $id.innerText = userId; // 내용 설정
    $text.innerText = text; // 내용 설정
    $timeSpan.innerText = currentTime.toLocaleString();

    $id.classList.add('light');
    $timeSpan.classList.add('light');

    $review.appendChild($id);
    $review.appendChild($text);
    $review.appendChild($reviewBottom);
    $reviewBottom.appendChild($timeSpan);
    $reviewBottom.appendChild($btns);
    $btns.appendChild($delBtn);
    $btns.appendChild($updateBtn);

    $review.id = $newId;
    $reviewList.appendChild($review);
  }

  const reviewObj = {
    text,
    movieId,
    userId,
    password,
    time: currentTime.getTime()
  };

  reviews.push(reviewObj);
  saveReviews();
}