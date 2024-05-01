const reviewForm = document.querySelector(".js-reviewForm");
const reviewInput = reviewForm.querySelector(".review-input");
const userIdInput = reviewForm.querySelector(".user-id-input");
const passwordInput = reviewForm.querySelector(".password-input");
const reviewList = document.querySelector(".js-reviewList");
//html문서에서 해당 클래스들 가진 요소를 선택하기 위한 변수들
const REVIEWS_LS = "reviews";
//로컬 스토리지에 리뷰 데이터를 저장할 때 사용할 키 값
let reviews = [];
//리뷰 데이터를 담을 배열을 선언


//리뷰 삭제 함수
function deleteReview(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //이벤트가 발생한 요소와 그 부모요소인 li찾기
  const password = prompt("비밀번호를 입력하세요:");

  if (password !== null && password === reviews[li.id].password) {
    reviewList.removeChild(li);
    //일치 여부 확인 후 리뷰 목록에서 해당 리뷰 삭제
    reviews.splice(li.id, 1);
    //배열에서 해당 리뷰 삭제
    saveReviews();
    //삭제된 리뷰를 로컬 스토리지에 저장
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}

//리뷰 수정 함수(업데이트)
function updateReview(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const password = prompt("비밀번호를 입력하세요:");

  if (password !== null && password === reviews[li.id].password) {
    const newText = prompt("수정할 리뷰를 입력하세요:", reviews[li.id].text);
    if (newText !== null && newText !== "") {
      reviews[li.id].text = newText;
      //배열에 저장된 해당 리븅의 텍스트를 새로운 텍스트로 업데이트
      li.querySelector("span").innerText = newText;
      //화면에 해당 리뷰의 텍스트를 새로운 텍스트로 업데이트
      saveReviews();
      //업데이트된 리뷰를 로컬 스토리지에 저장
    } else {
      alert("리뷰를 입력하세요.");
    }
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}

//리뷰 저장 함수
function saveReviews() {
  localStorage.setItem(REVIEWS_LS, JSON.stringify(reviews));
}
// 로컬 스토리지에 데이터 저장. 각각 key, value 값 (로컬 스토리지에 저장될 리뷰 데이터의 키, 배열인 reviews를 json 문자열로 변환)
// 로컬 스토리지에는 문자열 형태의 데이터만 저장이 가능하기 때문
// 이를 통해 브라우저를 닫았다가 열어도 저장된 리뷰 데이터 유지 가능

//리뷰 표시 함수
function paintReview(text, userId, password) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const updateBtn = document.createElement("button");
  const span = document.createElement("span");
  const timeSpan = document.createElement("span"); // 새로 추가한 부분
  const newId = reviews.length;
  //span은 리뷰의 텍스트를 담을 요소, newID는 새로운 리뷰를 배열에 추가할 때 사용할 새로운 id
  const currentTime = new Date(); // 현재 시간을 얻음

  delBtn.innerText = "리뷰 삭제";
  updateBtn.innerText = "리뷰 수정";
  delBtn.addEventListener("click", deleteReview);
  updateBtn.addEventListener("click", updateReview);
  span.innerText = text;
  timeSpan.innerText = currentTime.toLocaleString(); // 시간을 문자열로 변환하여 출력


  li.appendChild(span);
  li.appendChild(timeSpan); // 시간 추가
  li.appendChild(delBtn);
  li.appendChild(updateBtn);
  //li요소에 각각 요소를 추가하여 화면에 표시
  li.id = newId;
  //새로 생성된 리뷰의 id 할당
  reviewList.appendChild(li);
  //새로 생성된 리뷰를 화면에 추가

  const reviewObj = {
    text,
    userId,
    password,
    time: currentTime.getTime() // 현재 시간을 밀리초로 변환하여 저장
  };
  //새로운 리뷰에 대한 객체 생성

  reviews.push(reviewObj);
  saveReviews();
}
//리뷰 객체를 배열에 추가
//새로운 리뷰가 추가된 배열을 로컬 스토리지에 저장
// => 새로운 리뷰가 입력되면 화면에 표시되고, 해당 정보가 배열에 추가. 화면을 새로고침해도 유지.

//제출되었을 때 호출 함수
function handleSubmit(event) {
  event.preventDefault();
  //기본 제출 동작 막기. 폼이 서버로 제출되는 것을 방지, js에서 정의한 동작 실행
  const currentReview = reviewInput.value;
  const currentUserId = userIdInput.value;
  const currentPassword = passwordInput.value;

  if (currentReview === "" || currentUserId === "" || currentPassword === "") {
    alert("모든 필드를 입력하세요.");
    return;
  }

  if (currentPassword.length < 4) {
    alert("비밀번호는 4자리 이상이어야 합니다.");
    return;
  }

  paintReview(currentReview, currentUserId, currentPassword);
  //입력된 리뷰 내용과 사용자 정보를 기반으로 함수를 호출하여 새로운 리뷰를 화면에 추가
  reviewInput.value = "";
  userIdInput.value = "";
  passwordInput.value = "";
}
//폼 입력 필드 초기화

//로컬 스토리지에서 리뷰 데이터 가져오기
function loadReviews() {
  const loadedReviews = localStorage.getItem(REVIEWS_LS);

  if (loadedReviews !== null) {
    const parsedReviews = JSON.parse(loadedReviews);
    //가져온 리뷰 데이터를 json 형식에서 js객체로 변환
    parsedReviews.forEach(function (review) {
      paintReview(review.text, review.userId, review.password);
    });
  }
}
//변환 된 리뷰 데이터를 순회하며 각 리뷰를 화면에 표시

//초기화 함수
function init() {
  loadReviews();
  //웹페이지가 로드될 때 저장된 리뷰를 로드, 화면에 표시
  reviewForm.addEventListener("submit", handleSubmit);
}

init();
//페이지 초기화. 
