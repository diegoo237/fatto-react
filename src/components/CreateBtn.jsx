import styles from "../components/CreateBtn.module.css";

function CreateBtn({ handleClick }) {
  return (
    <button onClick={handleClick} className={styles.btn}>
      Criar Tarefa
    </button>
  );
}
export default CreateBtn;
