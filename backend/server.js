const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Rota para buscar todas as tarefas
app.get("/items", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ ordem: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    res.status(500).json({ message: "Erro ao buscar as tarefas" });
  }
});

// Rota para criar um novo item
app.post("/items", async (req, res) => {
  const { codigo, titulo, preco, data } = req.body;

  try {
    // Verifica se já existe uma tarefa com o mesmo título
    const existingTask = await Task.findOne({ titulo });
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Título já existe. Escolha outro." });
    }

    const maxOrderTask = await Task.findOne({}, {}, { sort: { ordem: -1 } });
    const newOrder = maxOrderTask ? maxOrderTask.ordem + 1 : 1;

    const newTask = new Task({
      codigo,
      titulo,
      preco,
      data,
      ordem: newOrder,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).send({ error: "Erro ao criar tarefa" });
  }
});

// Rota para editar uma tarefa
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, preco, data } = req.body;

  try {
    const existingTask = await Task.findOne({ titulo });
    if (existingTask && existingTask._id.toString() !== id) {
      return res
        .status(400)
        .json({ message: "Título já existe. Escolha outro." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { titulo, preco, data },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a tarefa", error });
  }
});

// Função para atualizar a ordem das tarefas
const updateTaskOrder = async (taskId, newOrder) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Tarefa não encontrada");

  const currentOrder = task.ordem;

  if (currentOrder === newOrder) return;

  if (newOrder < currentOrder) {
    await Task.updateMany(
      { ordem: { $gte: newOrder, $lt: currentOrder } },
      { $inc: { ordem: 1 } }
    );
  } else {
    await Task.updateMany(
      { ordem: { $gt: currentOrder, $lte: newOrder } },
      { $inc: { ordem: -1 } }
    );
  }

  await Task.findByIdAndUpdate(taskId, { ordem: newOrder });
};

// Rota para mover a tarefa para cima
app.put("/items/:id/move-up", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    if (task.ordem === 1) {
      return res
        .status(400)
        .json({ message: "A tarefa já está na primeira posição" });
    }

    await updateTaskOrder(task._id, task.ordem - 1);

    res.status(200).json({ message: "Tarefa movida para cima" });
  } catch (error) {
    console.error("Erro ao mover tarefa para cima:", error);
    res.status(500).json({ message: "Erro ao mover tarefa para cima" });
  }
});

// Rota para mover a tarefa para baixo
app.put("/items/:id/move-down", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    const belowTask = await Task.findOne({ ordem: task.ordem + 1 });
    if (!belowTask) {
      return res
        .status(400)
        .json({ message: "A tarefa já está na última posição" });
    }

    await updateTaskOrder(task._id, task.ordem + 1);

    res.status(200).json({ message: "Tarefa movida para baixo" });
  } catch (error) {
    console.error("Erro ao mover tarefa para baixo:", error);
    res.status(500).json({ message: "Erro ao mover tarefa para baixo" });
  }
});

// Rota para excluir uma tarefa
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ message: "Tarefa não encontrada" });

    await Task.findByIdAndDelete(id);

    const updatedTasks = await Task.find({ ordem: { $gt: task.ordem } });

    for (const t of updatedTasks) {
      t.ordem -= 1;
      await t.save();
    }

    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ message: "Erro ao excluir tarefa" });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
