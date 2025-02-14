import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateQuiz from "../pages/createQuiz";
import EditQuiz from "../pages/EditQuiz";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/create-quiz", element: <CreateQuiz /> },
      { path: "/edit-quiz/:id", element: <EditQuiz /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
