import { useState, useEffect, React } from 'react';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';
import Task from './Task';
import LoadingImg from '../assets/22.gif'
// import URL from '../App';
import axios from "axios";
//http://localhost:4000/api/tasks
const TaskList = () => {
      const [tasks, setTasks] = useState([])
      const [completedTasks, setCompletedTasks] = useState([])
      const [isLoading, setIsLoading] = useState(false)
      // const [deleteTask] = useState([])



      const [formData, setFormData] = useState({
            name: "",
            completed: false,
      })

      const { name } = formData

      const getTasks = async (e) => {
            setIsLoading(true)
            try {
                  const { data } = await axios.get(`http://localhost:4000/api/tasks/`);
                  setTasks(data)
                  setIsLoading(false)

            }
            // toast.sucess("got all tasks")


            catch (error) {
                  toast.error(error.message)
                  console.log(error)
                  setIsLoading(false)
            }
      };
      useEffect(() => {
            getTasks()
      })


      const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormData({ ...formData, [name]: value })
      };
      const createTask = async (e) => {
            e.preventDefault();
            if (name === '') {
                  return toast.error("empty")
            }
            try {
                  await axios.post('http://localhost:4000/api/tasks', formData)
                  toast.success("addes successfully")
                  setFormData({ ...formData, name: "" })

            }
            catch (error) {
                  toast.error(error.message);


            }

            // const deleteTask = async (id) => {
            //       try {
            //             await axios.delete(`http://localhost:4000/api/tasks/${id}`);
            //             getTasks();
            //       }
            //       catch (error) {
            //             toast.error(error.message)
            //       }
            // }

      };


      return (
            <div>
                  <h2>
                        Task Manager
                  </h2>
                  <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} />
                  <div className='--flex-between --pb'>
                        <p>
                              <b>total tasks:</b>0
                        </p>
                        <p>
                              <b>completed task:</b>0
                        </p>
                  </div>
                  <hr />
                  {
                        isLoading && (
                              <div className="--flex-center">
                                    <img src={LoadingImg} alt='loading' />
                              </div>
                        )
                  }
                  {
                        !isLoading && tasks.length === 0 ? (
                              <p>
                                    no task added.plz add a task
                              </p>
                        ) : (
                              <>
                                    {tasks.map((task, index) => {
                                          return <Task
                                                key={task._id}
                                                task={task}
                                                index={index}
                                          // deleteTask={deleteTask}
                                          />;
                                    })}
                              </>
                        )

                  }






            </div>
      )
}

export default TaskList