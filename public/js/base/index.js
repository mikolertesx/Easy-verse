const like = document.getElementById('voteup');
const dislike = document.getElementById('votedown');

const trigger = (element) => {
  const trigger = element.target;
  trigger.classList.add('active');
  disable(like);
  disable(dislike);
}

const disable = (element) => {
  element.removeEventListener('click', trigger)
}

like.addEventListener('click', trigger);
dislike.addEventListener('click', trigger);