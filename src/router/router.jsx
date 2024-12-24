import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddVolunteer from "../pages/AllPage/AddVolunteer";
import AllVolunteer from "../pages/AllPage/AllVolunteer";
import VolunteerDetails from "../pages/AllPage/VolunteerDetails";
import PrivateRoute from "../context/AuthContext/PrivateRoute";
import ManageMyPost from "../pages/AllPage/ManageMyPost";
import UpdatePost from "../pages/AllPage/UpdatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Not found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/logIn",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/volunteer-needs",
        element: (
          <PrivateRoute>
            <AddVolunteer></AddVolunteer>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-volunteer",
        element: <AllVolunteer></AllVolunteer>,
      },
      {
        path: "/volunteer/:id",
        element: (
          <PrivateRoute>
            <VolunteerDetails></VolunteerDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-posts",
        element: (
          <PrivateRoute>
            <ManageMyPost></ManageMyPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-post/:id",
        element: (
          <PrivateRoute>
            <UpdatePost></UpdatePost>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
