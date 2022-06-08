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
}

function LoadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

// new to do add
function addTodo(e){
    const newtodo = addtodoinput.value;
    
    function warningend(){
        alerts.style.display = 'none';
        dangeralert.style.display = 'none';
        successalert.style.display = 'none';
    }


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
