// IMPORT FILES
import './reset.css';
import './style.css';
// import addList from './modules/addList.js';
// import showList from './modules/showList.js';
import dots from './images/dots.png';
import refresh from './images/refresh.png';
import enter from './images/enter.png';
// import delete from './images/bin.png';

// DECLARE GLOBAL VARIABLES
const listContainer = document.querySelector('.list');
const imgEnter = document.querySelector('#enter');
const imgRefresh = document.querySelector('#refresh');
const errorMsg = document.querySelector('.error-message');
let newIndex = 1;

// CREATE ARRAY OF LIST OBJECTS
let lists = [
  {
    description: 'todo1',
    completed: 'true',
    index: '1',
  },
  {
    description: 'todo2',
    completed: 'false',
    index: '2',
  },
  // {
  //   description: 'todo3',
  //   completed: 'true',
  //   index: '3',
  // },
  // {
  //   description: 'todo4',
  //   completed: 'false',
  //   index: '4',
  // },
];

// DISPLAY TO DO LIST
const showList = () => {
  lists.forEach((i) => {
    i.index = newIndex;
    const listElt = document.createElement('li');
    // listElt.dataset.listId = i.index;
    listElt.setAttribute('id', `${newIndex}`);
    listElt.classList.add('checkbox');
    listElt.innerHTML += `<span><input type="checkbox" /> ${i.description}</span><img src="${dots}" />`;
    imgEnter.setAttribute('src', enter);
    imgRefresh.setAttribute('src', refresh);
    listContainer.appendChild(listElt);
    newIndex += 1;
  });
};

window.onload = () => showList();
// showList();

const form = document.querySelector('#form');
const inputText = document.querySelector('#text');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let len = lists.length;
  lists = [];
  const inputVal = inputText.value;
  if (inputVal == null || inputVal === '') {
    errorMsg.setAttribute('style', 'display:block');
    return;
  }
  errorMsg.setAttribute('style', 'display:none');
  console.log(len);
  const createList = {
    description: inputVal,
    completed: false,
    index: newIndex,
  };
  inputText.value = null;
  lists.push(createList);
  showList();
});
