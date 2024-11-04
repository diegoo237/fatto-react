import styles from "./HomePage.module.css";
import Task from "../components/Task";
import CreateBtn from "../components/CreateBtn";
import CreateTaskForm from "../components/CreateTaskForm";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks"); // Use a URL completa

        console.log("Resposta da API:", response.data); // Veja a resposta no console
        setTaskList(response.data); // Armazena as tarefas
      } catch (error) {
        console.error("Erro ao buscar as tarefas:", error);
        setError("Não foi possível carregar as tarefas."); // Atualiza o estado de erro
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };

    fetchTasks(); // Chama a função para buscar as tarefas
  }, []); // Executa apenas uma vez ao montar o componente

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  if (loading) {
    return <p>Carregando tarefas...</p>; // Exibe uma mensagem de loading
  }

  if (error) {
    return <p>{error}</p>; // Exibe mensagem de erro
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        {visible && (
          <CreateTaskForm setTaskList={setTaskList} visible={visible} />
        )}

        <aside>
          {taskList.map((task) => (
            <Task setTaskList={setTaskList} key={task._id} task={task} /> // Renderiza cada tarefa
          ))}
        </aside>
        <CreateBtn handleClick={handleClick} />
      </section>
    </main>
  );
}

export default HomePage;
