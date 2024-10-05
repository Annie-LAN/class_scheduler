import { useState } from "react";
import CourseList from "./CourseList";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ term, selection, setSelection }) => (
  <div>
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      {term}
    </label>
  </div>
);

const TermSelector = ({ selection, setSelection }) => (
  <div className="btn-group">
    {terms.map((term) => (
      <TermButton
        key={term}
        term={term}
        selection={selection}
        setSelection={setSelection}
      />
    ))}
  </div>
);

const TermPage = ({ courses }) => {
  const [selection, setSelection] = useState(terms[0]);
  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <CourseList courses={courses} selection={selection} />
    </div>
  );
};

export default TermPage;
