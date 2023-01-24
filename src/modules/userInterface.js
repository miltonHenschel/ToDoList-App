import LocalStorage from './localStorage.js';

class UserInterface {
  static showToDoLists() {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((item) => UserInterface.addToDoLists(item));
  }

  // REMOVE TO DO LIST
  static removeToDoLists() {
    const dustbin = document
      .querySelector('#list')
      .querySelectorAll('.fa-trash-can');

    dustbin.forEach((bin) => {
      bin.addEventListener('click', (e) => {
        const todolists = LocalStorage.getToDoLists();
        const elt = e.target.parentElement;

        if (elt.classList.contains('text-btn')) {
          elt.parentElement.remove();
        }
        localStorage.setItem('todolists', JSON.stringify(todolists));

        LocalStorage.removeToDoLists(
          e.target.parentElement.previousElementSibling.children[1].value,
        );
      });
    });
  }

  // UPDATE DESCRIPTION
  static updateDesc() {
    const desc = document.querySelector('#list').querySelectorAll('.desc');

    desc.forEach((elt) => {
      elt.addEventListener('change', (e) => {
        LocalStorage.updateDesc(
          e.target.value,
          e.target.parentElement.parentElement.id,
        );
      });
    });
  }

  static addToDoLists(item) {
    const listContent = document.querySelector('#list');
    const listElt = document.createElement('li');
    listElt.classList = 'new';
    listElt.id = `${item.index}`;
    listElt.innerHTML += `
      <span class="inputs"><input class="checkbox" type="checkbox" ${item.comp} /><input class="desc" type="text" value="${item.desc}" /></span>
      <button class="text-btn" type="button">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      `;
    listContent.appendChild(listElt);
  }

  static clearFields() {
    document.querySelector('.text').value = '';
  }
}

export default UserInterface;
