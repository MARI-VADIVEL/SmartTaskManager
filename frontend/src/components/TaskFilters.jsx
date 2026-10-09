
function TaskFilters({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy
}){
  const filters=[
    {value:"all",label:"All"},
    {value:"active",label:"Active"},
    {value:"completed",label:"Completed"},
    {value:"today",label:"Today"},
    {value:"upcoming",label:"Upcoming"},
    {value:"overdue",label:"Overdue"},
    {value:"high",label:"High Priority"}
  ];

  return(
    <div className="filterSection">
      <div className="controls">
        <input
          type="search"
          placeholder="Search title, description, category..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />

        <select
          className="sortSelect"
          value={sortBy}
          onChange={e=>setSortBy(e.target.value)}
          aria-label="Sort tasks"
        >
          <option value="newest">Newest first</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority: High to Low</option>
        </select>
      </div>

      <div className="filters">
        {filters.map(item=>(
          <button
            type="button"
            key={item.value}
            className={filter===item.value?"activeFilter":""}
            onClick={()=>setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilters;