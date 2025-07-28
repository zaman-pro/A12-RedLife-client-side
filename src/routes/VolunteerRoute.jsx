import React from "react";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Shared/Loading/Loading";

const VolunteerRoute = ({ children }) => {
  const { role, loading } = useRole();
  const location = useLocation();

  if (loading) return <Loading />;

  if (role === "admin" || role === "volunteer") return children;

  return <Navigate state={location.pathname} to="/dashboard" />;
};

export default VolunteerRoute;
