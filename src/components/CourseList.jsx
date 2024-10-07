import Course from "./Course";
import "./CourseList.css";

const CourseList = ({ courses, term, selectedCards, toggleSelectedCards }) => {
  return (
    <div className="course-list">
      {Object.entries(courses)
        .filter(([_, course]) => course.term === term)
        .map(([id, course]) => (
          <Course
            key={id}
            id={id}
            course={course}
            selectedCards={selectedCards}
            toggleSelectedCards={toggleSelectedCards}
          />
        ))}
    </div>
  );
};

export default CourseList;
