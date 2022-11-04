const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);

// project routes
const projectRouter = require("./projectRoutes");
router.use("/project", projectRouter);

// task routes
const taskRouter = require("./taskRoutes");
router.use("/task", taskRouter);

module.exports = router;