const tasks = require("../task.json");

// Validation Helper
function validateTaskData({ title, description, completed, priority }) {
  const allowedPriorities = ["low", "medium", "high"];

  if (
    !title || typeof title !== "string" || title.trim() === "" ||
    !description || typeof description !== "string" || description.trim() === "" ||
    typeof completed !== "boolean" ||
    !priority || !allowedPriorities.includes(priority.toLowerCase())
  ) {
    return false;
  }
  return true;
}

// Create Task
exports.createTask = (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!validateTaskData({ title, description, completed, priority })) {
    return res.status(400).send();
  }

  const newTask = {
    id: tasks.tasks.length + 1,
    title,
    description,
    completed,
    priority: priority.toLowerCase(),
    createdAt: new Date().toISOString()
  };

  tasks.tasks.push(newTask);
  return res.status(201).send(newTask);
};

// Get All Tasks (with filtering + sorting)
exports.getAllTask = (req, res) => {
  let result = tasks.tasks;

  // Filter by completion
  if (req.query.completed !== undefined) {
    const isCompleted = req.query.completed === "true";
    result = result.filter(task => task.completed === isCompleted);
  }

  // Sort by creation date
  if (req.query.sort) {
    const order = req.query.sort.toLowerCase();
    result = result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  return res.status(200).send(result);
};

// Get Task By ID
exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.tasks?.find((t) => t.id === id);

  if (!task) {
    return res.status(404).send();
  }

  return res.status(200).send(task);
};

// Update Task
exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.tasks?.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send();
  }

  const { title, description, completed, priority } = req.body;

  if (!validateTaskData({ title, description, completed, priority })) {
    return res.status(400).send();
  }

  tasks.tasks[taskIndex] = {
    id,
    title,
    description,
    completed,
    priority: priority.toLowerCase(),
    createdAt: tasks.tasks[taskIndex].createdAt // keep old date
  };

  return res.status(200).send(tasks.tasks[taskIndex]);
};

// Delete Task
exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).send();
  }

  tasks.tasks.splice(taskIndex, 1);
  return res.status(200).send();
};

// Get Tasks by Priority
exports.getTasksByPriority = (req, res) => {
  const level = req.params.level.toLowerCase();
  const allowedPriorities = ["low", "medium", "high"];

  if (!allowedPriorities.includes(level)) {
    return res.status(400).send({ message: "Invalid priority level" });
  }

  const result = tasks.tasks.filter(task => task.priority === level);
  return res.status(200).send(result);
};
