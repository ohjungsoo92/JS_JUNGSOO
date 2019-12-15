const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "todos";

function filterFn(toDo) {
  return toDo.id === 1;
}

let toDos = []; // add todo into in this array

function deleteToDo(event) {
  const btn = event.target; // button to remove. to find, already do console.log(event), and console.dir(event.target);and .parentNode
  const li = btn.parentNode; // make li to delete
  toDoList.removeChild(li); //remove child li
  const cleanToDos = toDos.filter(function(toDo) {
    // filter execute for every item on the list
    return toDo.id !== parseInt(li.id); //console.log(toDo.id, li.id); and checked li.id is string. parseInt(); makes string to number
  }); //filter runs some function and it runs with each of items
  toDos = cleanToDos; //console.log(cleanToDos); and checked
  saveToDos(); // it saves toDos
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // save value in localStorage but it is empty so line.29
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId; // to give li id number
  toDoList.appendChild(li);
  const toDoObj = {
    text: text, //text : key = text : value
    id: newId // toDos is empty so it starts with 1.
  };
  toDos.push(toDoObj); // push toDoObj in toDos array
  saveToDos(); // have to call it and push inside to toDos
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function something(toDo) {
      //forEach execute for every item on the list
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();
