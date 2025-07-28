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
import AllUser from "../pages/Dashboard/Admin/AllUser";
import AllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequest";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";
import SearchPage from "../pages/Public/SearchPage";
import BloodDonationRequests from "../pages/Public/BloodDonationRequests";
import DonationRequestDetails from "../pages/Public/DonationRequestDetails";

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
        path: "/search-donor",
        element: <SearchPage />,
      },
      {
        path: "/donation-requests",
        element: <BloodDonationRequests />,
      },
      {
        path: "blog",
        Component: BlogPage,
      },
      {
        path: "/auth",
        Component: Auth,
      },
      {
        path: "/donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
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
        path: "overview",
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
      {
        path: "donation-request/:id",
        element: <DonationRequestDetails />,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <VolunteerRoute>
            <AllDonationRequests />
          </VolunteerRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <VolunteerRoute>
            <ContentManagement />
          </VolunteerRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <VolunteerRoute>
            <AddBlog />
          </VolunteerRoute>
        ),
      },
    ],
  },
]);
