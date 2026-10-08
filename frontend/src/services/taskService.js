const API="/api/server/todo/execute";

const request=async params=>{

  const query=new URLSearchParams(params);

  const response=await fetch(
    `${API}?${query.toString()}`
  );

  if(!response.ok){
    throw new Error(
      `Request failed: ${response.status}`
    );
  }

  const result=await response.json();

  const data=JSON.parse(result.output);

  if(!data.success){
    throw new Error(
      data.error||"Request failed"
    );
  }

  return data.data;
};

export const getTasks=async()=>{
  const query=new URLSearchParams({
    action:"list"
  });

  const response=await fetch(
    `${API}?${query.toString()}`
  );

  if(!response.ok){
    throw new Error(
      `Load tasks failed: ${response.status}`
    );
  }

  const result=await response.json();

  const data=JSON.parse(result.output);

  return data.data||[];
};

export const createTask=async({
  title,
  description,
  priority,
  category,
  dueDate,
  taskOrder
})=>{
  return await request({
    action:"add",
    title:title.trim(),
    description:description||"",
    status:"Active",
    taskStatus:priority,
    category:category,
    dueDate:dueDate||"",
    userId:"local-user",
    taskOrder:String(taskOrder)
  });
};

export const updateTask=async({
  rowId,
  title,
  description,
  status,
  priority,
  category,
  dueDate,
  userId,
  taskOrder
})=>{
  return await request({
    action:"update",
    rowId:String(rowId),
    title:title||"",
    description:description||"",
    status:status||"Active",
    taskStatus:priority||"MEDIUM",
    category:category||"GENERAL",
    dueDate:dueDate||"",
    userId:userId||"local-user",
    taskOrder:String(taskOrder||"1")
  });
};

export const changeTaskStatus=async(
  rowId,
  status
)=>{
  return await request({
    action:"update",
    rowId:String(rowId),
    status:status
  });
};

export const removeTask=async rowId=>{
  await request({
    action:"delete",
    rowId:String(rowId)
  });

  return{
    success:true
  };
};