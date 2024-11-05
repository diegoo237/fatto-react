import EditTask from "./EditTask";
import TrashTask from "./TrashTask";
import MovimentTask from "./MovimentTask";
import styles from "./Task.module.css";

function Task({ task, setTaskList }) {
  const containerClass =
    task.preco >= 1000 ? styles.containerM : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.taskContainer}>
        <input type="checkbox" />
        <span>
          <p>id</p>
          {task.codigo}
        </span>
        <span>
          <p>Nome</p>
          {task.titulo}
        </span>
        <span>
          <p>Custo</p>
          {`${task.preco}$`}
        </span>
        <span>
          <p>Prazo</p>
          {task.data ? new Date(task.data).toLocaleDateString() : ""}
        </span>
      </div>

      <div className={styles.icons}>
        <span>
          <EditTask task={task} setTaskList={setTaskList} />
          <TrashTask task={task} setTaskList={setTaskList} />
        </span>
        <span className={styles.movimentar}>
          <MovimentTask task={task} setTaskList={setTaskList} />
        </span>
      </div>
    </div>
  );
}

export default Task;
