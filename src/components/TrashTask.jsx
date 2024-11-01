import trashIcon from "../assets/trash.svg";
import axios from "axios";

function TrashTask({ task, setTaskList }) {
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
    <button>
      <img
        onClick={() => deleteTask(task._id)}
        src={trashIcon}
        alt="Excluir tarefa"
      />
    </button>
  );
}
export default TrashTask;
