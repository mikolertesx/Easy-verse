const like = document.getElementById('voteup');
const dislike = document.getElementById('votedown');
const template = document.getElementById('voteresults');
const reflectionId = document.getElementsByName('reflectionId')[0];

const requests = require('./requests');

const showVotes = async (target) => {
  const clone = document.importNode(template.content, true);
  const likeP = clone.getElementById('positiveVotes');
  const dislikeP = clone.getElementById('negativeVotes');
  const votes = await requests.getVotes(reflectionId.value);

  const likes = votes.likes;
  const dislikes = votes.dislikes;

  likeP.innerText = `${likes}`;
  dislikeP.innerText = `${dislikes}`;

  target.parentElement.parentElement.appendChild(clone);
}

const triggervote = async (triggerer) => {
  const elementId = triggerer.target.id;
  const target = triggerer.target;
  target.classList.add('active');
  disable(like);
  disable(dislike);

  switch(elementId) {
    case 'voteup':
      await requests.upVote(reflectionId.value);
      break;
    case 'votedown':
      await requests.downVote(reflectionId.value);
      break;
  }
  showVotes(target);
}

const disable = (element) => {
  element.removeEventListener('click', triggervote)
}

like.addEventListener('click', triggervote);
dislike.addEventListener('click', triggervote);