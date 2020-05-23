let csrf;

module.exports.startUp = (csrf) => {
  csrf = csrf;
}

module.exports.postRegister = async (username, password) => {
  const request = await fetch('/auth/login', {
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrf
    },
    body: { username, password }
  })
  const response = request.json();
  console.log(response);
}