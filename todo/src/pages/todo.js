import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Todo (){
    const [task, setTask] =useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/todos").then((res) => setTasks(res.data));
      }, []);


     const handleAddTask = () => {
    const newTask = { id: Date.now().toString(), task };
    axios.post("http://localhost:5000/todos", newTask).then(() => {
      setTasks([...tasks, newTask]);
      setTask("");
    });
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };
    
    return(
        <>
       <h1>Todo App</h1>
       <p>Welcome to your Todo App!</p>
       <input type="text" placeholder="Enter the task" value={task}  onChange={(e) => setTask(e.target.value)}></input>
       <button onClick={handleAddTask}>Add Task</button>

       <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.task}
            <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
        </>
    )
}