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
    const tasks = await Task.find(); // Garante que busca todas as tarefas no banco de dados
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
    const novoItem = new Item({ codigo, titulo, preco, data });
    await novoItem.save();
    res.status(201).send(novoItem);
  } catch (error) {
    res.status(400).send({ error: "Erro ao criar item" });
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

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
