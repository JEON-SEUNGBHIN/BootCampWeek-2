let reviews = [];
const REVIEWS_LS = "reviews";

export const handleAddReviews = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    if(e.target[0].value){
        let id = prompt("닉네임");
        if(id){
            let pw = prompt("비밀번호");
            if(pw){
                paintReview(e.target[0].value, id, pw);
            }
        }
    }else {
        alert("감상평을 입력해주세요!");
    }
    e.target[0].value = '';
}

export const loadReviews = () => {
    const loadedReviews = localStorage.getItem(REVIEWS_LS);
  
    if (loadedReviews !== null) {
      const parsedReviews = JSON.parse(loadedReviews);
      //가져온 리뷰 데이터를 json 형식에서 js객체로 변환
      parsedReviews.forEach(function (review) {
        paintReview(review.text, review.userId, review.password);
      });
    }
  }


const saveReviews = () => {
    localStorage.setItem(REVIEWS_LS, JSON.stringify(reviews));
}

const paintReview = (text, userId, password) => {
    console.log(text, userId, password);
    const $reviewList = document.querySelector("#review-list");

    const $newId = reviews.length;
    const currentTime = new Date();
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
  
    $delBtn.innerText = "리뷰 삭제";
    $updateBtn.innerText = "리뷰 수정";
    $delBtn.addEventListener("click", handleAddReviews);
    $updateBtn.addEventListener("click", handleAddReviews);
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
  
    const reviewObj = {
      text,
      userId,
      password,
      time: currentTime.getTime()
    };
  
    reviews.push(reviewObj);
    saveReviews();
  }
  
