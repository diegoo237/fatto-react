import styles from "./TrashConfirm.module.css";
import { useRef, useEffect } from "react";

function TrashConfirm({ deleteTask, id, visible, setVisible, task }) {
  const componentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setVisible(false);
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
    <div
      ref={componentRef}
      className={visible ? styles.container : "invisible"}
    >
      <h3>Tem certeza que deseja excluir o projeto {task.titulo} ?</h3>
      <span>
        <button onClick={() => deleteTask(id)}>Confirmar</button>
        <button onClick={() => setVisible(false)}>Cancelar</button>
      </span>
    </div>
  );
}
export default TrashConfirm;
