import trashIcon from "../assets/trash.svg";
import axios from "axios";

function TrashTask({ task }) {
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      console.log(response.data.message); // Mensagem de sucesso
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
