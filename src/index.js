import './reset.css';
import './style.css';
import dots from './images/dots.png';
import refresh from './images/refresh.png';
import enter from './images/enter.png';

const listContainer = document.querySelector('.list');
const enterImg = document.querySelector('#enter');
const refreshImg = document.querySelector('#refresh');

const lists = [
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
  {
    description: 'todo3',
    completed: 'true',
    index: '3',
  },
  {
    description: 'todo4',
    completed: 'false',
    index: '4',
  },
];

const showList = () => {
  lists.forEach((i) => {
    const listElt = document.createElement('li');
    listElt.dataset.listId = i.index;
    listElt.classList.add('checkbox');
    listElt.innerHTML += `<span><input type="checkbox" /> ${i.description}</span><img src="${dots}" />`;
    enterImg.setAttribute('src', enter);
    refreshImg.setAttribute('src', refresh);
    listContainer.appendChild(listElt);
  });
};

showList();
