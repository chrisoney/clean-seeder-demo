import { reviewUpdate, setNewAttribute, dashStoryDetail } from './story-utils.js';


import { 
  detailChangeEvents,
  detailEventListeners,
  modalEvents, 
  storyDropdownEvents,
  subscribeEvents,
  recDetailsEvents,
  changeRating,
  newRating,
  reviewEvent
 } from './story-events.js';

// let currStories = document.querySelector('.currStories').innerHTML;
// currStories = JSON.parse(currStories);
// console.log(currStories[0]);

//

// Search Functions

const searchBar = document.querySelector(".search");
const dashList = document.querySelector(".stories-container ul");

function DashSearchRating(recommendation){
  let i = 0, j = recommendation.rating + 1;
  let results = []
  while (i < recommendation.rating){
    results.push(`<span id=${i+1} class="fas fa-star user-rating theme")></span>`);
    i++;
  }
  while (j <= 5){
    results.push(`<span id=${j} class="far fa-star user-rating theme")></span>`);
    j++;
  }
  return results.join('');
}

function DashSearchReview(recommendation){
  if (recommendation.review)
    return `<div id=${recommendation.id} class="review-text theme hidden")>${recommendation.review}</div>`;
  else
    return `<div id=${recommendation.id} class="review-text theme none hidden">No review yet</div>`;
}

const submitSearch = async (searchEle, dashListEle) => {
  const res = await fetch(`/stories/search?term=${searchEle.value}`, {})
  const data = await res.json();
  const stories = data.stories.map((story, idx)=> {
    let recommendation = story.Recommendations[0] || { id: null, rating: 0, review: ''}
    return `
    <li class="story-container theme">
      <div class="story-header-container theme">
        <span class="story-title")>${story.title}</span>
        <div class="story-button-container">
          <span class="fas fa-chevron-circle-left toggle-${idx}"></span>
          <span class="fas fa-arrow-circle-right id-${story.id}"></span>
        </div>
      </div>
      <div class="story-details-container container-${idx} theme">
        <div class="story-details-top theme">
          <div class="story-details-top-left">
            <div class="detail-container">
              ${dashStoryDetail("Book:", story.Subscription.book, story.id, "book")}
            </div>
            <div class="detail-container">
              ${dashStoryDetail("Chapter:", story.Subscription.chapter, story.id, "chapter")}
            </div>
            <a href=${story.link} class="link">Link to Story</a>
          </div>
          <div class="story-details-top-right">
            <div id=${story.id} class="stars user-stars">
              ${DashSearchRating(recommendation)}
            </div>
            <div class="subscribe-button sub-${story.id} theme">Unsubscribe</div>
          </div>
        </div>
        <div class="story-details-bottom">
          <div class="description-container theme">
            <div class="reveal">Description</div>
            <p class="description-text hidden">${story.description}</p> 
          </div>
          <div id=${story.id} class="review-container">
            <div class="reveal">Review</div>
            ${DashSearchReview(recommendation)}
          </div>
        </div>
      </div>
    </li>
    `
  })
  dashListEle.innerHTML = stories.join('');
  callEvents();
}

// Search Event Listeners

searchBar.addEventListener("search", (e) => {
  e.preventDefault();
  submitSearch(e.target, dashList)
})

searchBar.addEventListener("input", (e) => {
  e.preventDefault();
  submitSearch(e.target, dashList);
})

document.querySelector(".fa-search").addEventListener("click", (e)=> {
  e.preventDefault();
  submitSearch(searchBar, dashList);
});



window.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  callEvents();
});

function callEvents(){
  changeRating();
  newRating();
  reviewEvent();
  modalEvents();
  storyDropdownEvents();
  subscribeEvents()
  recDetailsEvents()
  detailChangeEvents()
  detailEventListeners()
}