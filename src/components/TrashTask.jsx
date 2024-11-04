import trashIcon from "../assets/trash.svg";
import TrashConfirm from "./TrashConfirm";
import { useState } from "react";

import axios from "axios";

function TrashTask({ task, setTaskList }) {
  const [visible, setVisible] = useState(false);

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o projeto");
      }

      setTaskList((prevList) => prevList.filter((task) => task._id !== taskId));

      const result = await response.json();
      console.log(result.message);
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
