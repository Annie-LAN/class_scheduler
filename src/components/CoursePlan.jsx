import "./CoursePlan.css";

const CoursePlan = ({ selectedCourses, courses }) => (
  <div className="course-plan">
    <h3 className="mb-3">Selected Courses</h3>
    {selectedCourses.length === 0 ? (
      <p className="text-muted">
        The course list is empty. Click on a course to select or deselect it.
      </p>
    ) : (
      selectedCourses.map((id) => {
        const course = courses[id];
        return (
          <div key={id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                CS {course.number}: {course.title}
              </h5>
              <p className="card-text">{course.meets}</p>
            </div>
          </div>
        );
      })
    )}
  </div>
);

export default CoursePlan;
