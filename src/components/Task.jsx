import EditTask from "./EditTask";
import TrashTask from "./TrashTask";
import MovimentTask from "./MovimentTask";
import styles from "./Task.module.css";

function Task({ task }) {
  // Verifica a estrutura de task no console
  console.log("Dados da tarefa:", task);

  return (
    <div className={styles.container}>
      <input type="checkbox" />
      <p>{task.id || task._id}</p> {/* Exibe o ID da tarefa */}
      <p>{task.title || "Título indisponível"}</p>{" "}
      {/* Exibe o título da tarefa */}
      <p>{task.value ? `${task.value}$` : "Valor indisponível"}</p>{" "}
      {/* Exibe o valor da tarefa */}
      <p>
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "Data indisponível"}
      </p>{" "}
      {/* Exibe a data */}
      <EditTask />
      <TrashTask task={task} />
      <div className={styles.movimentar}>
        <MovimentTask />
      </div>
    </div>
  );
}

export default Task;
