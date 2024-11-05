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
        const response = await axios.get("http://localhost:5000/items");

        setTaskList(response.data);
      } catch (error) {
        console.error("Erro ao buscar as tarefas:", error);
        setError("Não foi possível carregar as tarefas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  if (loading) {
    return <p>Carregando tarefas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        {visible && (
          <CreateTaskForm
            setTaskList={setTaskList}
            visible={visible}
            setVisible={setVisible}
          />
        )}

        <aside>
          {taskList.map((task) => (
            <Task setTaskList={setTaskList} key={task._id} task={task} />
          ))}
        </aside>
        <CreateBtn handleClick={handleClick} />
      </section>
    </main>
  );
}

export default HomePage;
