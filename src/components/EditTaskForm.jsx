import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./EditTaskForm.module.css";

function EditTaskForm({ visible, setVisible, task, setTaskList }) {
  const [titulo, setTitulo] = useState(task.titulo || "");
  const [preco, setPreco] = useState(task.preco || 0);
  const [data, setData] = useState(task.data ? task.data.split("T")[0] : "");
  const [errorMessage, setErrorMessage] = useState("");
  const componentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setVisible(false);
      setErrorMessage("");
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.put(
        `http://localhost:5000/items/${task._id}`,
        { titulo, preco, data }
      );

      setTaskList((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? response.data : t))
      );

      setVisible(false); // Fecha o formulário após a atualização
    } catch (error) {
      // Verifica se há uma mensagem de erro no backend
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Define a mensagem recebida do backend
      } else {
        setErrorMessage("Erro ao editar tarefa. Tente novamente.");
      }
    }
  };

  return (
    <div
      ref={componentRef}
      className={visible ? styles.container : "invisible"}
    >
      <form onSubmit={handleSubmit}>
        <p>Nome da tarefa</p>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <p>Custo da tarefa</p>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <p>Prazo da tarefa</p>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>

        {/* Exibe a mensagem de erro, se houver */}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EditTaskForm;
