const addtodoForm = document.querySelector('#add-newtodo');
const addtodoinput = document.querySelector('.todo-input');
const listTodo = document.querySelector('.my-todo-list ul');
const alerts = document.querySelector('#alerts');
const successalert = document.querySelector('#success');
const dangeralert = document.querySelector('#danger');
const filter = document.querySelector('#search-todo');
const clearAll = document.querySelector('#clear-all');
const selectTodo = document.querySelector('.filter-todo');


eventListeners();

function eventListeners(){
    addtodoForm.addEventListener('submit', addTodo);
    document.addEventListener('DOMContentLoaded',LoadAllTodosToUI);
    listTodo.addEventListener('click',deleteTodoFromUI);
    listTodo.addEventListener('click',completedTodoUI);
    filter.addEventListener('keyup',filterTodo);
    clearAll.addEventListener('click',clearAllTodos);
    selectTodo.addEventListener('change',selectListTodo);
}

// all todos list to UI when load page
function LoadAllTodosToUI(e){
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });

    // complete todos list to UI when load page
    let completetodos = getCompleteTodosFromStorage();

    let duplicates = todos.filter(function(val) {
    return completetodos.indexOf(val) != -1;
    });
    const alltodos = document.querySelectorAll('.my-todo-list ul li');

    for(let i=0; i<alltodos.length; i++){
        if(duplicates.includes(alltodos[i].childNodes[0].innerText)){
            alltodos[i].classList.add('completed');
        }
    }
}

function selectListTodo(){
    const alltodos = document.querySelectorAll('.my-todos .my-todo-list ul li');
    const completeitem = document.querySelectorAll('.my-todos .my-todo-list ul li.completed');
    
    if(selectTodo.value === 'completed'){
        alltodos.forEach(todo => todo.style.display = 'none');
        completeitem.forEach(todo =>todo.style.display = 'flex');
    }
    else if(selectTodo.value === 'uncompleted'){
        alltodos.forEach(todo => todo.style.display = 'flex');
        completeitem.forEach(todo =>todo.style.display = 'none');
    }
    else{alltodos.forEach(todo => todo.style.display = 'flex');}

}

// notification end function
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

// creating new li element for new todo
function addTodoToUI(newtodo){

    const listitem = document.createElement('li');

    const todop = document.createElement('p');
    todop.appendChild( document.createTextNode(newtodo));

    const listbtn = document.createElement('div');
    listbtn.classList.add('listed-btn');
    listbtn.innerHTML = '<a><i class="fa-solid fa-check"></i></a> <a><i class="fa-solid fa-xmark"></i></a>';

    listitem.appendChild(todop);
    listitem.appendChild(listbtn);

    listTodo.appendChild(listitem);
}

// array list all todos
function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem('todos') == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

// array list complete todos
function getCompleteTodosFromStorage(){
    let completetodos;

    if(localStorage.getItem('completetodos') == null){
        completetodos = [];
    }else{
        completetodos = JSON.parse(localStorage.getItem('completetodos'));
    }

    return completetodos;
}

// array list uncomplete todos
function getUncompleteTodosFromStorage(){
    let uncompletetodos;

    if(localStorage.getItem('uncompletetodos') == null){
        uncompletetodos = [];
    }else{
        uncompletetodos = JSON.parse(localStorage.getItem('uncompletetodos'));
    }

    return uncompletetodos;
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
function completedTodoUI(e){
    
    if(e.target.className == "fa-solid fa-check"){
        if(e.target.parentElement.parentElement.parentElement.classList.contains('completed') == false){
            e.target.parentElement.parentElement.parentElement.classList.add('completed');

            // add complete todo list to storage
            let completetodos = getCompleteTodosFromStorage();
            completetodos.push(e.target.parentElement.parentElement.parentElement.textContent.trim());
            localStorage.setItem('completetodos', JSON.stringify(completetodos));
        }
        else{
            e.target.parentElement.parentElement.parentElement.classList.remove('completed');

            //delete complete todo list from storage
            let completetodos = getCompleteTodosFromStorage();
            completetodos.forEach((deletes,index) =>{
                if(e.target.parentElement.parentElement.parentElement.textContent.trim() == deletes){
                    completetodos.splice(index,1);
                }
            });
            localStorage.setItem('completetodos',JSON.stringify(completetodos));
        }
        
        
        
    }
}

function deleteTodoFromUI(e){
    if(e.target.className == "fa-solid fa-xmark"){
        deleteTodosFromStorage(e.target.parentElement.parentElement.parentElement.textContent.trim());
        e.target.parentElement.parentElement.parentElement.remove();
        
        // notification
        successalert.childNodes[1].innerText = "To do removed successfully";
        alerts.style.display = "block";
        successalert.style.display = 'flex';
        setTimeout(warningend,2000);
        
        // delete from complete array storage
        let completetodos = getCompleteTodosFromStorage();
        completetodos.forEach((deletes,index) =>{
            if(e.target.parentElement.parentElement.parentElement.textContent.trim() == deletes){
                completetodos.splice(index,1);
            }
        });
        localStorage.setItem('completetodos',JSON.stringify(completetodos));
    }
}

// search todo
function filterTodo(e){
    const searchitem = e.target.value.toLowerCase();

    const todoitem = document.querySelectorAll('.my-todos .my-todo-list ul li');

    todoitem.forEach(todolielement =>{
        const text = todolielement.innerText.toLowerCase();

        if(text.indexOf(searchitem) === -1){
            todolielement.style.display = 'none';
        }
        else{
            todolielement.style.display = 'flex';
        }  
    })
}

function clearAllTodos(e){
    const confirmmessage = 'Are you sure you want to delete all to do list ?';
    const alltodoElements = document.querySelectorAll('.my-todos .my-todo-list ul li');
    if(confirm(confirmmessage) == true){
        //delete from UI     
        alltodoElements.forEach((todoelements) =>{
            todoelements.remove();
        })

        //delete from storage
        let todos = getTodosFromStorage();
        todos = [];
        localStorage.setItem('todos',JSON.stringify(todos));

        // message to user
        successalert.childNodes[1].innerText = "All list delete successfully";
        alerts.style.display = "block";
        successalert.style.display = 'flex';
        setTimeout(warningend,4000);

        // delete complete array from storage
        let completetodos = getCompleteTodosFromStorage();
        completetodos = [];
        localStorage.setItem('completetodos',JSON.stringify(completetodos));
    }
}