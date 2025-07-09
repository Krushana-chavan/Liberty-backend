const mongoose = require("mongoose");

const PoleSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    coordinates: [Number], // [latitude, longitude]
    plotId: String,        // ID of the associated plot
    status: String,        // Example: "valid", "invalid", etc.
  },
  { timestamps: true }
);

const poleModel = mongoose.model("pole", PoleSchema);

module.exports = {
  poleModel,
};
