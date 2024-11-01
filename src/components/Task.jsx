import EditTask from "./EditTask";
import TrashTask from "./TrashTask";
import MovimentTask from "./MovimentTask";
import styles from "./Task.module.css";

function Task({ task, setTaskList }) {
  return (
    <div className={styles.container}>
      <div className={styles.taskContainer}>
        <input type="checkbox" />
        <p>{task.codigo}</p>
        <p>{task.titulo}</p>
        <p>{task.preco}</p>
        <p>{task.data ? new Date(task.data).toLocaleDateString() : ""}</p>
      </div>

      <div className={styles.icons}>
        <span>
          <EditTask />
          <TrashTask task={task} setTaskList={setTaskList} />
        </span>
        <span className={styles.movimentar}>
          <MovimentTask />
        </span>
      </div>
    </div>
  );
}

export default Task;
