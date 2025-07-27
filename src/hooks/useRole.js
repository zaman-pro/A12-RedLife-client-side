import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/user/${user.email}`
        );
        setRole(data.role);
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  return { role, loading, error };
};

export default useRole;
