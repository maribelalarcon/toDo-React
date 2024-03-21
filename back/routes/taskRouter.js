const express = require("express");
const router = express.Router();
const tasksControllers = require("../controllers/tasksController");

router.get("/", tasksControllers.getTasks);
router.get("/:id", tasksControllers.getTasksId);
router.post("/", tasksControllers.addTask);
router.patch("/:id", tasksControllers.updateTaskById);
router.delete("/:id", tasksControllers.deleteTaskById);

module.exports = router;
