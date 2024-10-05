import Course from "./Course";
import "./CourseList.css";

const CourseList = ({ courses, selection }) => (
  <div className="course-list">
    {Object.entries(courses)
      .filter(([_, course]) => course.term === selection)
      .map(([id, course]) => (
        <Course key={id} course={course} />
      ))}
  </div>
);

export default CourseList;
