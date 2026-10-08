export const filterTasks=(tasks,search,filter)=>{
  const searchText=search.toLowerCase();

  return tasks.filter(task=>{

    const title=(task.title||"").toLowerCase();
    const description=(task.description||"").toLowerCase();

    const matchesSearch=
      title.includes(searchText)||
      description.includes(searchText);

    if(!matchesSearch){
      return false;
    }

    if(filter==="active"){
      return task.status==="Active";
    }

    if(filter==="completed"){
      return task.status==="Completed";
    }

    if(filter==="high"){
      return task.taskStatus==="HIGH";
    }

    return true;
  });
};

export const getTaskStats=tasks=>{
  return{
    total:tasks.length,

    active:tasks.filter(
      task=>task.status==="Active"
    ).length,

    completed:tasks.filter(
      task=>task.status==="Completed"
    ).length
  };
};