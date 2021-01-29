import { subscribeToggle } from '../story-utils.js';
import { closeModal } from '../story-events.js'

function handleSubscriptionConfirm(e, element, storyId) {
  e.preventDefault();
  subscribeToggle(storyId);
  closeModal();
  element.innerHTML = element.innerHTML === 'Subscribe' ? 'Unsubscribe' : 'Subscribe';
}

function handleSubscriptionClick(e){
  e.preventDefault();
    const buttonHolder = e.target
    const storyId = e.target.classList[1].split("-")[1];
    document.querySelectorAll(".modal")
      .forEach(ele => {
        ele.classList.add("open-modal");
      })
    document.querySelector(".confirm-button")
      .addEventListener("click", (e) => handleSubscriptionConfirm(e, buttonHolder,storyId), {once:true})
}



export {
  handleSubscriptionClick
}