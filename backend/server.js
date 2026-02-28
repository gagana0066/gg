const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/todos', todosRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
