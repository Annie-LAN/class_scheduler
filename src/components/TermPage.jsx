import { useState } from "react";
import CourseList from "./CourseList";
import Modal from "./Modal";
import CoursePlan from "./CoursePlan";

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
  const [selectedCards, setSelectedCards] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelectedCards = (item) =>
    setSelectedCards(
      selectedCards.includes(item)
        ? selectedCards.filter((x) => x !== item)
        : [...selectedCards, item]
    );

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
        selectedCards={selectedCards}
        toggleSelectedCards={toggleSelectedCards}
      />
      <Modal open={open} close={closeModal}>
        <CoursePlan selectedCards={selectedCards} courses={courses} />
      </Modal>
    </div>
  );
};

export default TermPage;
