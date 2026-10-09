
function Stats({
  total,
  active,
  completed,
  overdue
}){
  return(
    <section className="stats">
      <div className="statCard">
        <span>Total Tasks</span>
        <strong>{total}</strong>
      </div>

      <div className="statCard">
        <span>Active</span>
        <strong>{active}</strong>
      </div>

      <div className="statCard">
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>

      <div className="statCard overdueStat">
        <span>Overdue</span>
        <strong>{overdue}</strong>
      </div>
    </section>
  );
}

export default Stats;