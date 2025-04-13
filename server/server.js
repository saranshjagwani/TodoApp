const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let currentId = 1;

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  const newTask = { id: currentId++, text };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = text;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
