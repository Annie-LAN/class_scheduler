import { useState } from "react";
import CourseList from "./CourseList";
import Modal from "./Modal";
import CoursePlan from "./CoursePlan";
import { findConflictingCourses } from "../utilities/detectTimeConflict";

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

    // update selectedCourses
    const isSelected = selectedCourses.includes(courseId);
    const newSelectedCourses = isSelected
      ? selectedCourses.filter((id) => id !== courseId) // Remove course
      : [...selectedCourses, courseId]; // Add course
    setSelectedCourses(newSelectedCourses);

    // update conflictingCourses
    const newConflictingCourses = findConflictingCourses(
      courses,
      newSelectedCourses
    );
    setConflictingCourses(newConflictingCourses);
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
