import { 
  followEventListeners,
  detailEventListeners,
  detailChangeEvents,
  changeRating,
  newRating,
  recDetailsEvents,
  reviewEvent
 } from './story-events.js'

document.querySelector('.back-button-container')
  .addEventListener("click", () => {
    window.history.back();
  })

window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  followEventListeners();
  callEvents();
})

function callEvents(){
  changeRating();
  newRating();
  reviewEvent();
  // modalEvents();
  // storyDropdownEvents();
  // subscribeEvents()
  recDetailsEvents()
  detailChangeEvents()
  detailEventListeners()
}