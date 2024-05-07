import { ApiFetch } from "./movie.js"
import { handleAddReviews, loadReviews, handleClose, modalOk } from "./review.js"


const $reviewsForm = document.querySelector("#review-form");
$reviewsForm.addEventListener('submit', handleAddReviews);
const $close = document.querySelectorAll('.close');
const $modalOk = document.querySelector('#modal-ok');

$close.forEach(e => {
    e.addEventListener('click', handleClose)
});

$modalOk.addEventListener('click', modalOk);


// detail.js

// API 데이터 관련 
// 영화 상세 데이터를 가져오는 함수
const fetchMovieDetails = async (movieId) => {
  const url = `/3/movie/${movieId}?language=en-US&append_to_response=credits,release_dates`;
  try {
      const movieDetails = await ApiFetch(url);
      let certificationData = { certification: 'No Information' };
          
      // 영화 등급 정보가 존재하는 경우에만 가져옴
      if (movieDetails.certification !== undefined) {
          certificationData = await getMovieCertifications(movieId);
          // 관람 등급 정보를 movieDetails 객체에 할당
          movieDetails.certification = certificationData.certification;
      }
      
      return movieDetails;
  } catch (error) {
      console.error('Error fetching movie details:', error);
  }
}


// 영화 관람 등급 정보 가져오는 함수
const getMovieCertifications = async (movieId) => {
  try {
      const url = `/3/movie/${movieId}/release_dates?language=en-US`;
      const movieCertifications = await ApiFetch(url);
      const certificationResults = movieCertifications.results;
      
      let certificationInf = 'certification';
  
      if (certificationResults && certificationResults.length > 0) {
          for (const result of certificationResults) {
              if (result.iso_3166_1 === 'US') {
                  certificationInf = result.release_dates[0].certification;
                  break; // 미국 정보를 찾으면 반복문 종료
              }
          }
    } 
    if (certificationInf !== 'certification') {
      return { certification: certificationInf };
    }
  } catch (error) {
      console.error('Error fetching movie certifications:', error);
  }
};


// 영화 상세 데이터를 가져와서 화면에 표시하는 함수
const displayMovieDetails = (movieDetails, movieCertifications) => {
    // detail_main 요소 선택
  const detailMain = document.querySelector('.detail_main');
  
  //영화 감독 정보 추출
  const directors = movieDetails.credits.crew.filter(member => member.job === "Director");
  const directorNames = directors.map(director => director.name).join(', ');

  // 출연 배우 정보 추출
  const actors = movieDetails.credits.cast.slice(0, 10);
  const actorNames = actors.map(actor => actor.name).join(', ');

  // 영화 관람 등급이 존재하는 경우에만 해당 정보를 출력, 없으면 html 태그 삭제
  const certificationHTML = movieCertifications && movieCertifications.certification && movieCertifications.certification !== 'No Information' ?
  `
  <hr class="certification_hr">
  <h5 class="detail_certifications">${movieCertifications.certification}</h5>
  ` : '';

  
    // detail_main 요소의 innerHTML을 채워 넣음
    detailMain.innerHTML = `
            <div class="img_container">
              <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" 
                  alt="${movieDetails.title}" class="detail_img">
                <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" 
                    alt="${movieDetails.title}" class="detail_main_img">
                </div>
            <div class="content_container">
                <div class="detail_box1">
                    <h2 class="detail_title">${movieDetails.title}</h2>
                    <button class="detail_heart_btn">
                        <img src="assets/icon/heart.svg"></img>
                    </button>
                </div>
                <div class="detail_box2">
                    <div class="detail_scores">
                        <i class="fa fa-star" id="scores"></i>
                        <h5>${movieDetails.vote_average}</h5>
                    </div>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_year">${movieDetails.release_date.substring(0, 4)}</h5>
                    <hr class="detail_box1_hr">
                    <h5 class="detail_runtime">${movieDetails.runtime}분</h5>
                    ${certificationHTML}
                    <hr class="detail_box1_hr">
                    <h5 class="detail_genres">${movieDetails.genres.map(genre => genre.name).join(', ')}</h5>
                </div>
                <hr class="detail_box3_hr">
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
                <hr class="detail_box3_hr">
            </div>
        `;
}

(function init() {
    loadReviews();

    // URL에서 영화 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // TMDB API를 사용하여 영화 상세 데이터 가져오기
    Promise.all([
    fetchMovieDetails(movieId),
    getMovieCertifications(movieId) // 관람 등급 정보도 가져오기
    ])
    .then(([movieDetails, movieCertifications]) => {
    // 영화 상세 데이터를 화면에 표시하기
    displayMovieDetails(movieDetails, movieCertifications); 
    })
    .catch(error => {
    console.error('Error fetching movie details:', error);
    });

    //처음 모달 사용시 위로 올라가는 오류 해결 코드
    document.body.style.overflow = 'hidden';
    document.body.style.overflow = 'auto';

})();
