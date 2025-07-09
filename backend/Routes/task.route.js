
const { poleController } = require("../controllers/pole.controller");
const { taskController } = require("../controllers/task.controller");
const { Authentication } = require("../middleware/Authentication");

const express = require("express");


const TaskRouter = express.Router();

TaskRouter.post("/create",taskController.addTask)
 TaskRouter.get("/getAllTask",taskController.getTasks)
 TaskRouter.get("/loggedInUserTasks/:id", taskController.getLoggedInUserTasks)
 TaskRouter.put("/updateTask/:id", taskController.upateSingleTask)
 TaskRouter.post("/sendEmail", taskController.sendEmail)
 
// TaskRouter.put("/updateStaus",taskController.updateMultiplePoles)
// TaskRouter.delete("/deletePole/:id", taskController.deletePole)
module.exports = {
  TaskRouter,
};
