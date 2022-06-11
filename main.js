const addtodoForm = document.querySelector('#add-newtodo');
const addtodoinput = document.querySelector('.todo-input');
const listTodo = document.querySelector('.my-todo-list ul');
const alerts = document.querySelector('#alerts');
const successalert = document.querySelector('#success');
const dangeralert = document.querySelector('#danger');



eventListeners();

function eventListeners(){
    addtodoForm.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded',LoadAllTodosToUI);
    listTodo.addEventListener('click',deleteTodoFromUI);
}

function LoadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}
function warningend(){
    alerts.style.display = 'none';
    dangeralert.style.display = 'none';
    successalert.style.display = 'none';
}
// new to do add
function addTodo(e){
    const newtodo = addtodoinput.value.trim();
    
    if(addtodoinput.value === ""){
        alerts.style.display = "block";
        dangeralert.style.display = 'flex';
        setTimeout(warningend,3000);
    }else{
        addTodoToUI(newtodo);
        addTodosToStorage(newtodo);
        addtodoinput.value="";
        alerts.style.display = "block";
        successalert.style.display = 'flex';
        setTimeout(warningend,3000);
    }

    e.preventDefault();
}

function addTodoToUI(newtodo){


    const listitem = document.createElement('li');

    const listbtn = document.createElement('div');
    listbtn.classList.add('listed-btn');
    listbtn.innerHTML = '<a href="#"><i class="fa-solid fa-check"></i></a> <a href="#"><i class="fa-solid fa-xmark"></i></a>';

    listitem.appendChild(document.createTextNode(newtodo));
    listitem.appendChild(listbtn);

    listTodo.appendChild(listitem);
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem('todos') == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

function addTodosToStorage(newtodo){
    let todos = getTodosFromStorage();
    
    todos.push(newtodo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodosFromStorage(deletedtodo){
    let todos = getTodosFromStorage();

    todos.forEach((deletes,index) =>{
        if(deletedtodo == deletes){
            todos.splice(index,1);
        }
    });

    localStorage.setItem('todos',JSON.stringify(todos));
}

function deleteTodoFromUI(e){
    if(e.target.className == "fa-solid fa-xmark"){
        deleteTodosFromStorage(e.target.parentElement.parentElement.parentElement.textContent.trim());

        e.target.parentElement.parentElement.parentElement.remove();

        successalert.childNodes[1].innerText = "To do removed successfully";
        alerts.style.display = "block";
        successalert.style.display = 'flex';
        setTimeout(warningend,2000);
        
    }
}