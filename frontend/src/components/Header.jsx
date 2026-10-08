function Header({
  onAdd
}){
  return(
    <header>

      <div>
        <h1>Smart Task Manager</h1>

        <p>
          Organize your work. Stay productive.
        </p>
      </div>

      <button
        className="addButton"
        onClick={onAdd}
      >
        + Add Task
      </button>

    </header>
  );
}

export default Header;