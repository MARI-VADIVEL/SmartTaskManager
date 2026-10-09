
function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete
}){
  const completedTask=(task.status||"").trim()==="Completed";
  const dueDate=String(task.dueDate||"").slice(0,10);

  const now=new Date();
  const today=[
    now.getFullYear(),
    String(now.getMonth()+1).padStart(2,"0"),
    String(now.getDate()).padStart(2,"0")
  ].join("-");

  const overdue=Boolean(dueDate)&&dueDate<today&&!completedTask;

  const formattedDate=dueDate
    ?new Date(dueDate+"T00:00:00").toLocaleDateString("en-IN",{
      day:"numeric",
      month:"short",
      year:"numeric"
    })
    :"";

  return(
    <div className="taskCard">
      <div className="taskLeft">
        <button
          type="button"
          className="check"
          onClick={()=>onToggle(task)}
          title={completedTask?"Mark as active":"Mark as completed"}
        >
          {completedTask?"✓":"○"}
        </button>

        <div className="taskContent">
          <h3 className={completedTask?"completed":""}>
            {task.title}
          </h3>

          {task.description&&(
            <p>{task.description}</p>
          )}

          <div className="meta">
            <span>{task.category||"GENERAL"}</span>

            <span>{task.taskStatus||"MEDIUM"}</span>

            {dueDate&&(
              <span
                style={{
                  display:"inline-block",
                  padding:"5px 9px",
                  borderRadius:"999px",
                  fontSize:"11px",
                  fontWeight:700,
                  color:overdue?"#ffffff":"#93c5fd",
                  background:overdue?"#b91c1c":"#172554",
                  border:overdue?"1px solid #ef4444":"1px solid #2563eb"
                }}
              >
                {overdue?"⚠ Overdue · ":"📅 Due · "}{formattedDate}
              </span>
            )}
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