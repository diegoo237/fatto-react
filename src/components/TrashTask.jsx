import trashIcon from "../assets/trash.svg";
import TrashConfirm from "./TrashConfirm";
import { useState } from "react";

function TrashTask({ task, setTaskList }) {
  const [visible, setVisible] = useState(false);

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar a tarefa");
      }

      const result = await response.json();
      console.log(result.message);

      setTaskList((prevList) => prevList.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  return (
    <>
      <TrashConfirm
        deleteTask={deleteTask}
        id={task._id}
        visible={visible}
        setVisible={setVisible}
        task={task}
      />
      <button>
        <img
          onClick={() => setVisible(true)}
          src={trashIcon}
          alt="Excluir tarefa"
        />
      </button>
    </>
  );
}
export default TrashTask;
