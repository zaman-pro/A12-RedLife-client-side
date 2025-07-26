import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStatus = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading || !user?.email) return;

    const fetchStatus = async () => {
      try {
        const { data } = await axiosSecure(`/user/${user.email}`);
        setStatus(data.status);
      } catch (err) {
        console.error("Error fetching user status:", err);
        setError(err.message || "Something went wrong");
        setStatus("unknown");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [user?.email, authLoading, axiosSecure]);

  return { status, loading, error };
};

export default useStatus;
