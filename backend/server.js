const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Importa o modelo
const Item = require("./models/Task");
const Task = require("./models/Task"); // Certifique-se de que você tenha um modelo Task

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Rota para buscar todas as tarefas
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ ordem: 1 });
    res.status(200).json(tasks); // Retorna as tarefas como JSON
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    res.status(500).json({ message: "Erro ao buscar as tarefas" });
  }
});

// Rota para criar um novo item
app.post("/items", async (req, res) => {
  const { codigo, titulo, preco, data } = req.body;

  try {
    // Recupera a maior ordem existente
    const maxOrderTask = await Task.findOne({}, {}, { sort: { ordem: -1 } });
    const newOrder = maxOrderTask ? maxOrderTask.ordem + 1 : 1; // Se não houver tarefas, começa com 1

    const newTask = new Task({
      codigo,
      titulo,
      preco,
      data,
      ordem: newOrder, // Define a nova ordem
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).send({ error: "Erro ao criar tarefa" });
  }
});

// Rota para excluir uma tarefa
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
    res.status(500).json({ message: "Erro ao excluir a tarefa" });
  }
});

// rota para editar uma tarefa
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, preco, data } = req.body; // Pegando os dados do corpo da requisição

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { titulo, preco, data },
      { new: true } // Para retornar a tarefa atualizada
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a tarefa", error });
  }
});

// Rota para mover a tarefa para cima
app.put("/items/:id/move-up", async (req, res) => {
  const { id } = req.params;

  try {
    // Primeiro, obtenha a tarefa que está sendo movida
    const taskToMove = await Task.findById(id);
    if (!taskToMove) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Verifique se a tarefa pode ser movida para cima
    if (taskToMove.ordem > 1) {
      // Obtenha a tarefa acima
      const taskAbove = await Task.findOne({ ordem: taskToMove.ordem - 1 });

      // Se houver uma tarefa acima, atualize a ordem dela
      if (taskAbove) {
        taskAbove.ordem += 1; // Aumente a ordem da tarefa acima
        await taskAbove.save(); // Salve as alterações
      }

      // Atualize a ordem da tarefa que está sendo movida
      taskToMove.ordem -= 1; // Mova a tarefa para cima
      await taskToMove.save(); // Salve as alterações
    }

    res.json(taskToMove);
  } catch (error) {
    console.error("Erro ao mover tarefa para cima:", error);
    res.status(500).json({ message: "Erro ao mover tarefa", error });
  }
});

// Rota para mover a tarefa para baixo
app.put("/items/:id/move-down", async (req, res) => {
  const { id } = req.params;

  try {
    // Primeiro, obtenha a tarefa que está sendo movida
    const taskToMove = await Task.findById(id);
    if (!taskToMove) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Verifique se a tarefa pode ser movida para baixo
    const nextTask = await Task.findOne({ ordem: taskToMove.ordem + 1 });
    if (nextTask) {
      // Atualize a ordem da tarefa abaixo
      nextTask.ordem -= 1; // Reduza a ordem da tarefa abaixo
      await nextTask.save(); // Salve as alterações
    }

    // Agora, atualize a ordem da tarefa movida
    taskToMove.ordem += 1; // Mova a tarefa para baixo
    await taskToMove.save(); // Salve as alterações

    res.json(taskToMove);
  } catch (error) {
    console.error("Erro ao mover tarefa para baixo:", error);
    res.status(500).json({ message: "Erro ao mover tarefa", error });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
