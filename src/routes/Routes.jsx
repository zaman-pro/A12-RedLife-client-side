import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Auth from "../pages/Auth/Auth";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import DashboardProfile from "../pages/Dashboard/DashboardProfile";
import BlogPage from "../pages/Public/BlogPage";
import PrivateRoute from "./PrivateRoute";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import MyDonationRequest from "../pages/Dashboard/MyDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        Component: BlogPage,
      },
      {
        path: "/auth",
        Component: Auth,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <DashboardProfile />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequest />,
      },
    ],
  },
]);
