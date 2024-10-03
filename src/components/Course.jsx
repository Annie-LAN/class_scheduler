const Course = ({ key, course }) => (
  <p>
    {course.term} CS {course.number}: {course.title}
  </p>
);

export default Course;
