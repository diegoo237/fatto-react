import { useState } from "react";
import axios from "axios";
import styles from "./EditTaskForm.module.css";

function EditTaskForm({ visible, setVisible, task, setTaskList }) {
  const [titulo, setTitulo] = useState(task.titulo || "");
  const [preco, setPreco] = useState(task.preco || 0);
  const [data, setData] = useState(task.data ? task.data.split("T")[0] : ""); // Formato YYYY-MM-DD

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/items/${task._id}`,
        {
          titulo,
          preco,
          data,
        }
      );

      // Atualize a lista de tarefas localmente
      setTaskList((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );

      setVisible(false); // Fecha o formulário após a atualização
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  return (
    <div className={visible ? styles.container : "invisible"}>
      <form onSubmit={handleSubmit}>
        <p>Nome da tarefa</p>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <p>Custo da tarefa</p>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <p>Prazo da tarefa</p>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditTaskForm;
