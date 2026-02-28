// Simple Todo model (used on backend only)
// Not used in this example as we use an in-memory store, but
// it illustrates a structure you could expand with a database.

class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

module.exports = Todo;
