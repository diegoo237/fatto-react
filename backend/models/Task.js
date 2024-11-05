const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  ordem: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
