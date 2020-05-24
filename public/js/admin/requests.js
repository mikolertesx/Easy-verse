const baseFetch = (url, token, body, method) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'CSRF-TOken': token
    },
    method: method,
    body: JSON.stringify(body)
  });
}

module.exports.approveVerse = (token, id) => {
  return baseFetch('/admin/postverse', token, {id}, 'POST');
}

module.exports.deleteVerse = (token, id) => {
  return baseFetch('/admin/deleteverse', token, {id}, 'DELETE');
}
