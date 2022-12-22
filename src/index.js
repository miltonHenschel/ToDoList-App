import "./reset.css";
import "./style.css";

let list = document.querySelector(".list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");

class ToDoList {
  constructor(desc, complete, index) {
    this.desc = desc;
    this.complete = complete;
    this.index = index;
  }
}

form.addEventListener("keypress", (e) => {
  if (13 == e.keyCode) {
    console.log("input!");
    e.preventDefault();
    const val = text.value;
    list.innerHTML += `<div class="checkbox" id=""><input type="checkbox" />${val}</div>`;
    form.reset();
  }
});
