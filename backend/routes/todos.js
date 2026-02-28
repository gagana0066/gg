const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// simple in-memory data store
let todos = [];

// GET all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST create todo
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  const todo = { id: uuidv4(), text, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT toggle or update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  if (text !== undefined) todo.text = text;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const prev = todos.length;
  todos = todos.filter(t => t.id !== id);
  if (prev === todos.length) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(204).end();
});

module.exports = router;
