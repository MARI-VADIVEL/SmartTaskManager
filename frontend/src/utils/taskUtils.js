
const getTodayString=()=>{
  const today=new Date();

  return[
    today.getFullYear(),
    String(today.getMonth()+1).padStart(2,"0"),
    String(today.getDate()).padStart(2,"0")
  ].join("-");
};

export const filterTasks=(tasks,search,filter)=>{
  const searchText=search.trim().toLowerCase();
  const today=getTodayString();

  return tasks.filter(task=>{
    const title=(task.title||"").toLowerCase();
    const description=(task.description||"").toLowerCase();
    const category=(task.category||"").toLowerCase();
    const priority=(task.taskStatus||"").toLowerCase();
    const dueDate=String(task.dueDate||"").slice(0,10);
    const status=(task.status||"Active").trim();

    const matchesSearch=
      title.includes(searchText)||
      description.includes(searchText)||
      category.includes(searchText)||
      priority.includes(searchText);

    if(!matchesSearch){
      return false;
    }

    switch(filter){
      case "active":
        return status==="Active";

      case "completed":
        return status==="Completed";

      case "high":
        return priority==="high";

      case "today":
        return dueDate===today&&status!=="Completed";

      case "upcoming":
        return dueDate!==""&&dueDate>today&&status!=="Completed";

      case "overdue":
        return dueDate!==""&&dueDate<today&&status!=="Completed";

      default:
        return true;
    }
  });
};

export const sortTasks=(tasks,sortBy)=>{
  const priorityRank={
    HIGH:3,
    MEDIUM:2,
    LOW:1
  };

  return [...tasks].sort((a,b)=>{
    const dateA=String(a.dueDate||"").slice(0,10);
    const dateB=String(b.dueDate||"").slice(0,10);

    switch(sortBy){
      case "dueDate":
        if(!dateA)return dateB?1:0;
        if(!dateB)return -1;
        return dateA.localeCompare(dateB);

      case "priority":
        return(
          (priorityRank[(b.taskStatus||"MEDIUM").toUpperCase()]||2)-
          (priorityRank[(a.taskStatus||"MEDIUM").toUpperCase()]||2)
        );

      case "newest":
      default:
        return Number(b.ROWID||0)-Number(a.ROWID||0);
    }
  });
};

export const getTaskStats=tasks=>{
  const today=getTodayString();

  const activeTasks=tasks.filter(
    task=>(task.status||"Active").trim()!=="Completed"
  );

  const completed=tasks.filter(
    task=>(task.status||"Active").trim()==="Completed"
  ).length;

  const overdue=activeTasks.filter(task=>{
    const dueDate=String(task.dueDate||"").slice(0,10);
    return dueDate!==""&&dueDate<today;
  }).length;

  const important=activeTasks.filter(
    task=>task.important===true||task.important==="true"
  ).length;

  return{
    total:tasks.length,
    active:activeTasks.length,
    completed,
    overdue,
    important
  };
};