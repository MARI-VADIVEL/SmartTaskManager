function TaskForm({
  form,
  setForm,
  editingId,
  onSubmit,
  onCancel
}){
  return(
    <section className="taskForm">

      <h2>
        {editingId?"Edit Task":"Add New Task"}
      </h2>

      <form onSubmit={onSubmit}>

        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={e=>
            setForm({
              ...form,
              title:e.target.value
            })
          }
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={e=>
            setForm({
              ...form,
              description:e.target.value
            })
          }
        />

        <select
          value={form.priority}
          onChange={e=>
            setForm({
              ...form,
              priority:e.target.value
            })
          }
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <select
          value={form.category}
          onChange={e=>
            setForm({
              ...form,
              category:e.target.value
            })
          }
        >
          <option value="GENERAL">General</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="LEARNING">Learning</option>
          <option value="PERSONAL">Personal</option>
        </select>

        <div className="dateField">

          <label htmlFor="dueDate">
            Due Date
          </label>

          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={e=>
              setForm({
                ...form,
                dueDate:e.target.value
              })
            }
          />

        </div>

        <div className="formActions">

          <button
            type="submit"
            className="submitButton"
          >
            {editingId?"Update Task":"Add Task"}
          </button>

          {editingId&&(
            <button
              type="button"
              className="cancelButton"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </section>
  );
}

export default TaskForm;