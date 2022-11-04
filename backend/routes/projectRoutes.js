const express = require("express");
const projectController = require("../controllers/projectController");
const { isAuthenticated } = require("../middlewares");
const projectRouter = express.Router();

projectRouter.route("/all").get(projectController.getAllProjects);
projectRouter.route("/:id").get(projectController.getProjectByUserId);
projectRouter.route("/get/:id").get(projectController.getProjectById);
projectRouter.route("/create").post(isAuthenticated, projectController.createProject);
projectRouter.route("/delete/:id").delete(isAuthenticated, projectController.deleteProjectById);

module.exports = projectRouter;