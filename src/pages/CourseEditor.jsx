import { useParams, useNavigate } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";
import { useFormData } from "../utilities/useFormData";

const validateFormData = (key, val) => {
  switch (key) {
    case "title":
      return /(^\w\w)/.test(val) ? "" : "Title must be least two characters";
    case "meets":
      return val === "" ||
        /^((M|Tu|W|Th|F)+(,\s*(M|Tu|W|Th|F)+)*)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/.test(
          val
        )
        ? ""
        : "Meeting time must contain weekdays and a time range, e.g., MWF 12:00-13:20";
    default:
      return "";
  }
};

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary me-auto"
        disabled={disabled}
      >
        Submit
      </button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const FormEditor = ({ courseId }) => {
  const navigate = useNavigate();
  const [update, result] = useDbUpdate(`/courses/${courseId}`);
  const [state, change] = useFormData(validateFormData);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <InputField name="title" text="Title" state={state} change={change} />
      <InputField name="meets" text="Meets" state={state} change={change} />

      <ButtonBar message={result?.message} />
    </form>
  );
};

const CourseEditor = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <h4>Editing Course {id}</h4>
      <FormEditor courseId={id} />
    </div>
  );
};

export default CourseEditor;
