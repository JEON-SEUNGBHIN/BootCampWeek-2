import { currentLanguage } from "./language.js";

let reviews = [];
const REVIEWS_LS = "reviews";
const $reviewList = document.querySelector("#review-list");
const $modal = document.querySelector("#modal");
const $id = document.querySelector("#modal-id");
const $pw = document.querySelector("#modal-pw");
const $text = document.querySelector("#modal-text");
const $modalOk = document.querySelector('#modal-ok');
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
    reviews = JSON.parse(loadedReviews);
    //가져온 리뷰 데이터를 json 형식에서 js객체로 변환
    reviews.forEach(function (review) {
      paintReview(review.text, review.userId, review.password, review.movieId, review.time, review.reviewId);
    });
  
    $id.placeholder = currentLanguage === 'ko-KR' ? "닉네임" : "Nickname";
    $pw.placeholder = currentLanguage === 'ko-KR' ? "비밀번호" : "Password";
    $text.placeholder = currentLanguage === 'ko-KR' ? "댓글 내용" : "Comments";
    $modalOk.innerText = currentLanguage === 'ko-KR' ? "확인" : "Check";
  }

}

export const modalOk = (e) => {
  const name = e.target.parentNode.parentNode.className;
  const id = e.target.parentNode.parentNode.dataset.id;
  let reviewObject, reviewIndex;
  if (reviews.length !== 0 && id !== undefined) {
    reviewObject = reviews.find((review) => review.reviewId === Number(id));
    reviewIndex = reviews.indexOf(reviewObject);
    console.log("wda", reviews);
  }

  if (name == 'add') {
    console.log("awd");
    if ($pw.value !== "") {
      paintReview($review.value, $id.value, $pw.value, nowMovieId);
    } else {
      alert(currentLanguage === 'ko-KR' ? "비밀번호를 입력해주세요" : "Please enter your password.");

    }
  } else if (name == 'update') {
    if ($pw.value !== null && $pw.value === reviewObject.password && $text.value !== null && $text.value !== "") {
      reviewObject.text = $text.value;
      //배열에 저장된 해당 리븅의 텍스트를 새로운 텍스트로 업데이트
      $reviewList.childNodes[Number(id) + 1].querySelector("p.review-text").innerText = $text.value;
      //화면에 해당 리뷰의 텍스트를 새로운 텍스트로 업데이트
      saveReviews();
      //업데이트된 리뷰를 로컬 스토리지에 저장
    } else {
      alert(currentLanguage === 'ko-KR' ? "비밀번호가 일치하지 않거나 리뷰 내용이 없습니다." : "The password does not match or there is no review.");
    }
  } else if (name == 'del') {
    console.log(reviewObject);
    if ($pw.value !== null && $pw.value === reviewObject.password) {
      $reviewList.childNodes.forEach((e) => {
        if (e.id === id) {
          $reviewList.removeChild(e);
          return false;
        }
      })

      //일치 여부 확인 후 리뷰 목록에서 해당 리뷰 삭제
      reviews.splice(reviewIndex, 1);
      //배열에서 해당 리뷰 삭제
      saveReviews();
      //삭제된 리뷰를 로컬 스토리지에 저장
      alert(currentLanguage === 'ko-KR' ? "삭제되었습니다." : "Deleted successfully.");
    } else {
      alert(currentLanguage === 'ko-KR' ? "비밀번호가 일치하지 않습니다." : "Incorrect password.");
    }
  }
  handleClose();
}

const modal = (name, id = false) => {
  if (id) $modal.dataset.id = id;
  $modal.classList.replace('hidden', name);
  document.body.style.overflow = 'hidden';
}


const saveReviews = () => {
  localStorage.setItem(REVIEWS_LS, JSON.stringify(reviews));
}

const handleDeleteReview = (event) => {
  const btn = event.target;
  //삭제된 리뷰를 로컬 스토리지에 저장
  const li = btn.parentNode.parentNode.parentNode;
  
  modal("del", li.id);
}

const handleUpdateReview = (event) => {
  const btn = event.target;
  const li = btn.parentNode.parentNode.parentNode;
  $text.value = btn.parentNode.parentNode.parentNode.querySelector("p.review-text").innerText;
  modal("update", li.id);
}

const paintReview = (text, userId, password, movieId, currentTime = new Date(), reviewId = reviews.length !== 0 ? reviews[reviews.length - 1].reviewId + 1 : 0) => {
  
  
  if (nowMovieId === movieId) {

    let html =`
    <li class="review" id="${reviewId}">
      <p class="review-name light">${userId}</p>
      <p class="review-text">${text}</p>
      <div class="review-bottom">
        <span class="review-date light">${currentTime.toLocaleString()}</span>
        <div class="review-button">
          <button class="review-delete">${(currentLanguage) === "ko-KR" ? "리뷰 삭제" : "Delete review"}</button>
          <button class="review-update">${(currentLanguage) === "ko-KR" ? "리뷰 수정" : "Edit review"}</button>
        </div>
      </div>
    </li>
    `

    $reviewList.insertAdjacentHTML('afterbegin', html);

    const deleteButtons = document.querySelectorAll(".review-delete");
    const updateeButtons = document.querySelectorAll(".review-update");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
          handleDeleteReview(e);
      });
    });
    updateeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
          handleUpdateReview(e);
      });
    });

    if(reviews.length === 0 || reviewId === reviews[reviews.length - 1].reviewId + 1){
      const reviewObj = {
        reviewId,
        text,
        movieId,
        userId,
        password,
        time: currentTime.toLocaleString()
      };
    
      reviews.push(reviewObj);
      saveReviews();
    }
  }


}


