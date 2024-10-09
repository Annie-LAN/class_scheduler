import Course from "./Course";
import "./CourseList.css";

const CourseList = ({
  courses,
  term,
  selectedCourses,
  conflictingCourses,
  handleCourseSelection,
}) => {
  return (
    <div className="course-list">
      {Object.entries(courses)
        .filter(([_, course]) => course.term === term)
        .map(([id, course]) => (
          <Course
            key={id}
            id={id}
            course={course}
            selectedCourses={selectedCourses}
            conflictingCourses={conflictingCourses}
            handleCourseSelection={handleCourseSelection}
          />
        ))}
    </div>
  );
};

export default CourseList;
