const API_URL = 'http://localhost:5000/api/todos';

async function fetchTodos() {
  const res = await fetch(API_URL);
  return res.json();
}

async function addTodo(text) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}

async function toggleTodo(id, completed) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  return res.json();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', async () => {
    await toggleTodo(todo.id, checkbox.checked);
    renderTodos();
  });
  const span = document.createElement('span');
  span.textContent = todo.text;
  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  btn.addEventListener('click', async () => {
    await deleteTodo(todo.id);
    renderTodos();
  });
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btn);
  return li;
}

async function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  const todos = await fetchTodos();
  todos.forEach(todo => list.appendChild(createTodoElement(todo)));
}

function setup() {
  const form = document.getElementById('todo-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    if (input.value.trim()) {
      await addTodo(input.value.trim());
      input.value = '';
      renderTodos();
    }
  });
  renderTodos();
}

window.addEventListener('DOMContentLoaded', setup);