import "./Course.css";

const Course = ({ id, course, selectedCourses, toggleSelectedCourses }) => (
  <div
    className={`card m-1 p-2 ${
      selectedCourses.includes(id) ? "selectedCourses" : ""
    }`}
    onClick={() => toggleSelectedCourses(id)}
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
