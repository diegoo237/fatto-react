import editIcon from "../assets/edit.svg";
import EditTaskForm from "./EditTaskForm";
import { useState } from "react";

function EditTask({ task, setTaskList }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <EditTaskForm
        task={task}
        setTaskList={setTaskList}
        setVisible={setVisible}
        visible={visible}
      />
      <button onClick={() => setVisible(true)}>
        <img src={editIcon} alt="Editar tarefa" />
      </button>
    </>
  );
}
export default EditTask;
