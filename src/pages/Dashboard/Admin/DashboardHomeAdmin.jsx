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
    <div className="space-y-6 mx-auto p-6">
      {/* Welcome Section - Mobile First */}
      <div className="bg-gradient-to-r from-secondary/5 to-accent/5 p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-md text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="sm:text-lg font-bold">
          <span
            className={`capitalize font-bold ${
              role === "admin"
                ? "text-secondary"
                : role === "volunteer"
                ? "text-[#92E3A9]"
                : "text-gray-700"
            }`}
          >
            {role}
          </span>{" "}
          : {user?.displayName}
        </p>
        <p className="mt-1 text-sm">
          Real-time oversight of all RedLife activities
        </p>
      </div>

      {/* Stats Section - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          icon={FaUsers}
          title="Total Donors"
          value={stats.totalUsers}
          // color="blue-500"
        />
        <StatCard
          icon={FaHandHoldingHeart}
          title="Total Funding"
          value={`$${Number(stats.totalFunding).toLocaleString()}`}
          // color="green-500"
        />
        <StatCard
          icon={FaTint}
          title="Blood Requests"
          value={stats.totalBloodRequests}
          // color="red-500"
        />
      </div>
    </div>
  );
};

export default DashboardHomeAdmin;
