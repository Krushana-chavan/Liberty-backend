const { poleModel } = require("../models/pole.model");

// Add a new pole
const addPole = async (req, res) => {
  const { id, name, coordinates, plotId, status } = req.body;

  try {
    const existingPole = await poleModel.findOne({ id });
    if (existingPole) {
      return res.status(400).json({ error: "Pole already exists!" });
    }

    const newPole = new poleModel({ id, name, coordinates, plotId, status });
    await newPole.save();

    res.status(200).json({ msg: "Pole added successfully!" });
  } catch (error) {
    console.error("Error while adding pole:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get all poles
const getPoles = async (req, res) => {
  try {
    const poles = await poleModel.find({});
    res.status(200).json(poles);
  } catch (error) {
    console.error("Error fetching poles:", error);
    res.status(500).json({ error: "Failed to fetch poles" });
  }
};

// Delete a pole by id
const deletePole = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPole = await poleModel.findOneAndDelete({ id });

    if (!deletedPole) {
      return res.status(404).json({ error: "Pole not found!" });
    }

    res.status(200).json({ msg: "Pole deleted successfully!" });
  } catch (error) {
    console.error("Error deleting pole:", error);
    res.status(500).json({ error: "Failed to delete pole" });
  }
};

const updateMultiplePoles = async (req, res) => {
  const { updates } = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: "Invalid updates payload" });
  }

  try {
    const bulkOps = updates.map(({ id, status, plotId }) => {
      const updateFields = {};

      if (status !== undefined) updateFields.status = status;
      if (plotId !== undefined) updateFields.plotId = plotId;

      return {
        updateOne: {
          filter: { id },
          update: { $set: updateFields },
        },
      };
    });

    const result = await poleModel.bulkWrite(bulkOps);

    res.status(200).json({
      msg: "Poles updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Bulk update error:", error);
    res.status(500).json({ error: "Failed to update poles" });
  }
};

const poleController = {
     addPole,
  getPoles,
  deletePole,
  updateMultiplePoles
}
module.exports = {
 poleController
};
