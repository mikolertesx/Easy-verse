const requests = require('./requests');

const csrfToken = 'nothingfornow';
const approveButtons = document.querySelectorAll('.approve');
const deleteButtons = document.querySelectorAll('.delete');
let working = false;

const getSection = (event) => {
  const target = event.target;
  const section = target.parentElement.parentElement;
  return section;
}

const deleteSection = (section) => {
  section.remove();
  working = false;
  location.reload();
}

const deleteButtonHandler = async (event) => {
  if (working) {return;}
  const section = getSection(event);
  const id = section.querySelector('.id').value;
  working = true;

  await requests.deleteVerse(csrfToken, id);

  deleteSection(section);
}

const approveButtonHandler = async (event) => {
  if (working) {return;}
  const section = getSection(event);
  const id = section.querySelector('.id').value;
  working = true;

  await requests.approveVerse(csrfToken, id);

  deleteSection(section);
}

approveButtons.forEach(button => {
  button.addEventListener('click', approveButtonHandler)
})

deleteButtons.forEach(button => {
  button.addEventListener('click', deleteButtonHandler);
})