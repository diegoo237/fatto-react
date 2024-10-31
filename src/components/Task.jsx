import styles from "./Task.module.css";
function Task() {
  return (
    <div className={styles.container}>
      <input type="checkbox"></input>
      <p>id</p>
      <p>titulo</p>
      <p>$</p>
      <p>Data limite</p>
      <button>
        Editar
        <img></img>
      </button>
      <button>
        Excluir
        <img></img>
      </button>

      <div className={styles.movimentar}>
        <button>
          subir
          <img></img>
        </button>
        <button>
          descer
          <img></img>
        </button>
      </div>
    </div>
  );
}
export default Task;
