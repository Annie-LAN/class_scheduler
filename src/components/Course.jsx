import "./Course.css";

const Course = ({ id, course, selectedCards, toggleSelectedCards }) => (
  <div
    className={`card m-1 p-2 ${
      selectedCards.includes(id) ? "selectedCards" : ""
    }`}
    onClick={() => toggleSelectedCards(id)}
  >
    <div className="card-body">
      <h5 className="fw-semibold card-title">
        {course.term} CS {course.number}
      </h5>
      <p className="card-text">{course.title}</p>
    </div>
    <div className="card-footer bg-transparent">
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default Course;
