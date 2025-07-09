const { plotModel } = require("../models/plot.model");

const addPlot = async (req, res) => {
  const { id, name, coordinates, color } = req.body;

  try {
    // Optional: Check if a plot with the same ID already exists
    const existingPlot = await plotModel.findOne({ id });
    if (existingPlot) {
      return res.status(400).json({ error: "Plot already exists!" });
    }

    const newPlot = new plotModel({
      id,
      name,
      coordinates,
      color,
    });

    await newPlot.save();
    res.status(200).json({ msg: "Plot added successfully!" });
  } catch (error) {
    console.error("Error while adding plot:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const getPlots = async (req, res) => {
  try {
    const plots = await plotModel.find(); // Fetch all plots
    res.status(200).json(plots);
  } catch (error) {
    console.error("Error fetching plots:", error);
    res.status(500).json({ error: "Failed to fetch plots" });
  }
};

const deletePlot = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlot = await plotModel.findOneAndDelete({ id });

    if (!deletedPlot) {
      return res.status(404).json({ error: "Plot not found!" });
    }

    res.status(200).json({ msg: "Plot deleted successfully!" });
  } catch (error) {
    console.error("Error deleting plot:", error);
    res.status(500).json({ error: "Failed to delete plot" });
  }
};

const plotController = {
    addPlot,
  getPlots,
  deletePlot    
}
module.exports = {
  plotController
};
