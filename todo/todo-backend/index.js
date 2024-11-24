const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for Todos
let todos = [];

// Routes
// Default route to check if backend is running
app.get("/", (req, res) => {
  res.send("Todo Backend is running!");
});

// Get all Todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new Todo
app.post("/todos", (req, res) => {
  const todo = req.body; // Receive new todo from the request body
  todos.push(todo); // Add todo to the in-memory array
  res.status(201).json(todo); // Respond with the newly added todo
});

// Delete a Todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params; // Extract the id from request parameters
  todos = todos.filter((todo) => todo.id !== id); // Remove todo with the matching id
  res.status(200).json({ message: "Todo deleted successfully" }); // Send success message
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
