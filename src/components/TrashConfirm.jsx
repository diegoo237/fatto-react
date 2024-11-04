import styles from "./TrashConfirm.module.css";
function TrashConfirm({ deleteTask, id, visible, setVisible }) {
  return (
    <div className={visible ? styles.container : "invisible"}>
      <h3>Tem certeza que deseja excluir o projeto X</h3>
      <span>
        <button onClick={() => deleteTask(id)}>Confirmar</button>
        <button onClick={() => setVisible(false)}>Cancelar</button>
      </span>
    </div>
  );
}
export default TrashConfirm;
