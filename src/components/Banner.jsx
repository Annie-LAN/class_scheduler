import AuthButton from "./AuthButton";

const Banner = ({ title }) => {
  return (
    <div className="d-flex p-2">
      <h1 className="my-3">{title}</h1>
      <AuthButton />
    </div>
  );
};
export default Banner;
