import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const authData = use(AuthContext);
  return authData;
};

export default useAuth;
