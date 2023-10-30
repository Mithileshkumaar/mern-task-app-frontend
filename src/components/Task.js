
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa"

const Task = ({ task, index, deleteTask }) => {
      return (
            <div className="task">
                  <p>
                        <b>
                              {index + 1}
                        </b>
                        {task.name}
                  </p>
                  <div className="task-icons">
                        <FaEdit />
                        <FaCheckDouble />
                        <FaRegTrashAlt onClick={() => deleteTask(task._id)} />
                  </div>
            </div>
      )
}

export default Task