function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete
}){
  const completedTask=
    (task.status||"").trim()==="Completed";

  return(
    <div className="taskCard">

      <div className="taskLeft">

        <button
          className="check"
          onClick={()=>onToggle(task)}
          title={
            completedTask
              ?"Mark as active"
              :"Mark as completed"
          }
        >
          {completedTask
            ?"✓"
            :"○"}
        </button>

        <div className="taskContent">

          <h3
            className={
              completedTask
                ?"completed"
                :""
            }
          >
            {task.title}
          </h3>

          {task.description&&(
            <p>{task.description}</p>
          )}

          <div className="meta">

            <span>
              {task.category||"GENERAL"}
            </span>

            <span>
              {task.taskStatus||"MEDIUM"}
            </span>

          </div>

        </div>

      </div>

      <div className="taskActions">

        <button
          type="button"
          className="editButton"
          onClick={()=>onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          className="deleteButton"
          onClick={()=>onDelete(task.ROWID)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;