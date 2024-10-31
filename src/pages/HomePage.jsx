import styles from "./HomePage.module.css";
import Task from "../components/Task";
import CreateBtn from "../components/CreateBtn";
import CreateTaskForm from "../components/CreateTaskForm";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [visible, setVisible] = useState(false); // Inicializando como false
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tasks"); // Use a URL completa

        console.log("Resposta da API:", response.data); // Veja a resposta no console
        setTasks(response.data); // Armazena as tarefas
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
    setVisible((prev) => !prev); // Alterna a visibilidade do formulário
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
        {visible && <CreateTaskForm visible={visible} />}
        <aside>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <Task key={task._id} task={task} /> // Renderiza cada tarefa
            ))
          ) : (
            <p>Nenhuma tarefa encontrada.</p> // Mensagem caso não haja tarefas
          )}
        </aside>
        <CreateBtn handleClick={handleClick} />
      </section>
    </main>
  );
}

export default HomePage;
