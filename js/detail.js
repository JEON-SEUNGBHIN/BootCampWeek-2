// detail.js

// API 키
const ApiKey = "66f371611b5b7314fe42cbf067b62f1c";

// 영화 상세 데이터를 가져오는 함수
const fetchMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${ApiKey}&language=en-US&append_to_response=credits`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

// 영화 상세 데이터를 가져와서 화면에 표시하는 함수
const displayMovieDetails = (movieDetails) => {
  // detail_main 요소 선택
  const detailMain = document.querySelector(".detail_main");
  const directors = movieDetails.credits.crew.filter(
    (member) => member.job === "Director"
  );
  const directorNames = directors.map((director) => director.name).join(", ");

  // 출연 배우 정보 추출
  const actors = movieDetails.credits.cast.slice(0, 10);
  const actorNames = actors.map((actor) => actor.name).join(", ");

  // detail_main 요소의 innerHTML을 채워 넣음
  detailMain.innerHTML = `
            <div class="img_container">
            <div class="detail_img"
                style="background-image:
                url('https://image.tmdb.org/t/p/w500${
                  movieDetails.poster_path
                }')">
                <img src="https://image.tmdb.org/t/p/w500${
                  movieDetails.poster_path
                }" alt="${movieDetails.title}">
              </div>
            </div>
            <div class="content_container">
                <div class="detail_box1">
                    <h2 class="detail_title">${movieDetails.title}</h2>
                    <button class="detail_heart_btn" id="${movieDetails.id}">
                        <img class="heartEmpty" src="assets/icon/heartEmpty.svg"></img>
                        <img class="heartRed" src="assets/icon/heartRed.svg"></img>
                    </button>
                </div>
                <div class="detail_box2">
                    <div class="detail_scores">
                        <i class="fa fa-star" id="scores"></i>
                        <h5>${movieDetails.vote_average}</h5>
                    </div>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_year">${movieDetails.release_date.substring(
                      0,
                      4
                    )}</h5>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_runtime">${movieDetails.runtime}분</h5>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_genres">${movieDetails.genres
                      .map((genre) => genre.name)
                      .join(", ")}</h5>
                </div>
                <hr class="detail_box_hr">
                <div class="detail_box3">
                    <div class="detail_director">
                        <h4 class="director_title">감독</h4>
                        <h5 class="director_name">${directorNames}</h5>
                    </div>
                    <div class="detail_actors">
                        <h4 class="actors_title">출연</h4>
                        <h5 class="actors_name">${actorNames}</h5>
                    </div>
                    <div class="detail_contents">
                        <h4 class="plot_title">소개</h4>
                        <h5 class="detail_plot">${movieDetails.overview}</h5>
                    </div>
                </div>
                <hr class="detail_box_hr">
            </div>
        `;

  // 박솔 추가 이벤트
  if (hearts.includes(movieDetails.id.toString())){
    document.querySelector(".detail_heart_btn").classList.add("clicked");
  }
};

// 찜 버튼 클릭 이벤트
const HEART_LS = "hearts";
let hearts = JSON.parse(localStorage.getItem("hearts"));
function clickHeart(event) {
  const heartBtn = document.querySelector(".detail_heart_btn");
  const thisId = event.target.parentNode.id;

  // 중복값 방지 조건문
  if (!hearts.includes(thisId.toString())) {
    // 찜하지 않은 상태에서 클릭 시 등록 이벤트
    hearts.push(thisId);
    localStorage.setItem(HEART_LS, JSON.stringify(hearts));
    alert("찜한 목록에 저장되었습니다.");
    heartBtn.classList.add("clicked");
  } else {
    // 찜한 상태에서 다시 클릭 시 취소 이벤트
    const thisIdx = hearts.indexOf(thisId);
    hearts.splice(thisIdx, 1);
    localStorage.setItem(HEART_LS, JSON.stringify(hearts));
    alert("찜한 목록에서 삭제되었습니다.");
    heartBtn.classList.remove("clicked");
  }
}

// 페이지 로드 시 영화 상세 데이터 표시
window.onload = () => {
  // URL에서 영화 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  // TMDB API를 사용하여 영화 상세 데이터 가져오기
  fetchMovieDetails(movieId)
    .then((movieDetails) => {
      // 영화 상세 데이터를 화면에 표시하기
      displayMovieDetails(movieDetails);

      // 찜하기 기능

      document
        .querySelector(".detail_heart_btn")
        .addEventListener("click", clickHeart);
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
};
