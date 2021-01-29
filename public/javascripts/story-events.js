import { handleSubscriptionClick } from './functions/subscription.js';
import { setNewAttribute, detailInputChange, reviewUpdate } from './story-utils.js';

// Modal Functions

function closeModal(){
  document.querySelectorAll(".modal")
  .forEach(ele => {
    ele.classList.remove("open-modal");
  })
}

// Modal Event Listeners

function modalEvents(){
  document.querySelector(".modal-background").addEventListener("click", (e)=> {
    e.preventDefault()
    closeModal();
  })
  
  document.querySelector(".modal-container")
    .addEventListener("click", (e)=> e.stopPropagation())
}

// Stories Label Event Listeners

function storyDropdownEvents(){
  document.querySelectorAll(".fa-chevron-circle-left")
    .forEach(button=> button.addEventListener("click", (e)=>{
      e.target.classList.toggle("opening")
      const num = e.target.classList[2].split("-")[1];
      document.querySelector(`.container-${num}`).classList.toggle("open")
    }))
  
  document.querySelectorAll(".fa-arrow-circle-right")
    .forEach(button => button.addEventListener("click", (e)=> {
      console.log("hello")
      const id = e.target.classList[2].split("-")[1];
      window.location.href = `/stories/${id}`;
    }))
}

// Subscription Event Listeners

function subscribeEvents(){
  document.querySelectorAll(".subscribe-button")
    .forEach(ele => ele.addEventListener("click", (e) => handleSubscriptionClick(e)))
}

function detailChangeEvents(){
  
  document.querySelectorAll(".fa-minus-circle")
    .forEach(button => button.addEventListener("click", (e)=> {
      const ele = e.target.parentElement.children[2];
      const id = parseInt(e.target.id.split("-")[2], 10);
      const attr = e.target.classList[2];
      setNewAttribute(ele, -1, id, attr)
    }))
  document.querySelectorAll(".fa-plus-circle")
    .forEach(button => button.addEventListener("click", (e)=> {
      const ele = e.target.parentElement.children[2];
      const id = parseInt(e.target.id.split("-")[2], 10);
      const attr = e.target.classList[2];
      setNewAttribute(ele, 1, id, attr)
    }))
}

function detailEventListeners() {
  document.querySelectorAll(".detail-value")
    .forEach(ele => ele.addEventListener("click", (e) => detailInputChange(e)))
}

function followEventListeners(){
  document.querySelectorAll(".follow-button")
    .forEach(ele => ele.addEventListener("click", async (e) => {
      e.preventDefault();
      const followedId = e.target.classList[1].split("-")[1];

      let res = await fetch("/stories/follows/toggle", {
        credentials: 'same-origin',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followedId }),
      });
      res = await res.json();
      e.target.innerHTML = e.target.innerHTML === 'Follow' ? 'Unfollow' : 'Follow'
    }))
}

// Details & Recommendation Event Listeners

function recDetailsEvents(){
  document.querySelectorAll(".reveal")
    .forEach(ele => ele.addEventListener("click", (e) => {
      e.preventDefault();
      const text = e.target.parentElement.children[1];
      text.classList.toggle("hidden");
    }))

  document.querySelectorAll(".user-stars")
    .forEach(star => star.addEventListener("mouseleave", async (e)=> {
      const targetEle = e.currentTarget;
      const storyId = targetEle.id;
      const res = await fetch(`/stories/${storyId}/recommendation/`);
      const data = await res.json()
      populateRating(data.recommendation.rating, targetEle)
    }))
}

function populateRating(rating, container){
  const result = [];
  rating = parseInt(rating, 10);
  for (let i = 0; i < rating; i++) {
    result.push(`<span id=${i+1} class="fas fa-star user-rating theme"></span>`)
  }
  for (let j = rating + 1; j <= 5; j++){
    result.push(`<span id=${j} class="far fa-star user-rating theme"></span>`)
  }
  if (container){
    container.innerHTML = result.join("")
  }
  changeRating();
  newRating();
}

function changeRating(){
  document.querySelectorAll(".user-rating")
  .forEach(star => star.addEventListener("mouseover", (e)=> {
      const cls = ["fas", "far"]
      for (let i = 0; i < e.target.parentElement.children.length; i++){
        const ele = e.target.parentElement.children[i];
        const full = e.target.parentElement.classList;
        if (ele.id <= e.target.id){
          ele.classList.remove(...cls);
          ele.classList.add("fas")
        } else {
          ele.classList.remove(...cls);
          ele.classList.add("far")
        }
      }
    }))
}

function newRating(){
  document.querySelectorAll(".user-rating")
    .forEach(star => star.addEventListener("click", async (e)=> {
      const storyId = e.target.parentElement.id;
      const rating = e.target.id;
      const res = await fetch(`/stories/${storyId}/recommendation/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storyId, rating }),
      });
      const data = await res.json()
      
      populateRating(data.recommendation.rating, e.target.parentElement)
    }, {once: true}))
}


function reviewEvent(){
  document.querySelectorAll(".review-text")
    .forEach(ele => ele.addEventListener("click", (e) => {

      e.target.classList.remove("none");
      e.target.nextSibling.classList.toggle("hidden");
      // e.target.innerHTML = `
      //   <div class="new-review">
      //     <textarea class="new-review-textarea"></textarea>
      //     <div class="new-review-buttons">
      //       <button class="submit-review theme">Submit</button>
      //       <button class="delete-review theme">Delete</button>
      //       <button class="cancel-review theme">Cancel</button>
      //     </div>
      //   </div>
      // `

    }))
    // Fantastic worldbuilding even if the MC is annoying
    document.querySelectorAll(".submit-review")
    .forEach((ele) => ele.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = e.target.parentElement;
      const grandparent = parent.parentElement;

      const storyId = grandparent.parentElement.id;
      const newText = parent.previousSibling.value;
      reviewUpdate(newText, storyId);
      grandparent.previousSibling.innerHTML = newText;
      parent.previousSibling.value = "";
      grandparent.classList.toggle("hidden");
    }))

    document.querySelectorAll(".cancel-review")
    .forEach(ele => ele.addEventListener("click", (e) => {
      const grandparent = e.target.parentElement.parentElement;
      grandparent.classList.toggle("hidden");
    }))

    document.querySelectorAll(".delete-review")
    .forEach(ele => ele.addEventListener("click", (e) => {
      const grandparent = e.target.parentElement.parentElement;
      const storyId = grandparent.parentElement.id;
      reviewUpdate(null, storyId);
      grandparent.previousSibling.innerHTML = 'No review yet';
      grandparent.previousSibling.classList.add('none');
      grandparent.classList.toggle("hidden");
    }))
}

// document.querySelector("#dark-mode-toggle-button")
//   .addEventListener("click", () => {
//     document.querySelectorAll(".theme")
//       .forEach(ele => ele.classList.toggle("dm"));
//   })


export { 
  modalEvents,
  storyDropdownEvents,
  subscribeEvents,
  detailChangeEvents,
  closeModal,
  followEventListeners,
  recDetailsEvents,
  changeRating,
  newRating,
  detailEventListeners,
  reviewEvent
 }