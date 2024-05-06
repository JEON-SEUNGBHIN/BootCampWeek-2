import { currentLanguage } from "./language.js";

let reviews = [];
const REVIEWS_LS = "reviews";
const $reviewList = document.querySelector("#review-list");
const $modal = document.querySelector("#modal");
const $id = document.querySelector("#modal-id");
const $pw = document.querySelector("#modal-pw");
const $text = document.querySelector("#modal-text");
const $review = document.querySelector("#review");
const urlParams = new URLSearchParams(window.location.search);
const nowMovieId = urlParams.get('id');

export const handleClose = (e) => {
  $modal.classList.replace($modal.className, 'hidden');
  document.body.style.overflow = 'auto';
  $review.value = "";
  $id.value = "";
  $pw.value = "";
  $text.value = "";
}

export const handleAddReviews = (e) => {

  e.preventDefault();

  if (e.target[0].value) {
    modal("add");
  } else {
    alert(currentLanguage === "ko-KR" ? "감상평을 입력해주세요." : "Please write down your review.");
  }
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

export const modalOk = (e) => {
  const name = e.target.parentNode.parentNode.className;
  console.log(name);
  const id = e.target.parentNode.parentNode.dataset.id;
  if (name == 'add') {
    console.log("awd");
    if ($pw.value !== "") {
      console.log($review);
      paintReview($review.value, $id.value, $pw.value, nowMovieId);
    } else {
      alert("빈칸이 존재합니다.")
    }
  } else if (name == 'update') {
    if ($pw.value !== null && $pw.value === reviews[id].password && $text.value !== null && $text.value !== "") {
      reviews[id].text = $text.value;
      //배열에 저장된 해당 리븅의 텍스트를 새로운 텍스트로 업데이트
      $reviewList.childNodes[Number(id) + 1].querySelector("p.review-text").innerText = $text.value;
      //화면에 해당 리뷰의 텍스트를 새로운 텍스트로 업데이트
      saveReviews();
      //업데이트된 리뷰를 로컬 스토리지에 저장
    } else {
      alert("비밀번호가 일치하지 않거나 리뷰 내용이 없습니다.");
    }
  } else if (name == 'del') {
    if ($pw.value !== null && $pw.value === reviews[id].password) {
      $reviewList.childNodes.forEach((e) => {
        if (e.id === id) {
          $reviewList.removeChild(e);
          return false;
        }
      })

      //일치 여부 확인 후 리뷰 목록에서 해당 리뷰 삭제
      reviews.splice(id, 1);
      //배열에서 해당 리뷰 삭제
      saveReviews();
      //삭제된 리뷰를 로컬 스토리지에 저장
      alert("삭제되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
  handleClose();
}

const modal = (name, id = false) => {
  if (id) $modal.dataset.id = id;
  if (name === "update") $text.value = reviews[id].text;
  $modal.classList.replace('hidden', name);
  document.body.style.overflow = 'hidden';
}


const saveReviews = () => {
  localStorage.setItem(REVIEWS_LS, JSON.stringify(reviews));
}

const handelDeleteReview = (event) => {
  const btn = event.target;
  //삭제된 리뷰를 로컬 스토리지에 저장
  // alert(currentLanguage === 'ko-KR' ? "삭제되었습니다." : "Deleted successfully.");
  // alert(currentLanguage === 'ko-KR' ? "비밀번호가 일치하지 않습니다." : "Incorrect password.");
  const li = btn.parentNode.parentNode.parentNode;
  modal("del", li.id);
}

const handleUpdateReview = (event) => {
  const btn = event.target;
  const li = btn.parentNode.parentNode.parentNode;
  modal("update", li.id);
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