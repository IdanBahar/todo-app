import { todoService } from "./app.model.js";
const app ={}
window.app = app;
app.onInit = onInit;
app.onAddTodo = onAddTodo;

async function onInit(){
    await todoService.loadTodos();
    // Check if there are no todos in the storage
    // If not, add some default todos
    if(!todoService.getTodos().length){
        await todoService.addTodo('First Todo');
        await todoService.addTodo('Second Todo');
        await todoService.addTodo('Third Todo');
    }
    renderTodos();
}
async function renderTodos(){
    const todos = todoService.getTodos();
    const strHTMLs = todos.map(todos => {
        return `<li>${todos.txt}</li>`
    })
    const elList = document.querySelector('.todo-list');
    if (elList) elList.innerHTML = strHTMLs.join('');
}

async function onAddTodo(){
    const elInput = document.querySelector('.todo-input');
    const txt = elInput.value;
    if(!txt) return;
    await todoService.addTodo(txt)
   elInput.value = '';
    // Clear the input field
    renderTodos();
}