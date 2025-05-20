import { storageService } from "../services/storage.service.js";
import { utilService } from "../services/util.service.js";

export const todoService = {
  loadTodos,
  addTodo,
  getTodos,
  removeTodo,
  updateTodo,
};
const TODO_KEY = "todos";
let todos = [];

async function loadTodos() {
  const storedTodos = await storageService.loadFromStorage(TODO_KEY);
  todos = storedTodos || [];
}
async function saveTodos() {
  await storageService.saveToStorage(TODO_KEY, todos);
}
async function removeTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  await saveTodos();
}
async function updateTodo(todoId, updatedTodo) {
  const foundTodo = todos.find((todo) => todo.id === todoId);
  if (!foundTodo) return;
  foundTodo.txt = updatedTodo.txt;
  await saveTodos();
}
async function addTodo(txt) {
  const todo = {
    id: utilService.makeId(),
    txt: txt,
    isDone: false,
  };
  todos.push(todo);
  await saveTodos();
}
function getTodos() {
  return todos;
}
