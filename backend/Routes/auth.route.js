const express = require("express");
const { AuthController } = require("../controllers/auth.controller");
const AuthRouter = express.Router();
AuthRouter.post("/login", AuthController.Login);
AuthRouter.post("/signup",  AuthController.SignUp);

module.exports = {
  AuthRouter,
};
