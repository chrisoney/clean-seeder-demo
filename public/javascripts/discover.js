import { subscribeToggle } from './story-utils.js'
import { 
  followEventListeners,
  storyDropdownEvents
 } from './story-events.js'

function storyEventListeners(){
  document.querySelectorAll(".reveal")
    .forEach(ele => ele.addEventListener("click", (e) => {
      e.preventDefault();
      const text = e.target.nextElementSibling;
      text.classList.toggle("hidden");
    }))
  
  document.querySelectorAll(".subscribe-button")
    .forEach(button=> button.addEventListener("click", (e)=> {
      e.preventDefault();
      const storyId = e.target.classList[1].split("-")[1];
      subscribeToggle(storyId);
      e.target.innerHTML = e.target.innerHTML === 'Subscribe' ? 'Unsubscribe' : 'Subscribe';
    }))
}

function populateRating(rating, container){
  const result = [];
  rating = parseInt(rating, 10);
  for (let i = 0; i < rating; i++) {
    result.push(`<span id=${i+1} class="fas fa-star theme"></span>`)
  }
  for (let j = rating + 1; j <= 5; j++){
    result.push(`<span id=${j} class="far fa-star theme"></span>`)
  }
  return result.join("")
}

window.addEventListener("DOMContentLoaded", (e)=> {
  storyEventListeners();
  storyDropdownEvents();
})

const tabs = document.querySelectorAll(".nav-item")
tabs.forEach((tab) => tab.addEventListener("click", ()=>{
  tabs.forEach(tab => tab.classList.remove("active"));
  tab.classList.add("active");
}))

document.querySelector("#stories").addEventListener("click", async e =>{
  try {
    const res = await fetch("/stories/discover-stories");
    const data = await res.json();
    if (data.length === 0){
      document.querySelector(".tab-content").innerHTML = `
      <li class="empty-container">
        <div class="empty-message theme">There are no stories left to discover.</div>
      </li>
    `;
    } else {
      const stories = data.map((story, idx)=> {
        return `
        <li class="story-container">
          <div class="story-header-container theme">
            <span class="story-title">${story.title}</span>
            <div class="story-button-container">
              <span class="fas fa-chevron-circle-left toggle-${story.id}"></span>
              <span class="fas fa-arrow-circle-right id-${story.id}"></span>
            </div>
          </div>
          <div class="story-details-container container-${story.id} theme">
            <div class="story-details-top theme">
              <div class="story-details-top-left">
                <a href=${story.link} class="link">Link to Story</a>
              </div>
              <div class="story-details-top-right">
                <span class="subscribe-button sub-${story.id} theme">Subscribe</span>
              </div>
            </div>
            <div class="story-details-bottom">
              <div class="description-container theme">
                <span id="${idx}" class="reveal">Description</span>
                <p class="description-text-${idx} hidden">${story.description}</p>
              </div>
            </div>
          </div>
        </li>
        `
      })
      document.querySelector(".tab-content").innerHTML = `
        <ul>
          ${stories.join("")}
        </ul>
      `;
      storyEventListeners();
      storyDropdownEvents();
    }
  } catch (e){
    throw new Error('Uh oh. Something went wrong...');
  }
});

function populateStories(data){
  const result = [];

  data.forEach(following => {
    const stories = following.recommendedStories.map((story, idx) => {
      const rating = populateRating(story.Recommendation.rating);
      const review = story.Recommendation.review ?
        `
        <div class="review-container">
          <span id="${story.Recommendation.id}" class="reveal">Review</span>
          <p class="review-text-${story.Recommendation.id} theme hidden">${story.Recommendation.review}</p>
        </div>
        `:``;
      return `
      <li class="story-container">
        <div class="story-header-container theme">
          <span class="story-title">${story.title}</span>
          <div class="story-button-container">
            <span class="fas fa-chevron-circle-left toggle-${story.Recommendation.id}"></span>
            <span class="fas fa-arrow-circle-right id-${story.id}"></span>
          </div>
        </div>
        <div class="story-details-container container-${story.Recommendation.id} theme">
          <div class="story-details-top theme">
            <div class="story-details-top-left">
              <a href=${story.link} class="link">Link to Story</a>
            </div>
            <div class="story-details-top-right">
              <div class="stars">${rating}</div>
            </div>
          </div>
          <div class="story-details-bottom">
            <div class="description-container theme">
              <span id="${idx}" class="reveal">Description</span>
              <p class="description-text-${idx} hidden">${story.description}</p>
            </div>
            ${review}
          </div>
        </div>
      </li>
      `
    })
    if (stories.length === 0){
      stories.push(`
        <li class="empty-container">
          <div class="empty-message theme">This user hasn't recommended any stories</div>
        </li>`);
    }
    result.push(`
      <div class="following-container theme">
        <div class="following-header">
          <div class="following-name">${following.username}</div>
          <div class="follow-button follow-${following.id} theme">Follow</div>
        </div>
        ${stories.join('')}
      </div>
    `);
    
  })
  document.querySelector(".tab-content").innerHTML = result.join("");
}

document.querySelector("#users").addEventListener("click", async e =>{
  try {
    const res = await fetch("/stories/discover-users");
    const data = await res.json()
    if (data.length === 0){
      document.querySelector(".tab-content").innerHTML = `
      <li class="empty-container">
        <div class="empty-message theme">There are no users left to discover</div>
      </li>
    `;
    } else {
      populateStories(data);
      storyEventListeners();
      storyDropdownEvents();
      followEventListeners();
    }
  } catch (e){
    throw new Error('Uh oh. Something went wrong...');
  }

});

document.querySelector("#follows").addEventListener("click", async e =>{
  try {
    const res = await fetch("/stories/discover-follows");
    const data = await res.json()
    if (data.length === 0){
      document.querySelector(".tab-content").innerHTML = `
      <li class="empty-container">
        <div class="empty-message theme">You aren't following anyone</div>
      </li>
    `;
    } else {
      populateStories(data);
      storyEventListeners();
      storyDropdownEvents();
      followEventListeners();
    }
  } catch (e){
    throw new Error('Uh oh. Something went wrong...');
  }
});