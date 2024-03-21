const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: { type: Number },
  description: { type: String },
  complete: {
    type: Boolean,
    default: false,
  },
  date: { type: Date },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
