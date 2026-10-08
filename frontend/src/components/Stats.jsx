function Stats({
  total,
  active,
  completed
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

    </section>
  );
}

export default Stats;