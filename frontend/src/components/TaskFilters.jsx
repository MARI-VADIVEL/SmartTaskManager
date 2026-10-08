function TaskFilters({
  search,
  setSearch,
  filter,
  setFilter
}){
  return(
    <div className="controls">

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />

      <div className="filters">

        <button
          className={filter==="all"?"activeFilter":""}
          onClick={()=>setFilter("all")}
        >
          All
        </button>

        <button
          className={filter==="active"?"activeFilter":""}
          onClick={()=>setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter==="completed"?"activeFilter":""}
          onClick={()=>setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={filter==="high"?"activeFilter":""}
          onClick={()=>setFilter("high")}
        >
          High
        </button>

      </div>

    </div>
  );
}

export default TaskFilters;