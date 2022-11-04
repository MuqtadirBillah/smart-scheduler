const express = require("express");
const taskController = require("../controllers/taskController");
const { isAuthenticated } = require("../middlewares");
const taskRouter = express.Router();

taskRouter.route("/all").get(taskController.getAllTasks);
taskRouter.route("/:id").get(taskController.getTaskByProjectId);
taskRouter.route("/get/:id").get(taskController.getTaskById);
taskRouter.route("/create").post(isAuthenticated, taskController.createTask);
taskRouter.route("/update/status").post(taskController.updateStatus);
taskRouter.route("/delete/:id").delete(taskController.deleteTaskById);

module.exports = taskRouter;