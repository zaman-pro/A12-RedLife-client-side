import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/user/${user.email}`
      );
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // optional caching for 5 mins
    // staleTime: 60 * 60 * 1000, // Cache for 1 hour
  });

  return {
    role: data?.role || null,
    loading: isLoading || authLoading,
    error,
  };
};

export default useRole;
