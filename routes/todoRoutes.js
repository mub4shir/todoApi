const express = require("express");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateGetAllTodos = require("../middlewares/validateGetAllTodos");
const router = express.Router();

router.post("/", authMiddleware, todoController.create);
router.get("/", authMiddleware, validateGetAllTodos, todoController.getAll);
router.get("/:todoId", authMiddleware, todoController.getOne);
router.put("/:todoId", authMiddleware, todoController.update);
router.delete("/:todoId", authMiddleware, todoController.delete);

module.exports = router;
