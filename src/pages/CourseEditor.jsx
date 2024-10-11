import { useParams } from "react-router-dom";

const CourseEditor = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <p>hello world to course {id}</p>
    </div>
  );
};

export default CourseEditor;
