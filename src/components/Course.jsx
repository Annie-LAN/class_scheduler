import "./Course.css";
import { Link } from "react-router-dom";
import { useProfile } from "../utilities/profile";

const Course = ({
  id,
  course,
  selectedCourses,
  conflictingCourses,
  handleCourseSelection,
}) => {
  const isSelected = selectedCourses.includes(id);
  const isConflicting = conflictingCourses.includes(id);

  const [profile, profileLoading, profileError] = useProfile();
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <div
      className={`card m-1 p-2 ${isSelected ? "selectedCourses" : ""} ${
        isConflicting ? "conflicting" : ""
      }`}
      onClick={() => handleCourseSelection(id)}
    >
      <div className="card-body">
        <h5 className="fw-semibold card-title">
          {course.term} CS {course.number}
        </h5>
        <p className="card-text">{course.title}</p>
      </div>
      <div className="card-footer bg-transparent">
        <p className="card-text">{course.meets}</p>
        {profile?.isAdmin && (
          <p>
            <Link to={`/editCourse/${id}`}>Edit the Course</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Course;
