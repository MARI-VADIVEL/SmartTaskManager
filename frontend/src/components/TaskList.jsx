import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  loading,
  onToggle,
  onEdit,
  onDelete
}){
  if(loading){
    return(
      <div className="tasks">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if(tasks.length===0){
    return(
      <div className="empty">
        <h3>No tasks found</h3>
        <p>
          Add a new task to get started.
        </p>
      </div>
    );
  }

  return(
    <div className="tasks">

      {tasks.map(task=>(
        <TaskCard
          key={task.ROWID}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default TaskList;