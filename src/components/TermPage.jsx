import { useState } from "react";
import CourseList from "./CourseList";
import Modal from "./Modal";
import CoursePlan from "./CoursePlan";
import { checkTimeConflict } from "../utilities/detectTimeConflict";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ termName, selectedTerm, setTerm }) => (
  <div className="mx-1">
    <input
      type="radio"
      id={termName}
      className="btn-check"
      checked={termName === selectedTerm}
      autoComplete="off"
      onChange={() => setTerm(termName)}
    />
    <label className="btn btn-success mb-1 p-2" htmlFor={termName}>
      {termName}
    </label>
  </div>
);

const TermSelector = ({ selectedTerm, setTerm }) => (
  <div className="btn-group">
    {terms.map((t) => (
      <TermButton
        key={t}
        termName={t}
        selectedTerm={selectedTerm}
        setTerm={setTerm}
      />
    ))}
  </div>
);

const TermPage = ({ courses }) => {
  const [term, setTerm] = useState(terms[0]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [conflictingCourses, setConflictingCourses] = useState([]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleCourseSelection = (courseId) => {
    // disable selection if the course is conflicting
    if (conflictingCourses.includes(courseId)) {
      return;
    }

    const isSelected = selectedCourses.includes(courseId);

    if (isSelected) {
      // Remove course from selectedCourses
      const newSelectedCourses = selectedCourses.filter(
        (id) => id !== courseId
      );
      setSelectedCourses(newSelectedCourses);

      // Update conflicting courses
      const newConflictingCourses = Object.keys(courses).filter((id) => {
        if (newSelectedCourses.includes(id)) return false;
        return newSelectedCourses.some((selectedId) =>
          checkTimeConflict(courses[id], courses[selectedId])
        );
      });
      setConflictingCourses(newConflictingCourses);
    } else {
      // Add course to selectedCourses
      const newSelectedCourses = [...selectedCourses, courseId];
      setSelectedCourses(newSelectedCourses);

      // Update conflicting courses
      const newConflictingCourses = Object.keys(courses).filter((id) => {
        if (newSelectedCourses.includes(id)) return false;
        return newSelectedCourses.some((selectedId) =>
          checkTimeConflict(courses[id], courses[selectedId])
        );
      });
      setConflictingCourses(newConflictingCourses);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <TermSelector selectedTerm={term} setTerm={setTerm} />
        <button className="btn btn-outline-dark ms-auto" onClick={openModal}>
          Course Plan
        </button>
      </div>
      <CourseList
        courses={courses}
        term={term}
        selectedCourses={selectedCourses}
        conflictingCourses={conflictingCourses}
        handleCourseSelection={handleCourseSelection}
      />
      <Modal open={open} close={closeModal}>
        <CoursePlan selectedCourses={selectedCourses} courses={courses} />
      </Modal>
    </div>
  );
};

export default TermPage;
