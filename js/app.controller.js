import { todoService } from "./app.model.js";
window.onInit = onInit;
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