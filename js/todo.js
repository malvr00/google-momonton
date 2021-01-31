const toDoform = document.querySelector(".js-toDoForm");
const toDoinput = toDoform.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
let newId = 0;
const TODOS_LS = "toDos";

const toDos = [];

function paintTodo(text){
    const li = document.createElement("li");
    
    const delBtn = document.createElement("button");
    delBtn.innerText = "❤";
    
    const span = document.createElement("span");
    span.innerText = text;
    
    newId = toDos.length + 1;
    
    toDoList.appendChild(li);
    li.appendChild(delBtn);
    li.appendChild(span);

    li.id = newId;

    const toDoObj = {
        text: text,
        id: newId
    };    
   
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit2(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintTodo(currentValue);
    toDoinput.value = "";
}

function something(toDo){
    paintTodo(toDo.text);
   // console.log(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(something);
    }
}

function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit2);
}

init();