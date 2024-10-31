import chevronUpIcon from "../assets/chevronUp.svg";
import chevronDownIcon from "../assets/chevronDown.svg";
function MovimentTask() {
  return (
    <>
      <button>
        <img src={chevronUpIcon} alt="Mover tarefa para cima" />
      </button>
      <button>
        <img src={chevronDownIcon} alt="Mover tarefa para baixo" />
      </button>
    </>
  );
}
export default MovimentTask;
