import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./pages/Main";
import CourseEditor from "./pages/CourseEditor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDbData } from "./utilities/firebase";

const queryClient = new QueryClient();

const App = () => {
  const [data, error] = useDbData("/");
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main data={data} />} />
          <Route
            path="/editCourse/:id"
            element={<CourseEditor title={data.title} />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
