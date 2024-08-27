import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProjectList from "../components/project-list";
import ProjectDetails from "../components/project-detail";
import ProjectForm from "../components/project-form";
import ProtectedRoute from "./Private-routes";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/signup-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/projects/new",
    element: (
      <ProtectedRoute>
        <ProjectForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <ProjectList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:id",
    element: (
      <ProtectedRoute>
        <ProjectDetails />
      </ProtectedRoute>
    ),
  },
]);
