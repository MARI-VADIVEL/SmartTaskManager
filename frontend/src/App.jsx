import {useState} from "react";
import "./App.css";

import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

import useTaskForm from "./hooks/useTaskForm";
import useTasks from "./hooks/useTasks";

import {
  filterTasks,
  getTaskStats
} from "./utils/taskUtils";

function App(){

  const {
    tasks,
    loading,
    addTask,
    editTask,
    toggleTask,
    deleteTask
  }=useTasks();

  const {
    form,
    setForm,
    editingId,
    resetForm,
    startEdit
  }=useTaskForm();

  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("all");

  const handleSubmit=async e=>{
    e.preventDefault();

    if(!form.title.trim()){
      return;
    }

    try{

      if(editingId){

        const currentTask=tasks.find(
          task=>String(task.ROWID)===String(editingId)
        );

        await editTask({
          rowId:editingId,
          title:form.title.trim(),
          description:form.description.trim(),
          status:currentTask?.status||"Active",
          priority:form.priority,
          category:form.category,
          dueDate:form.dueDate||"",
          userId:currentTask?.userId||"local-user",
          taskOrder:currentTask?.taskOrder||"1"
        });

      }else{

        await addTask({
          title:form.title.trim(),
          description:form.description.trim(),
          priority:form.priority,
          category:form.category,
          dueDate:form.dueDate||""
        });

      }

      resetForm();

    }catch(error){
      console.error(error);
    }
  };

  const cancelEdit=()=>{
    resetForm();
  };

  const handleDelete=async rowId=>{

    const confirmed=window.confirm(
      "Are you sure you want to delete this task?"
    );

    if(!confirmed){
      return;
    }

    try{

      await deleteTask(rowId);

      if(String(editingId)===String(rowId)){
        resetForm();
      }

    }catch(error){
      console.error(error);
    }
  };

  const handleAddClick=()=>{
    resetForm();

    document
      .querySelector(".taskForm")
      ?.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
  };

  const filteredTasks=filterTasks(
    tasks,
    search,
    filter
  );

  const stats=getTaskStats(tasks);

  return(
    <div className="app">

      <Header
        onAdd={handleAddClick}
      />

      <Stats
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
      />

      <TaskForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        onSubmit={handleSubmit}
        onCancel={cancelEdit}
      />

      <TaskFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        loading={loading}
        onToggle={toggleTask}
        onEdit={startEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default App;