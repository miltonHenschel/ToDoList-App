// IMPORT FILES
import './reset.css';
import './style.css';
// import addList from './modules/addList.js';
// import showList from './modules/showList.js';
import dots from './images/dots.png';
import refresh from './images/refresh.png';
import enter from './images/enter.png';
// import refresh from './images/refresh.png';
// import delete from './images/bin.png';

// DECLARE GLOBAL VARIABLES
const listContainer = document.querySelector('.list');
const imgEnter = document.querySelector('#enter');
const imgRefresh = document.querySelector('#refresh');
const errorMsg = document.querySelector('.error-message');
let newIndex = 1;

// CREATE ARRAY OF LIST OBJECTS
let toDoList = [];

// DISPLAY TO DO LIST
const showToDoList = () => {
  let localToDo = localStorage.getItem('toDo.lists');
  toDoList = localToDo === null ? [] : JSON.parse(localToDo);
  let listElt = '';
  toDoList.forEach((i) => {
    let newIndex = i.index;
    listElt += `<li id="${newIndex}" class="checkbox"><span><input id="input" type="checkbox" />&nbsp;${i.description}</span><img src="${dots}" /></li>`;
    newIndex += 1;
  });
  listContainer.innerHTML = listElt;
};

const form = document.querySelector('#form');
const inputText = document.querySelector('#text');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let localToDo = localStorage.getItem('toDo.lists');
  toDoList = localToDo === null ? [] : JSON.parse(localToDo);
  if (inputText.value == null || inputText.value === '') {
    errorMsg.setAttribute('style', 'display:block');
    return;
  } else {
    errorMsg.setAttribute('style', 'display:none');
  }
  const newToDoList = {
    description: inputText.value,
    completed: false,
    index: newIndex++,
  };
  inputText.value = null;
  toDoList.push(newToDoList);
  localStorage.setItem('toDo.lists', JSON.stringify(toDoList));
  showToDoList();
});

imgRefresh.addEventListener('click', () => window.location.reload());
window.onload = () => {
  showToDoList();
  imgEnter.setAttribute('src', enter);
  imgRefresh.setAttribute('src', refresh);
};
