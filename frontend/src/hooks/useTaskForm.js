import {useState} from "react";

const initialForm={
  title:"",
  description:"",
  priority:"MEDIUM",
  category:"GENERAL",
  dueDate:""
};

function useTaskForm(){

  const [form,setForm]=useState(initialForm);
  const [editingId,setEditingId]=useState(null);

  const resetForm=()=>{
    setForm({
      ...initialForm
    });

    setEditingId(null);
  };

  const startEdit=task=>{

    setEditingId(task.ROWID);

    setForm({
      title:task.title||"",
      description:task.description||"",
      priority:task.taskStatus||"MEDIUM",
      category:task.category||"GENERAL",
      dueDate:task.dueDate||""
    });

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  };

  return{
    form,
    setForm,
    editingId,
    setEditingId,
    resetForm,
    startEdit
  };
}

export default useTaskForm;