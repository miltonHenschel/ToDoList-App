// IMPORT FILES
import './reset.css';
import './style.css';
import ToDoList from './modules/toDoList.js';
import {
  LocalStorage,
  UserInterface,
  todolists,
} from './modules/LocalStorage_UI.js';

// DISPLAY TO DO LIST
document.addEventListener('DOMContentLoaded', UserInterface.showToDoLists);

document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.form-text');
  listContainer.innerHTML = `
      <p class="error-message">*Error</p>
      <form class="form-text" action="">
        <input type="text" class="text" placeholder="Add to your list..." />
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </form>
    `;
});

// ADD TO DO LIST
document.querySelector('.form-text').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Error Handling
  const inputText = document.querySelector('.text');
  const errorMsg = document.querySelector('.error-message');
  if (inputText.value == null || inputText.value === '') {
    errorMsg.setAttribute('style', 'display:block');
    return;
  }
  errorMsg.setAttribute('style', 'display:none');

  const desc = inputText.value;
  const index = todolists.length + 1;
  const comp = false;

  // Instantiate item
  const newtodolists = new ToDoList(index, desc, comp);

  // Add item to UserInterface
  UserInterface.addToDoLists(newtodolists);

  // Add item to LocalStorage
  LocalStorage.addToDoLists(newtodolists);

  // Clear fields
  UserInterface.clearFields();
});

// PAGE RELOAD
const pageReload = () => window.location.reload();
document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', pageReload);
