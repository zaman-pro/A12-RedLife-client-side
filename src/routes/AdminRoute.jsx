import React from "react";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { role, loading } = useRole();
  const location = useLocation();

  if (loading) return <Loading />;

  if (role === "admin") return children;

  return <Navigate state={location.pathname} to="/dashboard" />;
};

export default AdminRoute;
