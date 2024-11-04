import styles from "./CreateTaskForm.module.css";
import axios from "axios";
import { useState } from "react";

function CreateTaskForm({ visible, setTaskList }) {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    const codigo = `COD-${Math.floor(Math.random() * 100000)}`;

    const newItem = {
      codigo,
      titulo,
      preco: parseFloat(preco),
      data: new Date(data), // Converte a string para Date
    };

    try {
      const response = await axios.post("http://localhost:5000/items", newItem);
      setTaskList((prevTasks) => [...prevTasks, response.data]);

      console.log("Item criado:", response.data);
      // Aqui você pode adicionar lógica para lidar com o que acontece após a criação do item
    } catch (error) {
      console.error("Erro ao criar item:", error);
    }
  };
  return (
    <form
      className={visible ? styles.form : "invisible"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        placeholder="Preço"
        required
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
      />
      <button type="submit">Adicionar Item</button>
    </form>
  );
}
export default CreateTaskForm;
