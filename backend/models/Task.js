const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  preco: {
    type: Number, // Ajuste para Number se for trabalhar com valores numéricos
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
