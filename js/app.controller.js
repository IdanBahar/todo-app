import { todoService } from "./app.model.js";
import { utilService } from "../services/util.service.js";

const app = {};
window.app = app;
app.onInit = onInit;
app.onAddTodo = onAddTodo;
app.onRemoveTodo = onRemoveTodo;
app.onEditTodo = onEditTodo;
app.onSaveEdit = onSaveEdit;

async function onInit() {
  utilService.showLoader();
  await todoService.loadTodos();
  utilService.hideLoader();
  // Check if there are no todos in the storage
  // If not, add some default todos
  if (!todoService.getTodos().length) {
    await todoService.addTodo("First Todo");
    await todoService.addTodo("Second Todo");
    await todoService.addTodo("Third Todo");
  }
  renderTodos();
}
async function renderTodos() {
  const todos = todoService.getTodos();
  const strHTMLs = todos.map((todo) => {
    return `<li data-todo-id="${todo.id}"><span class="todo-text">${todo.txt}</span><span><button onclick="app.onRemoveTodo('${todo.id}')">🗑️</button><button onclick="app.onEditTodo('${todo.id}')">✍🏼</button></span></li>`;
  });
  const elList = document.querySelector(".todo-list");
  if (elList) elList.innerHTML = strHTMLs.join("");
}

async function onAddTodo() {
  const elInput = document.querySelector(".todo-input");
  const txt = elInput.value;
  const elBtn = document.getElementById("add-todo");
  elBtn.disabled = true;
  elBtn.innerHTML = `<span class="loader small"></span>`;
  // Check if the input is empty
  if (!txt) return;
  await todoService.addTodo(txt);
  // Clear the input field
  elBtn.disabled = false;
  elBtn.textContent = "Add Todo";
  elInput.value = "";
  // Clear the input field
  renderTodos();
}
async function onRemoveTodo(todoId) {
  await todoService.removeTodo(todoId);
  renderTodos();
}
function onEditTodo(todoId) {
  const elLi = document.querySelector(`li[data-todo-id="${todoId}"]`);
  const elTxt = elLi.querySelector(".todo-text");
  const currentTxt = elTxt.textContent;

  // Replace text span with input
  elTxt.outerHTML = `
    <input type="text" class="edit-input" value="${currentTxt}" />
  `;

  // Change edit button to save button
  const btns = elLi.querySelectorAll("button");
  const editBtn = btns[1]; // second button is the edit one
  editBtn.textContent = "✅";
  editBtn.setAttribute("onclick", `app.onSaveEdit('${todoId}')`);
}
async function onSaveEdit(todoId) {
  const elLi = document.querySelector(`li[data-todo-id="${todoId}"]`);
  const elInput = elLi.querySelector(".edit-input");
  const newTxt = elInput.value;

  await todoService.updateTodo(todoId, { txt: newTxt });
  renderTodos();
}
