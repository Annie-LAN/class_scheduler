import Banner from "../components/Banner";
import TermPage from "../components/TermPage";

const Main = ({ data }) => (
  <div className="container">
    <Banner title={data.title} />
    <TermPage courses={data.courses} />
  </div>
);

export default Main;
