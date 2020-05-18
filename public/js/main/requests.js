module.exports.getVotes = async (id) => {
  return fetch(`votes/getVotes/${id}`)
    .then(response => response.json())
    .then(json => json);
}

module.exports.upVote = async(id) => {
  return fetch(`votes/upvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  });
}

module.exports.downVote = async (id) => {
  return fetch(`votes/downvote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });
}