
const { poleController } = require("../controllers/pole.controller");
const { Authentication } = require("../middleware/Authentication");

const express = require("express");


const PoleRouter = express.Router();

PoleRouter.post("/addPole",poleController.addPole)
PoleRouter.get("/getAllPole",poleController.getPoles)
PoleRouter.put("/updateStaus",poleController.updateMultiplePoles)
PoleRouter.delete("/deletePole/:id", poleController.deletePole)
module.exports = {
  PoleRouter,
};
