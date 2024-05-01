import { handleAddReviews, loadReviews } from "./review.js"

const $reviewsForm = document.querySelector("#review-form");
$reviewsForm.addEventListener('submit', handleAddReviews);


(function init(){
    loadReviews();
})()
