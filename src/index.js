// IMPORT FILES
import './reset.css';
import './style.css';

// DECLARE GLOBAL VARIABLES
let newIndex = 1;

// CREATE ARRAY OF LIST OBJECTS
let todolists = [
  {
    index: 1,
    desc: 'Desc1',
    comp: false,
  },
  {
    index: 2,
    desc: 'Desc2',
    comp: false,
  },
];

class ToDoList {
  constructor(index, desc, comp) {
    this.index = index;
    this.desc = desc;
    this.comp = comp;
  }
}

// LOCAL STORAGE
class LocalStorage {
  static getToDoLists() {
    if (localStorage.getItem('todolists') === null) {
      localStorage.setItem('todolists', JSON.stringify(todolists));
    } else {
      todolists = JSON.parse(localStorage.getItem('todolists'));
    }
    return todolists;
  }

  static addToDoLists(item) {
    const todolists = LocalStorage.getToDoLists();
    todolists.push(item);
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static removeToDoLists(newdesc) {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((item, index) => {
      if (item.desc === newdesc) {
        todolists.splice(index, 1);
      }
    });

    localStorage.setItem('todolists', JSON.stringify(todolists));
  }
}

// USER INTERFACE
class UserInterface {
  static showToDoLists() {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((item) => UserInterface.addToDoLists(item));

    // REMOVE
    removeItem();
  }

  static addToDoLists(item) {
    const listContent = document.querySelector('#list');
    const listElt = document.createElement('li');
    listElt.classList = 'new';
    listElt.id = `${item.index}`;
    listElt.innerHTML += `
      <span class="inputs"><input class="checkbox" type="checkbox" /><input class="desc" type="text" value="${item.desc}" /></span>
      <button class="text-btn" type="button">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      `;
    listContent.appendChild(listElt);
    // <i class="fa-solid fa-ellipsis-vertical" name="update"></i>
    const listContainer = document.querySelector('.form-text');
    listContainer.innerHTML = `
      <p class="error-message">*Error</p>
      <form class="form-text" action="">
        <input type="text" class="text" placeholder="Add to your list..." />
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </form>
    `;
  }

  static removeToDoLists(elt) {
    if (elt.classList.contains('text-btn')) {
      elt.parentElement.remove();
    }
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static clearFields() {
    document.querySelector('.text').value = '';
  }
}

// DISPLAY TO DO LIST
document.addEventListener('DOMContentLoaded', UserInterface.showToDoLists);

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
  } else {
    errorMsg.setAttribute('style', 'display:none');
  }

  // const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
  //   e.target.parentNode
  // );
  // console.log(e.target.children[2]);
  // console.log(e.target.children[2].childElementCount);
  // console.log(Array.from(e.target.children).indexOf(e.target.children[2]));
  // console.log(todolists[todolists.length - 1].index);

  const desc = inputText.value;
  const index = todolists[todolists.length - 1].index + 1;
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

// REMOVE TO DO LIST
const removeItem = () => {
  const dustbin = document
    .querySelector('#list')
    .querySelectorAll('.fa-trash-can');
  dustbin.forEach((bin) => {
    bin.addEventListener('click', (e) => {
      // Remove item from UserInterface
      UserInterface.removeToDoLists(e.target.parentElement);
      // Remove item from LocalStorage
      LocalStorage.removeToDoLists(
        e.target.parentElement.previousElementSibling.children[1].value
      );
    });
  });
};
