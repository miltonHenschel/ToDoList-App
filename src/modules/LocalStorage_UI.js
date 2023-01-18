/* eslint-disable import/no-mutable-exports */
let todolists = [];

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

    // RESET INDEX
    LocalStorage.resetIndex();

    // UPDATE DESCRIPTION
    LocalStorage.updateDesc();

    // COMPLETE TASKS
    LocalStorage.taskComp();

    localStorage.setItem('todolists', JSON.stringify(todolists));
  }

  static resetIndex() {
    todolists.forEach((item, index) => {
      item.index = index + 1;
    });
  }

  static updateDesc(desc, index) {
    for (let i = 0; i < todolists.length; i += 1) {
      if (todolists[i].index === +index) {
        todolists[i].desc = desc;
        localStorage.setItem('todolists', JSON.stringify(todolists));
      }
    }
  }

  static taskComp(index) {
    for (let i = 0; i < todolists.length; i += 1) {
      if (todolists[i].index === +index) {
        todolists[i].comp = !todolists[i].comp;
        localStorage.setItem('todolists', JSON.stringify(todolists));
      }
    }
  }
}

class UserInterface {
  static showToDoLists() {
    const todolists = LocalStorage.getToDoLists();

    todolists.forEach((item) => UserInterface.addToDoLists(item));

    // REMOVE TO DO LIST
    const dustbin = document
      .querySelector('#list')
      .querySelectorAll('.fa-trash-can');

    dustbin.forEach((bin) => {
      bin.addEventListener('click', (e) => {
        // Remove item from UserInterface
        UserInterface.removeToDoLists(e.target.parentElement);
        // Remove item from LocalStorage
        LocalStorage.removeToDoLists(
          e.target.parentElement.previousElementSibling.children[1].value,
        );
      });
    });

    // UPDATE DESCRIPTION
    const desc = document.querySelector('#list').querySelectorAll('.desc');

    desc.forEach((elt) => {
      elt.addEventListener('change', (e) => {
        LocalStorage.updateDesc(
          e.target.value,
          e.target.parentElement.parentElement.id,
        );
      });
    });

    // COMPLETED TO DO lIST
    const checkbox = document
      .querySelector('#list')
      .querySelectorAll('.checkbox');

    checkbox.forEach((elt) => {
      elt.addEventListener('change', (e) => {
        LocalStorage.taskComp(e.target.parentElement.parentElement.id);
      });
    });
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

export { LocalStorage, UserInterface, todolists };
