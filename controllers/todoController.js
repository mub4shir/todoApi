const Todo = require("../models/todoModel");

const todoController = {
  async create(req, res) {
    const { title, description } = req.body;
    const { userId } = req;
    try {
      const todo = await Todo.create(userId, title, description);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getAll(req, res) {
    const { userId } = req;
    try {
      const todos = await Todo.findAll(userId);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getOne(req, res) {
    const { todoId } = req.params;
    const { userId } = req;
    try {
      const todo = await Todo.findById(userId, todoId);
      if (!todo) {
        return res.status(404).send("Todo not found");
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async update(req, res) {
    const { todoId } = req.params;
    const { title, description } = req.body;
    const { userId } = req;
    try {
      const todo = await Todo.update(userId, todoId, title, description);
      if (!todo) {
        return res.status(404).send("Todo not found");
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async delete(req, res) {
    const { todoId } = req.params;
    const { userId } = req;
    try {
      await Todo.delete(userId, todoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = todoController;
