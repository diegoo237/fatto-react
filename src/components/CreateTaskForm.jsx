import styles from "./CreateTaskForm.module.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

function CreateTaskForm({ visible, setTaskList, setVisible }) {
  const [titulo, setTitulo] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const componentRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigo = `COD-${Math.floor(Math.random() * 100000)}`;
    setErrorMessage("");

    const newItem = {
      codigo,
      titulo,
      preco: parseFloat(preco),
      data: new Date(data),
    };

    try {
      const response = await axios.post("http://localhost:5000/items", newItem);
      setTaskList((prevTasks) => [...prevTasks, response.data]);
      setTitulo("");
      setPreco("");
      setData("");
      setVisible(false);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro ao criar item. Tente novamente.");
      }
    }
  };

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setVisible(false);
      setTitulo("");
      setPreco("");
      setData("");
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

  return (
    <form
      ref={componentRef}
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

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
}

export default CreateTaskForm;
