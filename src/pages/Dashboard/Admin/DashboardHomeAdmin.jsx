import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import StatCard from "../../../components/Dashboard/Admin/StatCard";
import Loading from "../../../components/Shared/Loading/Loading";

const DashboardHomeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useRole();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const [usersRes, fundingRes, requestsRes] = await Promise.all([
        axiosSecure("/admin/users/count"),
        axiosSecure("/admin/funding/total"),
        axiosSecure("/admin/blood-requests/count"),
      ]);

      return {
        totalUsers: usersRes.data.count,
        totalFunding: fundingRes.data.total,
        totalBloodRequests: requestsRes.data.count,
      };
    },
  });

  if (!role) return <Loading />;

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <p className="text-red-500 text-center py-10 text-lg">
        Failed to load statistics.
      </p>
    );

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-base-100 to-blue-100 p-6 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700 font-medium">
          <span className="capitalize font-bold">{role}</span> :{" "}
          {user?.displayName}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Real-time oversight of all RedLife activities
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={FaUsers}
          title="Total Donors"
          value={stats.totalUsers}
          color="blue-500"
        />
        <StatCard
          icon={FaHandHoldingHeart}
          title="Total Funding"
          value={`$${Number(stats.totalFunding).toLocaleString()}`}
          color="green-500"
        />
        <StatCard
          icon={FaTint}
          title="Blood Requests"
          value={stats.totalBloodRequests}
          color="red-500"
        />
      </div>
    </div>
  );
};

export default DashboardHomeAdmin;
