import chevronUpIcon from "../assets/chevronUp.svg";
import chevronDownIcon from "../assets/chevronDown.svg";
import axios from "axios";

function MovimentTask({ task, taskList, setTaskList }) {
  const moveUp = async () => {
    try {
      await axios.put(`http://localhost:5000/items/${task._id}/move-up`);

      // Atualize a lista de tarefas localmente
      setTaskList((prevTasks) => {
        const index = prevTasks.findIndex((t) => t._id === task._id);
        if (index > 0) {
          const newTasks = [...prevTasks];
          const [movedTask] = newTasks.splice(index, 1);
          newTasks.splice(index - 1, 0, movedTask); // Move a tarefa para cima
          return newTasks;
        }
        return prevTasks; // Se já estiver no topo, não faz nada
      });
    } catch (error) {
      console.error("Erro ao mover tarefa para cima:", error);
    }
  };

  const moveDown = async () => {
    try {
      await axios.put(`http://localhost:5000/items/${task._id}/move-down`);

      // Atualize a lista de tarefas localmente
      setTaskList((prevTasks) => {
        const index = prevTasks.findIndex((t) => t._id === task._id);
        if (index < prevTasks.length - 1) {
          const newTasks = [...prevTasks];
          const [movedTask] = newTasks.splice(index, 1);
          newTasks.splice(index + 1, 0, movedTask); // Move a tarefa para baixo
          return newTasks;
        }
        return prevTasks; // Se já estiver na parte inferior, não faz nada
      });
    } catch (error) {
      console.error("Erro ao mover tarefa para baixo:", error);
    }
  };
  return (
    <>
      <button onClick={moveUp}>
        <img src={chevronUpIcon} alt="Mover tarefa para cima" />
      </button>
      <button onClick={moveDown}>
        <img src={chevronDownIcon} alt="Mover tarefa para baixo" />
      </button>
    </>
  );
}

export default MovimentTask;
