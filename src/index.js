// IMPORT FILES
import './reset.css';
import './style.css';

// DECLARE GLOBAL VARIABLES
const errorMsg = document.querySelector('.error-message');
let newIndex = 1;

// CREATE ARRAY OF LIST OBJECTS
let todolists = [
  {
    index: 1,
    desc: 'Desc1',
  },
  {
    index: 2,
    desc: 'Desc2',
  },
];
// DISPLAY TO DO LIST
// const showToDoList = () => {
//   let localToDo = localStorage.getItem('toDo.lists');
//   toDoList = localToDo === null ? [] : JSON.parse(localToDo);
//   let listElt = '';
//   toDoList.forEach((i) => {
//     let newIndex = i.index;
//     listElt += `<li id="${newIndex}" class="checkbox"><span><input id="input" type="checkbox" />&nbsp;${i.description}</span><img src="${dots}" /></li>`;
//     newIndex += 1;
//   });
//   listContainer.innerHTML = listElt;
// };

// const form = document.querySelector('#form');
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   let localToDo = localStorage.getItem('toDo.lists');
//   toDoList = localToDo === null ? [] : JSON.parse(localToDo);
//   const inputText = document.querySelector('#text');
//   if (inputText.value == null || inputText.value === '') {
//     errorMsg.setAttribute('style', 'display:block');
//     return;
//   } else {
//     errorMsg.setAttribute('style', 'display:none');
//   }
//   const newToDoList = {
//     description: inputText.value,
//     completed: false,
//     index: newIndex++,
//   };
//   inputText.value = null;
//   toDoList.push(newToDoList);
//   localStorage.setItem('toDo.lists', JSON.stringify(toDoList));
//   showToDoList();
// });

class ToDoList {
  constructor(index, desc) {
    this.index = index;
    this.desc = desc;
  }
}

// LocalStorage Class: Handles Storage
class LocalStorage {
  static getToDoLists() {
    if (localStorage.getItem('todolists') === null) {
      localStorage.setItem('todolists', JSON.stringify(todolists));
    } else {
      todolists = JSON.parse(localStorage.getItem('todolists'));
    }
    // todolists = JSON.parse(localStorage.getItem('todolists')) || [];
    return todolists;
  }

  static addToDoLists(item) {
    const todolists = LocalStorage.getToDoLists();
    todolists.push(item);
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static removeToDoLists(bookTitle) {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((item, index) => {
      if (item.bookTitle === bookTitle) {
        todolists.splice(index, 1);
      }
    });

    localStorage.setItem('todolists', JSON.stringify(todolists));
  }
}

// UserInterface Class: Handle UserInterface Tasks
class UserInterface {
  static showToDoLists() {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((item) => UserInterface.addToDoLists(item));
  }

  static addToDoLists(item) {
    const listContainer = document.querySelector('#list');
    const listElt = document.createElement('li');
    // listElt.dataset.listId = item.index;
    listElt.classList = 'checkbox';
    listElt.innerHTML += `
      <span class="remove"><input id="desc" type="checkbox" /> ${item.desc}</span><i class="fa-solid fa-ellipsis-vertical" name="update"></i>
      `;
    listContainer.appendChild(listElt);
  }

  static removeToDoLists(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.remove();
    }
    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static clearFields() {
    document.querySelector('#text').value = '';
    // document.querySelector('#itemAuthor').value = '';
  }
}

// Event: Display todolists
document.addEventListener('DOMContentLoaded', UserInterface.showToDoLists);

// Event: Add a item
document.querySelector('#form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  // const desc = document.querySelector('#text').value;
  const inputText = document.querySelector('#text');
  if (inputText.value == null || inputText.value === '') {
    errorMsg.setAttribute('style', 'display:block');
    return;
  } else {
    errorMsg.setAttribute('style', 'display:none');
  }

  // const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
  //   e.target.parentNode
  // );
  const desc = inputText.value;
  const index = Date.now();

  // Instantiate item
  const newtodolists = new ToDoList(index, desc);

  // Add item to UserInterface
  UserInterface.addToDoLists(newtodolists);

  // Add item to LocalStorage
  LocalStorage.addToDoLists(newtodolists);

  // Clear fields
  UserInterface.clearFields();
});

// Reload page
const pageReload = () => window.location.reload();
document
  .querySelector('.fa-arrows-rotate')
  .addEventListener('click', pageReload);

const removeItem = () => {
  console.log('remove');
  // Remove item from UserInterface
  // UserInterface.removeToDoLists(e.target);
  // Remove item from LocalStorage
  // LocalStorage.removeToDoLists(
  //   e.target.previousElementSibling.previousElementSibling.textContent
  // );
};

// let i;
// Event: Remove a item
// document.querySelectorAll('.fa-ellipsis-vertical').forEach(i, () => {
//   i.addEventListener('click', console.log('remove'));
// });

document.querySelectorAll('.fa-ellipsis-vertical').forEach((i) =>
  i.addEventListener('click', (e) => {
    console.log(e.target);
    console.log('remove');
  })
);

// console.log('remove');
// Remove item from UserInterface
// UserInterface.removeToDoLists(e.target);
// Remove item from LocalStorage
// LocalStorage.removeToDoLists(
//   e.target.previousElementSibling.previousElementSibling.textContent
// );
// });
