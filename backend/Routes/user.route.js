const { Authentication } = require("../middleware/Authentication");

const express = require("express");
const { UserController } = require("../controllers/user.controller");

const Userrouter = express.Router();

/* READ */
// Userrouter.get("/:id", Authentication, UserController.getUser);
Userrouter.get("/alluser",UserController.getalluser)
Userrouter.post("/saveuser",UserController.adduser)
Userrouter.delete("/deleteuser/:id", UserController.deleteuser)
module.exports = {
  Userrouter,
};
