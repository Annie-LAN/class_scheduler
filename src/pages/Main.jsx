import { useJsonQuery } from "../utilities/fetch";
import Banner from "../components/Banner";
import TermPage from "../components/TermPage";

const Main = () => {
  const [data, isLoading, error] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
    <div className="container">
      <Banner title={data.title} />
      <TermPage courses={data.courses} />
    </div>
  );
};

export default Main;
