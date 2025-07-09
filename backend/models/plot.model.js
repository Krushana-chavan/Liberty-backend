const mongoose = require("mongoose");

const PlotSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    coordinates: [[Number]], // Array of [lat, lng]
    color: String,
  },
  { timestamps: true }
);

const plotModel = mongoose.model("plot", PlotSchema);

module.exports = {
  plotModel,
};
