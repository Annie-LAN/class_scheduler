import { useState } from "react";
import CourseList from "./CourseList";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ termName, selectedTerm, setTerm }) => (
  <div>
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

  const toggleSelectedCards = (item) =>
    setSelectedCards(
      selectedCards.includes(item)
        ? selectedCards.filter((x) => x !== item)
        : [...selectedCards, item]
    );

  return (
    <div>
      <TermSelector selectedTerm={term} setTerm={setTerm} />
      <CourseList
        courses={courses}
        term={term}
        selectedCards={selectedCards}
        toggleSelectedCards={toggleSelectedCards}
      />
    </div>
  );
};

export default TermPage;
