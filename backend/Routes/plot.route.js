const { plotController } = require("../controllers/plot.controller");
const { Authentication } = require("../middleware/Authentication");

const express = require("express");


const PlotRouter = express.Router();

PlotRouter.post("/addPlot",plotController.addPlot)
PlotRouter.get("/getAllPlot",plotController.getPlots)
PlotRouter.delete("/delete/:id", plotController.deletePlot)
module.exports = {
  PlotRouter,
};
