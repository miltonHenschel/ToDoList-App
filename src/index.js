// IMPORT FILES
import './reset.css';
import './style.css';
import ToDoList from './modules/toDoList.js';
import LocalStorage from './modules/localStorage.js';
import UserInterface from './modules/userInterface.js';
import CompleteToDoList from './modules/CompleteToDoList.js';

// PAGE RELOAD
document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', () => window.location.reload());

// DISPLAY TO DO LIST
document.addEventListener('DOMContentLoaded', () => {
  const listContainer = document.querySelector('.form-text');
  listContainer.innerHTML = `
      <p class="error-message">*Error</p>
      <form class="form-text" action="">
        <input type="text" class="text" placeholder="Add to your list..." required />
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </form>
    `;
  UserInterface.showToDoLists();
  UserInterface.removeToDoLists();
  UserInterface.updateDesc();
  CompleteToDoList.compToDoList();
  CompleteToDoList.clearComp();
});

// ADD TO DO LIST
document.querySelector('.form-text').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  const inputText = document.querySelector('.text');
  const todolists = LocalStorage.getToDoLists();
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

  // PAGE RELOAD
  window.location.reload();
});
