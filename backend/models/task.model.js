const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
      userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["Task", "Meeting", "Reminder"], // Adjust enums as needed
      default: "Task",
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    time: { type: String, default: "09:00" },
    color: {
      type: String,
      enum: ["Blue", "Red", "Green", "Yellow"], // Add all TaskColor values
      default: "Blue",
    },
    notes: { type: String, default: "" },
    assignees: { type: [String], default: [] },
    workflowStatus: {
      type: String,
      enum: ["No Action", "In Progress", "Accepted", "Done"], // Add all WorkflowStatus values
      default: "No Action",
    },
    completionStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    reminder: {
      type: String,
        enum: ["5m", "10m", "15m", "30m", "1h", "1d","None"],
    },
    isRecurring: { type: Boolean, default: false },
    recurringType: {
      type: String,
      enum: ["Daily", "Weekdays", "Weekly", "Monthly", "Yearly"],
      default: "Daily",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("task", TaskSchema);

module.exports = {
  taskModel,
};
