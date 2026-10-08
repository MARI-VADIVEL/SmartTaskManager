import {useEffect,useState} from "react";

import {
  getTasks,
  createTask,
  updateTask,
  changeTaskStatus,
  removeTask
} from "../services/taskService";

function useTasks(){

  const [tasks,setTasks]=useState([]);
  const [loading,setLoading]=useState(true);

  const loadTasks=async()=>{
    try{
      setLoading(true);

      const data=await getTasks();

      setTasks(data);

    }catch(error){
      console.error(error);
      alert("Failed to load tasks");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    loadTasks();
  },[]);

  const addTask=async task=>{
    try{

      await createTask({
        title:task.title,
        description:task.description,
        priority:task.priority,
        category:task.category,
        dueDate:task.dueDate,
        taskOrder:tasks.length+1
      });

      await loadTasks();

    }catch(error){
      console.error(error);
      alert("Failed to add task");
      throw error;
    }
  };

  const editTask=async task=>{
    try{

      await updateTask(task);

      await loadTasks();

    }catch(error){
      console.error(error);
      alert("Failed to update task");
      throw error;
    }
  };

  const toggleTask=async task=>{
    try{

      const newStatus=
        (task.status||"Active")==="Completed"
          ?"Active"
          :"Completed";

      await changeTaskStatus(
        task.ROWID,
        newStatus
      );

      await loadTasks();

    }catch(error){
      console.error(error);
      alert("Failed to update task");
      throw error;
    }
  };

  const deleteTask=async rowId=>{
    try{

      await removeTask(rowId);

      await loadTasks();

    }catch(error){
      console.error(error);
      alert("Failed to delete task");
      throw error;
    }
  };

  return{
    tasks,
    loading,
    loadTasks,
    addTask,
    editTask,
    toggleTask,
    deleteTask
  };
}

export default useTasks;