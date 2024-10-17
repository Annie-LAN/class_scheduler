import Banner from "../components/Banner";
import TermPage from "../components/TermPage";
import { useDbData } from "../utilities/firebase";

const Main = () => {
  const [data, error] = useDbData("/");
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div className="container">
      <Banner title={data.title} />
      <TermPage courses={data.courses} />
    </div>
  );
};

export default Main;
