const cl = console.log;

const todoForm = document.getElementById('todoForm');
const todoItemControl = document.getElementById('todoItem');
const todoList = document.getElementById('todoList');
const todoAddBtn = document.getElementById('todoAddBtn');
const todoUpdateBtn = document.getElementById('todoUpdateBtn');

let todoArr = [];

if(localStorage.getItem('todoArr')){
    todoArr = JSON.parse(localStorage.getItem('todoArr'))
}

const generateUuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };

const onEditTodo = (ele) => {
    let editId = ele.closest('li').id;
    localStorage.setItem('editId', editId);
    let editObj = todoArr.find(todo => todo.todoid === editId);
    cl(editId);
    todoItemControl.value = editObj.todoitem;

    todoAddBtn.classList.add('d-none');
    todoUpdateBtn.classList.remove('d-none')
}

const onRemoveTodo = (ele) => {
    let removeId = ele.closest('li').id;

    let getIndex = todoArr.findIndex(todo => todo.todoid === removeId);
    cl(getIndex);
    localStorage.setItem('todoArr', JSON.stringify(todoArr));

    ele.closest('li').remove();
}

const createlis = (arr) => {
    let result = ''
    arr.forEach(ele => {
        result += `
                    <li id='${ele.todoid}' class="list-group-item d-flex justify-content-between">
                        <strong>${ele.todoitem}</strong>
                        <div>
                            <button class="btn btn-sm btn-outline-info mr-3" id="todoAddBtn" onclick='onEditTodo(this)'>Edit</button>
                            <button class="btn btn-sm btn-outline-danger mr-3" id="todoUpdateBtn" onclick='onRemoveTodo(this)'>Remove</button>
                        </div>
                    </li>`
                    todoList.innerHTML = result;
    })
}

const onAddTodo = (eve) => {
    eve.preventDefault();

    let todoObj = {
        todoitem : todoItemControl.value,
        todoid : generateUuid(),
    }
    cl(todoObj)
    todoForm.reset();
    todoArr.unshift(todoObj);

    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    
    let li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.id = todoObj.todoid;
    li.innerHTML = `<strong>${todoObj.todoitem}</strong>
                        <div>
                            <button class="btn btn-sm btn-outline-info mr-3" id="todoAddBtn" onclick='onEditTodo(this)'>Edit</button>
                            <button class="btn btn-sm btn-outline-danger mr-3" id="todoUpdateBtn" onclick='onRemoveTodo(this)'>Remove</button>
                        </div>`

    todoList.prepend(li)
}

const onUpadateTodo = () => {
    let updateid = localStorage.getItem('editId');
    let updateObj = {
        todoitem : todoItemControl.value,
        todoid : updateid
    }
    cl(updateObj);

    let getIndex = todoArr.findIndex(todo => todo.todoid === updateid);
    cl(getIndex);
    todoArr[getIndex] = updateObj;

    todoForm.reset();

    todoAddBtn.classList.remove('d-none');
    todoUpdateBtn.classList.add('d-none');

    let lis = document.getElementById(updateid);
    lis.firstElementChild.innerHTML = updateObj.todoitem;
}

todoForm.addEventListener('submit', onAddTodo);
todoUpdateBtn.addEventListener('click', onUpadateTodo);